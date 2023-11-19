// browser.ts
import { setupWorker } from "msw/browser";

import { getHandlers } from "./handlers";

export const worker = setupWorker(...(await getHandlers()));
