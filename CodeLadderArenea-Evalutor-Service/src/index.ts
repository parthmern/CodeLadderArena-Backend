import bodyParser from "body-parser";
import express, { Express } from "express"; // Explicit type

import serverAdapter from "./config/bullBoardConfig";
import serverConfig from "./config/serverConfig";
import runPython from "./containers/runPythonDocker";
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

  const code:string = `print('hello from puthon')`
  
  runPython(code);



});

