import { prisma } from "../utils/prisma/index.js";

export class UsersRepo {
  // (1) 내 정보 등록 API (마이페이지)
  createUserInfo = async (userInfoId, userId, profileImage) => {
    const createdUserInfo = await prisma.userInfos.create({
      data: {
        userInfoId: +userInfoId,
        UserId: +userId,
        profileImage,
      },
    });
    return createdUserInfo;
  };

  // (2) 내 정보 조회 API (마이페이지)
  getUserInfo = async (userInfoId) => {
    const getUserInfo = await prisma.userInfos.findFirst({
      where: { userInfoId: +userInfoId },
      select: {
        userInfoId: true,
        UserId: true,
        nickname: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return getUserInfo;
  };

  // (3) 내 정보 수정 API (마이페이지)
  updateUserInfo = async (userInfoId, userId, nickname, profileImage) => {
    const updatedUserInfo = await prisma.userInfos.update({
      where: {
        userInfoId: +userInfoId,
      },
      data: {
        userInfoId,
        userId,
        nickname,
        profileImage,
      },
    });

    return updatedUserInfo;
  };

  // (4) 랜덤 유저 보내기 API (메인페이지)
  getRandomUser = async (userId) => {
    const getRandomUser = await prisma.users.count({
      where: {
        NOT: { userId: +userId },
      },
    });
    const skip = Math.floor(Math.random() * getRandomUser);
    return await prisma.users.findFirst({
      take: 1,
      skip: skip,
      where: {
        NOT: { userId: +userId },
      },
    });
  };
}
