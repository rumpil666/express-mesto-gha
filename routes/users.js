const userRouter = require('express').Router();
const {
  getUsers,
  createUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.post('/', createUsers);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
