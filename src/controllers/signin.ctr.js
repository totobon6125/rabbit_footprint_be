import { SignInServ } from "../services/signin.serv.js"

export class SignInCtr {
    signInService = new SignInServ();

    //# 로그인 API
    signIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const token = await this.signInService.signIn(email, password);

            //? cookie 매서드가 아닌 header 매서드를 사용해야 FE가 res.header 에서 받아서 사용할 수 있다.
            res.cookie('accessToken', `${token.accessToken}`)
            res.header('accessToken', `${token.accessToken}`);
            res.header('refreshToken', `${token.refreshToken}`);

            return res.status(200).json({ Message: "로그인 성공", data: token });
        } catch (err) {
            next(err)
        }
    }


    //# 로그 아웃 API


    //# 토큰 재발행 용 
    refreshAccessToken = async (req, res, next) => {
        try {
            const { refreshToken } = req.body; // 클라이언트로부터 refreshToken을 받습니다. 바디에서?? 헤더가 아닌가? 아니면 그냥 쿠키에서 받야야 하나??

            const newAccessToken = await this.signInService.refreshAccessToken(refreshToken);

            // 새로운 accessToken을 클라이언트에게 전달합니다.
            res.header('accessToken', `${newAccessToken.accessToken}`);

            return res.status(200).json({ Message: "새로운 accessToken 발급 성공", data: newAccessToken.accessToken });
        } catch (err) {
            next(err);
        }
    }
}