import { rest } from 'msw';
import API_URL from '../../../config/index';

const authHandlers = [
  rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
    console.log(API_URL);
    const user = { name: 'haile', email: 'haile4cmd@gmail.com' };
    const token = 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    try {
      const { email, password } = req.body;
      if (email !== 'haile4cmd@gmail.com') {
        return res(ctx.status(400), ctx.json({ msg: 'User does not exist. ' }));
      }
      if (password !== '12345678') {
        return res(ctx.status(400), ctx.json({ msg: 'Invalid credentials' }));
      }

      return res(ctx.status(200), ctx.json({ token, user }));
    } catch (error) {
      return res(
        ctx.status(400),
        ctx.json({ message: error?.message || 'server error' })
      );
    }
  }),
];

export default authHandlers;
