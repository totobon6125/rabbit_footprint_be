import { UsersRepo } from "../repositories/users.repo.js";

export class UsersServ {
  usersRepository = new UsersRepo();

  // (1) 내 정보 등록 API
  createUserInfo = async (userInfoId, userId, nickname, profileImage) => {
    const createdUserInfo = await this.usersRepository.createUserInfo(
      userInfoId,
      userId,
      nickname,
      profileImage
    );

    return {
      userInfoId: createdUserInfo.userInfoId,
      UserId: createdUserInfo.UserId,
      nickname: createdUserInfo.nickname,
      profileImage: createdUserInfo.profileImage,
      createdAt: createdUserInfo.createdAt,
      updatedAt: createdUserInfo.updatedAt,
    };
  };

  // (2) 내 정보 조회 API
  getUserInfo = async (userInfoId) => {
    const getUserInfo = await this.usersRepository.getUserInfo(userInfoId);

    return {
      userInfoId: getUserInfo.userInfoId,
      nickname: getUserInfo.nickname,
      UserId: getUserInfo.UserId,
      profileImage: getUserInfo.profileImage,
      createAt: getUserInfo.createAt,
      updateAt: getUserInfo.updatedAt,
    };
  };
}
