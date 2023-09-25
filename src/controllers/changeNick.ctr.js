import { ChangeNickServ } from "../services/changeNick.serv.js"

export class ChangeNickCtr {
    changeNickService = new ChangeNickServ();

    //# 닉네임 수정
    changeNick = async (req, res, next) => {
        try {
            const { newNickname } = req.body;
            const { UserId } = req.user;

            console.log("CT> req.user: ", req.user)
            console.log("CT> userId: ", UserId)
            
            //! 닉네임 수정
            await this.changeNickService.changeNick(UserId, newNickname);

            return res.status(201).json({ message: '닉네임이 변경되었습니다.' });

        } catch (err) {
            next(err);
        }
    }
}