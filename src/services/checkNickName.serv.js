import { CheckNickNameRepo } from "../repositories/checkNickName.repo.js"

export class CheckNickNameServ {
    checkNickNameRepository = new CheckNickNameRepo();

    //! 회원가입 nickname 중복확인
    checkNickName = async (nickname) => {
        const user = await this.checkNickNameRepository.checkNickName(nickname)
        // 레포지토리 계층에서 에러가 올라오면 return 이 되지 않고 throw 를 통해 컨트롤러 계층으로 이동합니다.
        return user;
    };
}