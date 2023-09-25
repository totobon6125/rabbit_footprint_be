import { ChangeNickRepo } from "../repositories/changeNick.repo.js"

export class ChangeNickServ {
    changeNickRepository = new ChangeNickRepo();

    //! 닉네임 수정하기
    changeNick = async (userId, nickname) => {
        const userInfos = await this.changeNickRepository.changeNick(userId, nickname)
        
        return userInfos;
    };
}