import { prisma } from '../utils/prisma/index.js'
import { CustomError } from '../errors/customError.js'


export class SignUpRepo {

    //# 회원 가입
    signUp = async (email, password) => {
        const signUp = await prisma.users.create({
            data: {
                email,
                password
            }
        });

        return signUp;
    };

    //! 회원가입 email 중복확인
    findUserByEmail = async (email) => {
        const eMail = await prisma.users.findUnique({
            where: { email }
        });
        if (eMail) { // 이 에러는 return으로 빠지는 것이 아닌 throw 를 통해 서비스 계층으로 이동 합니다.
            throw new CustomError(412, '중복된 닉네임입니다')
        };

        return eMail;
    };
};
