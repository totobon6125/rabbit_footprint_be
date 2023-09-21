// src/routes/posts.router.js

import express from 'express';

import { PostsCtr } from '../controllers/posts.ctr.js'
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();
const postsController = new PostsCtr(); // PostsController 를 인스턴스화 시킨다.

// (1) 게시글 생성 API
router.post('/posts/:receiverId', authMiddleware, postsController.createPost); // 요청이 들어오면 해당하는 컨트롤러로 요청을 전달함.

// (2) 내가 받은 게시글 조회 API
router.get('/receive/:receiverId', authMiddleware, postsController.getPostsWrittenToMe);

// (3) 내가 쓴 게시글 조회 API 
router.get('/posts/:WriterId', authMiddleware, postsController.getPostsIWrote);

// (4) 내가 쓴 게시글 1회 수정 API 
router.put('/posts/:postId', authMiddleware, postsController.updatePost);


export default router;