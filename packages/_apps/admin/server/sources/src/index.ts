import { Logger } from '@dietacookies/logger';

import { Application } from './Application';
import { loadConfig } from './config';

const log = new Logger(Logger.defaults);

(async () => {
    const config = await loadConfig();
    await new Application(config, log).start();
})().catch(error => {
    console.log(error);
    throw error;
});
