import { Application } from "./Application";
import { loadConfig } from "./config";

(async () => {
    const config = await loadConfig();
    await new Application(config).start();
})().catch((error) => {
    console.log(error);
    throw error;
});
