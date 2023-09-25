import { prisma } from '../utils/prisma/index.js'
import { CustomError } from '../errors/customError.js'

export class CheckNickNameRepo {
    //# 회원가입 nickname 중복확인
    checkNickName = async (nickname) => {
        const userInfo = await prisma.userInfos.findUnique({
            where: { nickname }
        });
        
        if (userInfo) {
            return true
        };

        return false;
    };
};
