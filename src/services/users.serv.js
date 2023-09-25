// import { profile } from "winston";
import { UsersRepo } from "../repositories/users.repo.js";

export class UsersServ {
  usersRepository = new UsersRepo();

  // (1) 내 정보 등록 API
  createUserInfo = async (userInfoId, userId, profileImage) => {
    const createdUserInfo = await this.usersRepository.createUserInfo(
      userInfoId,
      userId,
      profileImage
    );

    return {
      userInfoId: createdUserInfo.userInfoId,
      UserId: createdUserInfo.UserId,
      profileImage: createdUserInfo.profileImage,
      createdAt: createdUserInfo.createdAt,
      updatedAt: createdUserInfo.updatedAt,
    };
  };

  // (2) 내 정보 조회 API
  findMyUserInfo = async (userId) => {
    const userInfos = await this.usersRepository.findMyUserInfo(userId);

    // return userInfos.map((userInfos) => {
    return {
      userInfoId: userInfos.userInfoId,
      nickname: userInfos.nickname,
      userId: userInfos.UserId,
      profileImage: userInfos.profileImage,
      createdAt: userInfos.createdAt,
      updatedAt: userInfos.updatedAt,
    };
    // });
  };

  // (3) 내 정보 수정 API
  updateUserInfo = async (userInfoId, userId, nickname, profileImage) => {
    const userInfo = await this.usersRepository.findUserById(userId);
    //! 예외 처리
    if (userInfo.userInfoId !== userInfoId)
      throw new Error("내 정보를 수정할 권한이 없습니다.");
    await this.usersRepository.updateUserInfo(
      userInfoId,
      userId,
      nickname,
      profileImage
    );

    const updatedUserInfo = await this.usersRepository.findUserById(userId);

    return {
      userInfoId: updatedUserInfo.userInfoId,
      userId: updatedUserInfo.userId,
      nickname: updatedUserInfo.nickname,
      profileImage: updatedUserInfo.profileImage,
      createdAt: updatedUserInfo.createdAt,
      updateeAt: updatedUserInfo.updatedAt,
    };
  };

  // (4) 랜덤 유저 보내기 API (메인페이지)
  getRandomUser = async (userId) => {
    const getRandomUser = await this.usersRepository.getRandomUser(userId);

    return {
      userId: getRandomUser.userId,
      nickname: getRandomUser.UserInfos.nickname,
    };
  };
}
