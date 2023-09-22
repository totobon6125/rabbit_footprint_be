import express from 'express';

// import UsersRouter from './users.router.js';
import PostsRouter from './posts.router.js';
import SignUpRouter from './signup.router.js';
import SignInRouter from './signin.router.js';
import UsersRouter from './users.router.js';


const router = express.Router()

router.use('/', [SignUpRouter, SignInRouter, PostsRouter, UsersRouter])


export default router;
