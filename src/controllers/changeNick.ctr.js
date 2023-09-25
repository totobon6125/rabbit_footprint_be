import { ChangeNickServ } from "../services/changeNick.serv.js"

export class ChangeNickCtr {
    changeNickService = new ChangeNickServ();

    //# 닉네임 수정
    changeNick = async (req, res, next) => {
        try {
            const { nickname } = req.body;
            const { userId } = req.user;
            console.log(nickname)
            //! 닉네임 수정
            await this.changeNickService.changeNick(userId, nickname);

            return res.status(201).json({ message: '닉네임이 변경되었습니다.' });

        } catch (err) {
            next(err);
        }
    }
}