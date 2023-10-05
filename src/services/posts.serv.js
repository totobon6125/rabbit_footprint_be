// src/service/posts.serv.js

//# 저장소 계층과 연결하기
import { PostsRepo } from "../repositories/posts.repo.js";

export class PostsServ {
  postsRepository = new PostsRepo();

  // (1) 게시글 생성 API
  createPost = async (
    WriterId,
    receiverId,
    relationship,
    content,
    editCount
  ) => {
    // const getnickname = await this.usersRepository.getNicknameByUserId(WriterId);
    const createdPost = await this.postsRepository.createPost(
      WriterId,
      receiverId,
      relationship,
      content,
      editCount
    );

    return {
      postId: createdPost.postId,
      nickname: createdPost.nickname,
      WriterId: createdPost.WriterId,
      relationship: createdPost.relationship,
      content: createdPost.content,
      receiverId: createdPost.receiverId,
      editCout: createdPost.editCount,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt,
    };
  };

  // (2) 내게 쓴 게시글 조회 API
  findPostWrittenToMeById = async (receiverId) => {
    const posts = await this.postsRepository.findPostWrittenToMeById(
      receiverId
    );

    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // controller 에게 Reponse를 전달한다.
    return posts.map((post) => {
      return {
        postId: post.postId,
        WriterId: post.WriterId,
        receiverId: post.receiverId,
        relationship: post.relationship,
        nickname: post.nickname,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  // (3) 내가 쓴 게시글 조회 API
  findPostIWroteById = async (WriterId) => {
    const posts = await this.postsRepository.findPostIWroteById(WriterId);

    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // controller 에게 Reponse를 전달한다.
    return posts.map((post) => {
      return {
        postId: post.postId,
        WriterId: post.WriterId,
        receiverId: post.receiverId,
        nickname: post.nickname,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  // (4) 내가 쓴 게시글 1회 수정 API
  updatePost = async (postId, WriterId, relationship, content, receiverId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const postInfo = await this.postsRepository.findPostById(postId);
    // ! 게시글 수정과 관련된 에러 처리
    if (!postInfo) throw new Error("존재하지 않는 게시글입니다.");
    if (postInfo.WriterId !== WriterId)
      throw new Error("게시글을 수정할 권한이 없습니다");
    if (postInfo.editCount >= 1)
      throw new Error("게시글은 한 번만 수정이 가능합니다.");
    // const receiverId = postInfo.receiverId;

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.postsRepository.updatePost(
      postId,
      WriterId,
      relationship,
      content,
      receiverId,
      editCount
    );

    // 변경된 데이터를 조회합니다.
    const updatedPost = await this.postsRepository.findPostById(postId);

    return {
      postId: updatedPost.postId,
      WriterId: updatedPost.WriterId,
      nickname: updatedPost.nickname,
      relationship: updatedPost.relationship,
      content: updatedPost.content,
      receiverId: updatedPost.receiverId,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  };

  // (5) 전체 게시글 조회 API
  findAllPosts = async (receiverId) => {
    const results = await this.postsRepository.findAllPosts(receiverId);

    results.posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    const mappedPosts = results.posts.map((post) => {
      return {
        postId: post.postId,
        receiverId: post.receiverId,
        WriterId: post.WriterId,
        nickname: post.nickname,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });

    return {
      posts: mappedPosts,
      nicks: results.nicks,
    };
  };
}

