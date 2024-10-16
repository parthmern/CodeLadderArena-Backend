// import Docker from "dockerode";
// import { TestCases } from "../types/testCases";
import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";

async function runPython(code:string, inputTestCase: string) {

    const rawLogBuffer: Buffer[] = [];

    console.log("starting.... python docker container");

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
    console.log(runCommand);
    
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ["python3", "-c", code, "stty -echo"]);

    const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 

    await pythonDockerContainer.start();

    console.log("Started docker container");

    const loggerStream = await pythonDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true // whether the logs are streamed or returned as a string
    });

    // 
    loggerStream.on('data', (chunk)=>{
        rawLogBuffer.push(chunk);   // wenver the log something during execution this listener will trigger
    })

    

    await new Promise((res, _)=>{

        loggerStream.on('end', (_chunk)=>{
            console.log(rawLogBuffer);
            const logString = Buffer.concat(rawLogBuffer).toString('utf-8');
            console.log(logString);
    
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log(decodedStream);
            res(decodedStream);
    
        })
    })

    await pythonDockerContainer.remove();   

    return ;

}

export default runPython;
