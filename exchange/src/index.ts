import { createApp } from "./app";
import "reflect-metadata";

const start = async () => {
  const app = await createApp({ logger: true });
  try {
    await app.listen(3002);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();