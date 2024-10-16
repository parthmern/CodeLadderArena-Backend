// import Docker from "dockerode";
// import { TestCases } from "../types/testCases";
import { CPP_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";

async function runCpp(code:string, inputTestCase: string) {

    const rawLogBuffer: Buffer[] = [];

    console.log("starting.... cpp docker container");

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;
    console.log(runCommand);
    
    const cppDockerContainer = await createContainer(CPP_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 

    await cppDockerContainer.start();

    console.log("Started cpp docker container");

    const loggerStream = await cppDockerContainer.logs({
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

    await cppDockerContainer.remove();   

    return ;

}

export default runCpp;
