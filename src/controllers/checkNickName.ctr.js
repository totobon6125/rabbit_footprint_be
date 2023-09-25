import { CheckNickNameServ } from "../services/checkNickName.serv.js"

export class CheckNickNameCtr {
    checkNickNameService = new CheckNickNameServ();

    //# nickname 중복 확인
    checkNickName = async (req, res, next) => {
        try {
            const { nickname } = req.query;
            console.log(nickname)

            //!nickname 형태 확인은 덤
            const nicknameRegex = /^[a-zA-Z0-9가-힣._%+-]{1,5}$/;
            if (!nicknameRegex.test(nickname)) {
                return res.status(400).json({ errorMessage: 'nickname 조건에 맞지 않습니다.' });
            }

            //! nickname 중복확인
            const nick = await this.checkNickNameService.checkNickName(nickname);

            if (nick) {
                return res.status(222).json({ message: '중복된 닉네임 입니다.' })
            }else {
                return res.status(200).json({ message: '사용 가능한 닉네임 입니다.' })
            } 


        } catch (err) {
            next(err);
        }
    }
}