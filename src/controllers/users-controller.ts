import { Request, Response } from 'express';
import { users } from '../data/users';

const getUsers = (req: Request, res: Response): void => {
  res.send({
    page: 2,
    per_page: 6,
    total: 12,
    total_pages: 2,
    data: users,
    support: {
      url: 'https://reqres.in/#support-heading',
      text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
    },
  });
};

const getUserById = (req: Request, res: Response): void => {
  console.log('req.params', req.params);
  const { userId } = req.params;
  const index = users.findIndex((item) => item.id === +userId);
  if (index !== -1) {
    res.send({ data: users[index] });
    return;
  }
  res.status(404).send({});
};

export { getUsers, getUserById };
