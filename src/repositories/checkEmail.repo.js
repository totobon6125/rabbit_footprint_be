import { prisma } from '../utils/prisma/index.js'
import { CustomError } from '../errors/customError.js'

export class CheckEmailRepo {
    //# 회원가입 email 중복확인
    checkEmail = async (email) => {
        const user = await prisma.users.findUnique({
            where: { email }
        });

        if (user) {
            return true;
        };

        return false;
    };

};
