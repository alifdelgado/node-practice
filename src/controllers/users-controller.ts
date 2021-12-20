import { Request, Response } from 'express';
import Users from '../db/schemas/user';
import bcrypt from 'bcryptjs';
import { mongo } from 'mongoose';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await Users.find();
  res.send(users);
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  const user = await Users.findById(userId);
  if(user) {
    res.send(user);
    return;
  }
  res.status(404).send({});
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, first_name, last_name, avatar, password } = req.body;
    console.log({ email, first_name, last_name, avatar, password });
    const hash: string = await bcrypt.hash(password, 15);
    const user = await Users.create({
      email,
      first_name,
      last_name,
      avatar,
      password: hash
    });
    res.send(user);
  } catch(e) {
    if(e instanceof mongo.MongoError) {
      res.status(400).send(e.message);
      return;
    }
    res.status(500).send(e);
  }
};

export { getUsers, getUserById, createUser };
