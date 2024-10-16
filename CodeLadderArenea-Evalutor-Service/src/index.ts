import bodyParser from "body-parser";
import express, { Express } from "express"; // Explicit type

import serverAdapter from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import runCpp from "./containers/runCpp";
// import runJava from "./containers/runJavaDocker";
// import runPython from "./containers/runPythonDocker";
import apiRouter from "./routes";
import SampleWorker from "./workers/SampleWorker";

const app: Express = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/api", apiRouter);
app.use('/bullboardui', serverAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log(`server started running on- ${serverConfig.PORT}`);
  console.log(`BullBoard dashboard running on: http://localhost:${serverConfig.PORT}/bullboardui`);

  SampleWorker('SampleQueue');

  // const code:string = `
  // x = input()
  // print("value of x is => ") 
  // `;
  
  // runPython(code, "100");

  // const code: string = `
  // import java.util.*;

  // public class Main {
  //   public static void main(String[] args) {
  //       System.out.println("Hello, World!");
  //       Scanner scn = new Scanner(System.in);
  //       int input = scn.nextInt();
  //       System.out.println("input value that is given by user is =>" + input);
  //       for(int i=0; i<input; i++){
  //         System.out.println(i);
  //       }
  //   }
  // }
  // `;

  // runJava(code, "10");

  const code : string =`
  #include <iostream>
  using namespace std;

  int main(){
    int x;
    cin >> x;
    cout << "value of x is => " << x << endl;
    
    for(int i=0; i<x; i++){
      cout << i << " ";
    }

  }
  `;

  // here there might be STUB code in backend 

  runCpp(code, "10");



});

