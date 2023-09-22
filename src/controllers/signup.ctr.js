import { SignUpServ } from "../services/signup.serv.js"

export class SignUpCtr {
    signUpService = new SignUpServ();

    //# 회원 가입
    signUp = async (req, res, next) => {
        try {
            const { email, nickname, password, confirm } = req.body;

            //!email 형태 확인
            const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
            if (!emailRegex.test(email)) { return res.status(400).json({ errorMessage: 'email 조건에 맞지 않습니다.' }) }

            //! email 중복확인
            await this.signUpService.findUserByEmail(email);
            // 레포지토리에서 출발한 error 는 try-catch 를 통해 catch(err) 로 잡혀 갑니다.

            //! nickname 중복확인
            await this.signUpService.findUserByNickName(nickname);

            //! 비밀번호 확인
            const passwordRegex = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,}$/i);
            if (password.includes(email)) { return res.status(412).json({ errorMessage: '패스워드에 email이 포함되어 있습니다.' }) };
            if (!passwordRegex.test(password)) { return res.status(400).json({ errorMessage: 'password 조건에 맞지 않습니다.' }) }
            if (password !== confirm) { return res.status(412).json({ errorMessage: '패스워드와 확인 이 다릅니다.' }) };

            await this.signUpService.signUp(email, nickname, password);

            return res.status(201).json({ message: '회원가입에 성공하였습니다.' });

        } catch (err) {
            // 잡혀온 에러는 next(err)를 통해 에러 핸들러로 이동합니다. 만약 ( ) 안에 인자가 설정되어 있지 않다면 다음 미들웨어로 넘어가지만 (err) 이 있기에 에러 핸들러로 이동합니다.
            // app.js 의 errhandler 를 통해 미들웨어 폴더의 error.middleware 로 이동합니다.ㄴ
            next(err);
        }
    }
}