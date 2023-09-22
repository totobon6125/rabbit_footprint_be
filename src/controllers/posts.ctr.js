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
      const { userId } = req.user; // 작성자
      // const { receiverId } = req.params; // 받는자
      const { relationship, content } = req.body;
      // const { WriterId, nickname, password } = req.user;

      //! 로그인 상태, 쿠키 상태 확인 (예외 처리)
      if (!req.cookies || !req.user) {
        return res
          .status(403)
          .json({ errorMessage: "로그인이 필요한 기능입니다." });
      } else if (!userId) {
        return res
          .status(403)
          .json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
      }

      const createPost = await this.postsService.createPost(
        userId,
        receiverId,
        relationship,
        content
      );

      //! 자신에게 쓰는글, 덕담 + 관계성 빈칸 확인 (예외 처리)
      if (+userId === +receiverId) {
        return res
          .status(412)
          .json({ errorMessage: "나에게 게시글을 작성할 수 없습니다." });
      } else if (content.length === 0) {
        return res
          .status(412)
          .json({ errorMessage: "덕담의 내용이 비어있습니다." });
      } else if (relationship.length === 0) {
        return res.status(412).json({ errorMessage: "관계성을 선택해주세요." });
      }

      return res.status(200).json({ data: createPost });
    } catch (err) {
      return res
        .status(400)
        .json({ errorMessage: "게시글 작성에 실패했습니다." });
    }
  };

  // (2) 내가 받은 게시글 조회 API
  //클라이언트에게 전달받는 데이터 없음
  getPostsWrittenToMe = async (req, res, next) => {
    try {
      const { receiverId } = req.params;
      const { userId } = req.user;

      const posts = await this.postsService.findPostWrittenToMeById(receiverId);

      //! 내가 받은 게시글인지 확인 (예외처리)
      if (+userId !== +receiverId) {
        return res
          .status(412)
          .json({ errorMessage: "내가 받은 덕담만 볼 수 있습니다." });
      }

      return res.status(200).json({ data: posts });
    } catch (err) {
      return res
        .status(400)
        .json({ errorMessage: "게시글 조회에 실패했습니다. " });
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
      const { relationship, content } = req.body;
      const { userId } = req.user;
      const updatedpost = req.body;

      // 서비스 계층에 구현된 updatePost 로직을 실행합니다.
      const updatedPost = await this.postsService.updatePost(
        postId,
        userId,
        relationship,
        content
      );

      return res.status(200).json({ data: updatedPost });
    } catch (err) {
      next(err);
    }
  };
}
