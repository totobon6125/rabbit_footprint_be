import { SignUpRepo } from "../repositories/signup.repo.js"

export class SignUpServ {
    signUpRepository = new SignUpRepo();

    //# 회원 가입
    signUp = async (email, password) => {
        const signUp = await this.signUpRepository.signUp(email, password);

        return {
            email: signUp.email,
            password: signUp.password
        };
    };

    //! 회원가입 email 중복확인
    findUserByEmail = async (email) => {
        const user = await this.signUpRepository.findUserByEmail(email)
        // 레포지토리 계층에서 에러가 올라오면 return 이 되지 않고 throw 를 통해 컨트롤러 계층으로 이동합니다.
        return user; 
    };
}