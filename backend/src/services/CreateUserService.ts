import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import User from '../models/Users';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepositorie = getRepository(User);

    const findUserForEmail = await userRepositorie.findOne({
      where: { email },
    });

    if (findUserForEmail) {
      throw new Error('E-mail eddress already used.');
    }

    const passwordHased = await hash(password, 8);

    const user = userRepositorie.create({
      name,
      email,
      password: passwordHased,
    });

    await userRepositorie.save(user);

    return user;
  }
}

export default CreateUserService;
