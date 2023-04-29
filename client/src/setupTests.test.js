import '@testing-library/jest-dom/extend-expect';
import { server } from './test/server/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
