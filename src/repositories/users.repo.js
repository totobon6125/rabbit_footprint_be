import { prisma } from "../utils/prisma/index.js";

export class UsersRepo {
  // (1) 내 정보 등록 API (마이페이지)
  createUserInfo = async (userInfoId, userId, nickname, profileImage) => {
    const createdUserInfo = await prisma.userInfos.create({
      data: {
        userInfoId: +userInfoId,
        UserId: +userId,
        nickname,
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
}
