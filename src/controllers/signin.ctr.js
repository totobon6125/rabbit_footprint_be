import { SignInServ } from "../services/signin.serv.js"

export class SignInCtr {
    signInService = new SignInServ();

    //# 로그인 API
    signIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const token = await this.signInService.signIn(email, password);

            //? cookie 매서드가 아닌 header 매서드를 사용해야 FE가 res.header 에서 받아서 사용할 수 있다.
            res.header('Authorization', `Bearer ${token}`);

            return res.status(200).json({ Message: "로그인 성공" });
        } catch (err) {
            next(err)
        }
    }

    //# 로그 아웃 API
    signOut = async (req, res, next) => {
        try {
            console.log(req.headers.cookie)
            const token = req.headers.cookie.split(' ')[1];
            console.log(token)

            return res.status(200).json({ Message: "로그아웃 성공" });
        } catch (err) {
            res.status(400).json({ errMessage: '이미 로그아웃 하셨습니다.' });
        }
    }

    // 토큰 확인 용 
    token = async (req, res, next) => {
        try {
            const token = req.headers.cookie;
            console.log("토큰 확인", token)
            return res.status(200).json({ Message: "토큰값 확인용" });
        } catch (err) {
            res.status(400).json({ errMessage: '확인 안됨 에러!!' });
        }
    }
}