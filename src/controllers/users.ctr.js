import { UsersServ } from "../services/users.serv.js";

export class UsersCtr {
  usersService = new UsersServ();

  // (1) 내 정보 등록 API (마이페이지)
  createUserInfo = async (req, res, next) => {
    try {
      const { userInfoId } = req.params;
      const { UserId } = req.body;
      const { nickname, profileImage } = req.body;

      const createUserInfo = await this.usersService.createUserInfo(
        userInfoId,
        UserId,
        nickname,
        profileImage
      );
      return res.status(200).json({ data: createUserInfo });
    } catch (err) {
      next(err);
    }
  };

  // (2) 내 정보 조회 API (마이페이지)
  getUserInfo = async (req, res, next) => {
    try {
      const { userInfoId } = req.params;

      const userInfos = await this.usersService.getUserInfo(userInfoId);

      return res.status(200).json({ data: userInfos });
    } catch (err) {
      next(err);
    }
  };

  // (3) 내 정보 수정 API (마이페이지)

  updateUserInfo = async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  };
}
