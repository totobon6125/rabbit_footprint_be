import { ChangeNickServ } from "../services/changeNick.serv.js"

export class ChangeNickCtr {
    changeNickService = new ChangeNickServ();

    //# email 중복 확인
    changeNick = async (req, res, next) => {
        try {
            const { newNickname } = req.body;
            const { userId } = req.user;

            //! 닉네임 수정
            await this.changeNickService.changeNick(userId, newNickname);

            return res.status(201).json({ message: '사용가능한 nickname 입니다.' });

        } catch (err) {
            next(err);
        }
    }
}