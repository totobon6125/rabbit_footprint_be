import express from 'express';

import PostsRouter from './posts.router.js';
import SignUpRouter from './signup.router.js';
import SignInRouter from './signin.router.js';
import UsersRouter from './users.router.js';
import CheckRouter from './check.router.js';


const router = express.Router()

router.use('/check', [CheckRouter])
router.use('/', [SignUpRouter, SignInRouter, PostsRouter, UsersRouter])


export default router;
