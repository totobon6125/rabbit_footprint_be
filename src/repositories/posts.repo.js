// src/repositories/posts.repo.js

import { prisma } from "../utils/prisma/index.js";

export class PostsRepo {
  // (1) 게시글 생성 API
  createPost = async (
    WriterId,
    receiverId,
    nickname,
    relationship,
    content
  ) => {
    const createdPost = await prisma.posts.create({
      data: {
        WriterId: +WriterId,
        receiverId: +receiverId,
        nickname,
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
        receiverId: true,
        // User: {
        //   // 먼저 User 관계를 포함합니다.
        //   select: {
        //     UserInfos: {
        //       // 그 다음 UserInfos의 정보를 가져옵니다.
        //       select: {
        //         nickname: true,
        //       },
        //     },
        //   },
        // },
        relationship: true,
        content: true,
        createdAt: true,
        updatedAt: true,
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
    const updatedPost = await prisma.posts.update({
      where: {
        postId: +postId,
      },
      data: {
        postId,
        relationship,
        content,
        receiverId,
        editCount: { increment: 1 },
      },
    });

    return updatedPost;
  };

  // (5) 전체 게시글 조회 API
  findAllPosts = async (receiverId) => {
    const posts = await prisma.posts.findMany({
      where: { receiverId: +receiverId },
      select: {
        postId: true,
        receiverId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return posts;
  };
}
