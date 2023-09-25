import { ChangeNickRepo } from "../repositories/changeNick.repo.js"

export class ChangeNickServ {
    changeNickRepository = new ChangeNickRepo();

    //! 닉네임 수정하기
    changeNick = async (UserId, newNickname) => {
        const userInfos = await this.changeNickRepository.changeNick(UserId, newNickname)
        
        return userInfos;
    };
}