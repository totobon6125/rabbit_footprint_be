import { prisma } from '../utils/prisma/index.js';
import { CustomError } from '../errors/customError.js';

export class ChangeNickRepo {
    // 닉네임 수정하기
    changeNick = async (UserId, newNickname) => {
        // userId로 해당하는 사용자 정보 찾기
        console.log("RP> userId: ", UserId)
        const userInfo = await prisma.userInfos.findUnique({
            where: { UserId },
        });

        if (!userInfo) {
            // userId에 해당하는 사용자 정보가 없는 경우
            throw new CustomError(404, '사용자 정보를 찾을 수 없습니다.');
        }

        // 닉네임을 업데이트하고 업데이트된 사용자 정보를 반환
        const updatedUserInfo = await prisma.userInfos.update({
            where: { UserId },
            data: {
                nickname: newNickname,
            },
        });

        return updatedUserInfo;
    };
}