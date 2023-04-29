import { afterAll, afterEach, beforeAll } from 'vitest';
import { fetch } from 'cross-fetch';

import server from './test/server/server';

global.fetch = fetch;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
