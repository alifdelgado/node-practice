import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mongo } from 'mongoose';
import { Request, Response } from 'express';
import Users, { User } from '../db/schemas/user';
import Products from '../db/schemas/product';

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

const deleteById = async (req: Request, res: Response): Promise<void> => {
  const userId = req.body;
  const user = await Users.findByIdAndDelete({_id: userId});
  if(user) {
    Products.deleteMany({user: user._id})
    res.send({message: 'User and products were deleted correctly'});
    return;
  }
  res.status(404).send({});
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, first_name, last_name, avatar, password } = req.body;
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

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: User | null = await Users.findOne({email});
    if(!user) {
      throw {code: 404, message: 'User not found'};
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if(!passwordCheck) {
      throw {code: 401, message: 'Invalid password'};
    }
    const expiresIn = 60 * 60;
    const token = jwt.sign(
        {userId: user._id, email: user.email},
        process.env.JWT_SECRET!,
        {
          expiresIn
        });
    res.send({token, expiresIn});
  }catch(e) {
    res.status(404).send(e);
  }
};

export { getUsers, getUserById, createUser, deleteById, login };
