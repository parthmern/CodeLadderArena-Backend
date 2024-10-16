// import Docker from "dockerode";
// import { TestCases } from "../types/testCases";
import { JAVA_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";
import decodeDockerStream from "./dockerHelper";

async function runJava(code:string, inputTestCase: string) {

    const rawLogBuffer: Buffer[] = [];

    console.log("starting.... java docker container");

    const runCommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;
    console.log(runCommand);
    
    const javaDockerContainer = await createContainer(JAVA_IMAGE, [
        '/bin/sh', 
        '-c',
        runCommand
    ]); 

    await javaDockerContainer.start();

    console.log("Started java docker container");

    const loggerStream = await javaDockerContainer.logs({
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

    await javaDockerContainer.remove();   

    return ;

}

export default runJava;
