const userRouter = require('express').Router();
const {
  getUsers,
  createUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.post('/users', createUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
