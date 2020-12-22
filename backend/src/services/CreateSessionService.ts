import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import authConfig from '../config/auth';

import User from '../models/Users';

interface IRequest {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<Response> {
    const userRepositorie = getRepository(User);

    const user = await userRepositorie.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorect E-mail/password combination.');
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new Error('Incorect E-mail/password combination.');
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
