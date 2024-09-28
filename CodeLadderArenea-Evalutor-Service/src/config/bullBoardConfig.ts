import sampleQueue from "../queues/sampleQueue";

const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/bullboardui");

createBullBoard({
  queues: [new BullMQAdapter(sampleQueue)],
  serverAdapter: serverAdapter,
});

export default serverAdapter;
