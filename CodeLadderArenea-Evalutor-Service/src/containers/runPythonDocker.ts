// import Docker from "dockerode";
// import { TestCases } from "../types/testCases";
import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";

async function runPython(code:string) {

    const rawLogBuffer: Buffer[] = [];

    console.log("starting.... python docker container");
    
    const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ["python3", "-c", code, "stty -echo"]);

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

    loggerStream.on('end', (_chunk)=>{
        console.log(rawLogBuffer);
        const logString = Buffer.concat(rawLogBuffer).toString('utf-8');
        console.log(logString);

    })

    return ;

}

export default runPython;
