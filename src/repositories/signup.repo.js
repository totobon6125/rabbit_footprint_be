import bcrypt from 'bcrypt';

import { prisma } from '../utils/prisma/index.js'
import { CustomError } from '../errors/customError.js'

export class SignUpRepo {
    //# 회원 가입
    signUp = async (email, nickname, password) => {
        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 생성
        const user = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        // 사용자 정보 생성 및 사용자와 연결
        const userInfo = await prisma.userInfos.create({
            data: {
                nickname,
                User: { connect: { userId: user.userId } }
            },
        });

        return { user, userInfo };
    }
    
    //! 회원가입 email 중복확인
    findUserByEmail = async (email) => {
        const user = await prisma.users.findUnique({
            where: { email }
        });

        if (user) { // 이 에러는 return으로 빠지는 것이 아닌 throw 를 통해 서비스 계층으로 이동 합니다.
            throw new CustomError(412, '중복된 email 입니다')
        };
        
        return user;
    };


    //! 회원가입 nickname 중복확인
    findUserByNickName = async (nickname) => {
        console.log("nickname:  ",nickname)
        const userInfo = await prisma.UserInfos.findUnique({
            where: { nickname }
        });
        if (userInfo) { // 이 에러는 return으로 빠지는 것이 아닌 throw 를 통해 서비스 계층으로 이동 합니다.
            throw new CustomError(412, '중복된 닉네임입니다')
        };

        return userInfo;
    };
};
