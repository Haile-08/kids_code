/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { API_URL } from '../../config';

export const authHandlers = [
	rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
		try {
			const result = { name: 'haile', password: 'password' };
			return res(
				ctx.status(200),
				ctx.json(result),
			);
		} catch (error) {
			ctx.status(400);
			ctx.json({ message: error?.message || 'server error' });
		}
	}),
];
