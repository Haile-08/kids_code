import { rest } from 'msw';
import API_URL from '../../../config/index';

const authHandlers = [
  rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
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

  rest.post(`${API_URL}/auth/register`, (req, res, ctx) => {
    try {
      const { firstname, lastname, email, password } = req.body;
      console.log(` f: ${firstname}`);
      console.log(` l: ${lastname}`);
      console.log(email);
      console.log(password);

      const user = { firstname, lastname, email, password };
      window.localStorage.setItem('user', JSON.stringify(user));
      return res(ctx.status(201), ctx.json(user));
    } catch (error) {
      return res(
        ctx.status(500),
        ctx.json({ message: error?.message || 'server error' })
      );
    }
  }),
];

export default authHandlers;
