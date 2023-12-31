import { UsersServ } from "../services/users.serv.js";

export class UsersCtr {
  usersService = new UsersServ();

  // (1) 내 정보 등록 API (마이페이지)
  createUserInfo = async (req, res, next) => {
    // try {
    const { userInfoId } = req.params;
    const { userId, nickname } = req.user;
    const { profileImage } = req.body;

    //! 로그인 상태, 쿠키 상태 확인, 내 마이페이지 화면인지 확인 (예외 처리)
    if (!req.cookies || !req.user) {
      return res
        .status(403)
        .json({ errorMessage: "로그인이 필요한 기능입니다." });
    } else if (!userId) {
      return res
        .status(403)
        .json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
    } else if (+userInfoId !== +userId) {
      return res
        .status(412)
        .json({ errorMessage: "마이페이지 정보 등록 권한이 없습니다." });
    }

    const createUserInfo = await this.usersService.createUserInfo(
      userInfoId,
      userId,
      profileImage,
      nickname
    );
    return res.status(200).json({ data: createUserInfo });
    // } catch (err) {
    //   return res
    //     .status(400)
    //     .json({ errorMessage: "마이페이지 정보 등록에 실패하였습니다." });
    // }
  };

  // (2) 내 정보 조회 API (마이페이지)
  getUserInfo = async (req, res, next) => {
    try {
      // const { userInfoId } = req.params;
      const { userId } = req.user;

      const userInfos = await this.usersService.findMyUserInfo(userId);
      //! 내 마이페이지 화면인지 확인 (예외처리)
      if (userId !== +userId) {
        return res
          .status(412)
          .json({ errorMessage: "내 정보 조회 권한이 없습니다." });
      }

      return res.status(200).json({ data: userInfos });
    } catch (err) {
      next(err);
    }
  };

  // (3) 내 정보 수정 API (마이페이지)

  updateUserInfo = async (req, res, next) => {
    try {
      const { userInfoId } = req.params;
      const { userId } = req.user;
      const { profileImage } = req.body;

      const updatedUserInfo = await this.usersService.updateUserInfo(
        userInfoId,
        userId,
        // nickname,
        profileImage
      );

      return res.status(200).json({ data: updatedUserInfo });
    } catch (err) {
      next(err);
    }
  };

  // (4) 랜덤 유저 보내기 API (메인페이지)
  getRandomUser = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const getRandomUser = await this.usersService.getRandomUser(userId);

      return res.status(200).json({ data: getRandomUser });
    } catch (err) {
      next(err);
    }
  };

  
}
