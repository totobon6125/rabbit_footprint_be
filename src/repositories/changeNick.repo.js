import { prisma } from '../utils/prisma/index.js';
import { CustomError } from '../errors/customError.js';

export class ChangeNickRepo {
    // 닉네임 수정하기
    changeNick = async (userId, nickname) => {
        // userId로 해당하는 사용자 정보 찾기

        const userInfo = await prisma.userInfos.findUnique({
            where: { UserId: +userId },
        });

        if (!userInfo) {
            // userId에 해당하는 사용자 정보가 없는 경우
            throw new CustomError(404, '사용자 정보를 찾을 수 없습니다.');
        }

        // 닉네임이 이미 존재하는지 확인
        const existedNick = await prisma.userInfos.findFirst({
            where: { nickname },
        });

        if (existedNick && existedNick.UserId !== +userId) {
            // 같은 닉네임을 가진 사용자가 이미 존재하는 경우
            throw new CustomError(400, '이미 사용 중인 닉네임입니다.');
        }

        // 닉네임을 업데이트하고 업데이트된 사용자 정보를 반환
        const updatedUserInfo = await prisma.userInfos.update({
            where: { UserId: +userId },
            data: {
                nickname,
            },
        });

        return updatedUserInfo;
    };
}