// src/repositories/posts.repo.js

import { prisma } from "../utils/prisma/index.js";

export class PostsRepo {
  // (1) 게시글 생성 API
  createPost = async (WriterId, receiverId, relationship, content) => {
    const createdPost = await prisma.posts.create({
      data: {
        WriterId: +WriterId,
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
        WriterId: true,
        // receiverId: true,
        relationship: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        // User: {
        //   select: {
        //     nickname: true,
        //   },
        // },
      },
    });

    return posts;
  };

  // (3) 내가 쓴 게시글 조회 API
  findPostIWroteById = async (WriterId) => {
    const posts = await prisma.posts.findMany({
      where: { WriterId: +WriterId },
      select: {
        postId: true,
        WriterId: true,
        receiverId: true,
        relationship: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return posts;
  };

  // (4) 게시글 수정 API
  updatePost = async (postId, relationship, content, receiverId) => {
    // ORM인 Prisma에서 Posts 모델의 update 메서드를 사용해 데이터를 수정합니다.
    const updatedPost = await prisma.posts.update({
      where: {
        postId: +postId,
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
