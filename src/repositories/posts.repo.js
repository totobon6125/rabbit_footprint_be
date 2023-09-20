// src/repositories/posts.repo.js

import { prisma } from "../utils/prisma/index.js";

export class PostsRepo {
  // (1) 게시글 생성 API
  createPost = async (userId, content) => {
    const createdPost = await prisma.posts.create({
      data: {
        UserId: userId,
        receiverId: +receiverId,
        relationship,
        content,
      },
    });
    return createdPost;
  };

  // (2) 내게 쓴 게시글 조회 API
  findPostWrittenToMeById = async (receiverId) => {
    const posts = await prisma.posts.findMany({
      where: { receiverId: +receiverId },
      select: {
        postId: true,
        receiverId: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        User: {
          select: {
            nickname: true,
          },
        },
      },
    });

    return posts;
  };

  // (3) 내가 쓴 게시글 조회 API
  findPostIWroteById = async (userId) => {
    const posts = await prisma.posts.findMany({
      where: { UserId: +userId },
      select: {
        postId: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return posts;
  };

  // (4) 게시글 수정 API
  updatePost = async (postId, password, relationship, content, receiverId) => {
    // ORM인 Prisma에서 Posts 모델의 update 메서드를 사용해 데이터를 수정합니다.
    const updatedPost = await prisma.posts.update({
      where: {
        postId: +postId,
        password: password,
      },
      data: {
        relationship,
        content,
        receiverId,
        editCount: { increment: 1 },
      },
    });

    return updatedPost;
  };
}
