import { CheckEmailRepo } from "../repositories/checkEmail.repo.js"

export class CheckEmailServ {
    checkEmailRepository = new CheckEmailRepo();

    //! 회원가입 email 중복확인
    checkEmail = async (email) => {
        const user = await this.checkEmailRepository.checkEmail(email)
        // 레포지토리 계층에서 에러가 올라오면 return 이 되지 않고 throw 를 통해 컨트롤러 계층으로 이동합니다.
        return user;
    };
}