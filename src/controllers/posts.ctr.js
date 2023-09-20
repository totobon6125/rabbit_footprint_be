// src/controllers/posts.ctr.js

//# 비지니스 계층과 연결하기
import { PostsServ } from "../services/posts.serv.js";

//# Post의 컨트롤러(Controller) 역할을 하는 클래스
export class PostsCtr {
  //* Post 서비스 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.
  postsService = new PostsServ();

  // (1) 게시글 생성 API
  // 클라이언트에게 전달받는 데이터 있음
  createPost = async (req, res, next) => {
    try {
      // 클라이언트에개 전달받은 데이터를 객체구조 분해 할당 함.
      const { WriterId } = req.user; // 작성자
      const { nickname, password, relationship, content } = req.body;
      const { receiverId } = req.params; // 받는자

      const createPost = await this.postsService.createPost(
        WriterId,
        nickname,
        password,
        relationship,
        content,
        receiverId,
      );

      return res.status(200).json({ data: createPost });
    } catch (err) {
      next(err);
    }
  };

  // (2) 내가 받은 게시글 조회 API
  //클라이언트에게 전달받는 데이터 없음
  getPostsWrittenToMe = async (req, res, next) => {
    try {
      const { receiverId } = req.params;

      const posts = await this.postsService.findPostWrittenToMeById(receiverId);

      return res.status(200).json({ data: posts });
    } catch (err) {
      next(err);
    }
  };

  // (3) 내가 쓴 게시글 조회 API 
  getPostsIWrote = async (req, res, next) => {
    try {
      const { WriterId } = req.params;

      const posts = await this.postsService.findPostIWroteById(WriterId);

      return res.status(200).json({ data: posts });
    } catch (err) {
      next(err);
    }
  };

  // (4) 내가쓴 게시글 1회 수정 API
  updatePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { userId } = req.users;
        const updatedData = req.body;

      // 서비스 계층에 구현된 updatePost 로직을 실행합니다.
      const updatedPost = await this.postsService.updatePost(
        postId,
        password,
        content,
      );

      return res.status(200).json({ data: updatedPost });
    } catch (err) {
      next(err);
    }
  };

}
