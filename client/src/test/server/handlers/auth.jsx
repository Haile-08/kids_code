import { rest } from 'msw';
import API_URL from '../../../config/index';

const authHandlers = [
  rest.get(`${API_URL}/auth/login`, (req, res, ctx) => {
    try {
      const result = { name: 'haile', password: 'password' };
      return res(ctx.status(200), ctx.json(result));
    } catch (error) {
      return res(
        ctx.status(400),
        ctx.json({ message: error?.message || 'server error' })
      );
    }
  }),
];

export default authHandlers;
