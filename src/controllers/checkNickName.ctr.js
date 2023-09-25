import { CheckNickNameServ } from "../services/checkNickName.serv.js"

export class CheckNickNameCtr {
    checkNickNameService = new CheckNickNameServ();

    //# nickname 중복 확인
    checkNickName = async (req, res, next) => {
        try {
            const { nickname } = req.body;

            //!nickname 형태 확인은 덤
            const nicknameRegex = /^[a-zA-Z0-9가-힣._%+-]{1,5}$/;
            if (!nicknameRegex.test(nickname)) {
                return res.status(400).json({ errorMessage: 'nickname 조건에 맞지 않습니다.' });
            }

            //! email 중복확인
            await this.checkNickNameService.checkNickName(nickname);

            return res.status(201).json({ message: '사용가능한 nickname 입니다.' });

        } catch (err) {
            next(err);
        }
    }
}