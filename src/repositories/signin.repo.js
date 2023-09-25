import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { prisma } from '../utils/prisma/index.js';
import { CustomError } from '../errors/customError.js';

export class SignInRepo {

    //* Access, Refresh Token을 생성합니다.
    generateTokens = (userId) => {
        const accessToken = jwt.sign({ userId }, process.env.AC_KEY, {
            expiresIn: '1h'
        });

        const refreshToken = jwt.sign({ userId }, process.env.RF_KEY, {
            expiresIn: '7d'
        });

        return { accessToken, refreshToken };
    };


    //* 이메일과 비밀번호로 로그인하고 토큰을 반환합니다
    signIn = async (email, password) => {
        const user = await prisma.users.findUnique({
            where: { email }
        });

        if (!user) {
            throw new CustomError(412, '이메일을 찾을 수 없습니다');
        }

        // 비밀번호 해싱 비교
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new CustomError(412, '잘못된 비밀번호입니다');
        }

        // 토큰을 생성합니다
        const { accessToken, refreshToken } = this.generateTokens(user.userId);

        // 리프레시 토큰을 사용자 데이터에 저장합니다.
        await prisma.users.update({ where: { userId: user.userId }, data: { refreshToken } });

        return { accessToken, refreshToken, user };
    };


    //* refreshToken을 사용하여 accessToken을 재발급합니다.
    refreshAccessToken = async (refreshToken) => {
        console.log(refreshToken)
        try {
            //# refreshToken을 검증합니다.
            const decodedToken = jwt.verify(refreshToken, process.env.RF_KEY);
            const userId = decodedToken.userId;
        
            //# 사용자 데이터베이스에서 refreshToken과 일치하는 사용자를 찾습니다.
            const user = await prisma.users.findUnique({
                where: { userId },
            });
        
            if (!user || user.refreshToken !== refreshToken) {
                throw new CustomError(401, '유효하지 않은 refreshToken');
            }
        
            //# 새로운 accessToken을 발급합니다.
            const newAccessToken = jwt.sign({ userId }, process.env.AC_KEY, {
                expiresIn: '1h'
            });

            return { accessToken: newAccessToken };
        } catch (error) {
            console.log(error)
            throw new CustomError(401, 'refreshToken 검증에 실패했습니다');
        }
    };
}
