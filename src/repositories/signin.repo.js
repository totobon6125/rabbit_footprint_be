import jwt from 'jsonwebtoken';

import { prisma } from '../utils/prisma/index.js'
import { CustomError } from '../errors/customError.js'

export class SignInRepo {

    //# 로그인

    // Access, Refresh Token을 생성합니다.
    // 토큰을 생성하는 함수
    generateTokens = (userId) => {
        const accessToken = jwt.sign({ userId }, process.env.AC_KEY, {
            expiresIn: '10m',
        });

        const refreshToken = jwt.sign({ userId }, process.env.RF_KEY, {
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    };

    // 이메일과 비밀번호로 로그인하고 토큰을 반환합니다
    signIn = async (email, password) => {
        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            throw new CustomError(412, '이메일을 찾을 수 없습니다');
        } else if (user.password !== password) {
            throw new CustomError(412, '잘못된 비밀번호입니다');
        }

        // 토큰을 생성합니다
        const { accessToken, refreshToken } = this.generateTokens(user.userId);

        // 리프레시 토큰을 사용자 데이터에 저장 합니다.
        await prisma.users.update({ where: { userId: user.userId }, data: { refreshToken } });

        return { accessToken, refreshToken };
    };

};

