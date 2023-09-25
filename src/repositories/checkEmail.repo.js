import { prisma } from '../utils/prisma/index.js'
import { CustomError } from '../errors/customError.js'

export class CheckEmailRepo {
    //# 회원가입 email 중복확인
    checkEmail = async (email) => {
        const user = await prisma.users.findUnique({
            where: { email }
        });

        if (user) { // 이 에러는 return으로 빠지는 것이 아닌 throw 를 통해 서비스 계층으로 이동 합니다.
            console.log("이메일 중복")
            throw new CustomError(412, '중복된 email 입니다')
        };

        return user;
    };

};
