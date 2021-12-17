import { Request, Response } from 'express';
import Users from '../db/schemas/user';
import bcrypt from 'bcryptjs';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await Users.find();
  res.send(users);
};

const getUserById = (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = Users.findById(userId);
  if(user) {
    res.send(user);
    return;
  }
  res.status(404).send({});
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, fist_name, last_name, avatar, password } = req.body;
    const hash: string = await bcrypt.hash(password, 15);
    const user = await Users.create({
      email,
      fist_name,
      last_name,
      avatar,
      password: hash
    });
    res.send(user);
  } catch(e) {
    res.status(500).send(e.message);
  }
};

export { getUsers, getUserById, createUser };
