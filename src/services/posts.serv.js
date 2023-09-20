// src/service/posts.serv.js

//# 저장소 계층과 연결하기
import { PostsRepo } from "../repositories/posts.repo.js";

export class PostsServ {
  postsRepository = new PostsRepo();

  // (1) 게시글 생성 API
  createPost = async (userId, relationship, content, receiverId, editCount) => {
    const createdPost = await this.postsRepository.createPost(
      userId,
      relationship,
      content,
      receiverId,
      editCount
    );

    return {
      postId: createdPost.postId,
      nickname: createdPost.nickname,
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
    //! posts 에는 contents 와 password 가 함께 조회되기 때문에 아래에서 map 을 통해 두 값을 제외한 나머지를 출력함.

    // 게시글을 생성 날짜로 부터 내림차순으로 정렬함.
    //# 정렬작업 하기 sort 로 인해 원본이 정렬 됨!!
    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // controller 에게 Reponse를 전달한다.
    return posts.map((post) => {
      return {
        postId: post.postId,
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
    //! posts 에는 contents 와 password 가 함께 조회되기 때문에 아래에서 map 을 통해 두 값을 제외한 나머지를 출력함.

    // 게시글을 생성 날짜로 부터 내림차순으로 정렬함.
    //# 정렬작업 하기 sort 로 인해 원본이 정렬 됨!!
    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // controller 에게 Reponse를 전달한다.
    return posts.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  // (4) 내가 쓴 게시글 1회 수정 API
  updatePost = async (postId, password, relationship, content, receiverId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const postInfo = await this.postsRepository.findPostById(postId);
    if (!postInfo) throw new Error("존재하지 않는 게시글입니다.");
    if (postInfo.UserId !== userId) throw new Error("게시글을 수정할 권한이 없습니다")
    if (postInfo.editCount >= 1) throw new Error("게시글은 한 번만 수정이 가능합니다.")

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.postsRepository.updatePost(
      postId,
      password,
      relationship,
      content,
      receiverId,
      editCount
    );

    // 변경된 데이터를 조회합니다.
    const updatedPost = await this.postsRepository.findPostById(postId);

    return {
      postId: updatedPost.postId,
      nickname: updatedPost.nickname,
      relationship: updatedPost.relationship,
      content: updatedPost.content,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  };
}
