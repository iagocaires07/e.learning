import { Router } from 'express';

import CreateSerssionService from '../services/CreateSessionService';

const session = Router();

session.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const createSession = new CreateSerssionService();

    const { user, token } = await createSession.execute({ email, password });

    delete user.password;

    return response.status(200).json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default session;
