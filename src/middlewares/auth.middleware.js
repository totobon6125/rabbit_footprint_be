import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma/index.js';

export default async function (req, res, next) {
    try {
        // 1. 클라이언트로부터 쿠키(Cookie)를 전달받습니다.
        const cookies = req.cookies;
        const header = req.header;
        console.log("header:", req.headers)
        console.log("cookies:", req.cookies)

        const accessToken = cookies.accessToken;
        const refreshToken = cookies.refreshToken;

        console.log("at:", accessToken)
        console.log("rt:", refreshToken)

        // 2. 서버에서 발급한 JWT가 맞는지 검증합니다.
        const decodedToken = jwt.verify(accessToken, process.env.AC_KEY); // refreshToken을 사용하여 JWT를 검증합니다.
        const userId = decodedToken.userId;

        // 3. JWT의 userId를 이용해 사용자를 조회합니다.
        const user = await prisma.users.findFirst({
            where: { userId: +userId },
        });

        if (!user) {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            throw new Error('토큰 사용자가 존재하지 않습니다.');
        }

        // 4. req.user 에 조회된 사용자 정보를 할당합니다.
        req.user = user;

        // 5. 다음 미들웨어를 실행합니다.
        next();
    } catch (error) {

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        switch (error.name) {
            case 'TokenExpiredError':
                return res.status(401).json({ errMsg: '토큰이 만료 되었습니다.' });

            case 'JsonWebTokenError':
                return res.status(401).json({ errMsg: '토큰 검증에 실패했습니다' });

            default:
                return res.status(401).json({ errMsg: error.message || '비정상적인 요청입니다.' });
        }
    }
}
