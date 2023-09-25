import { CheckEmailServ } from "../services/checkEmail.serv.js"

export class CheckEmailCtr {
    checkService = new CheckEmailServ();

    //# email 중복 확인
    checkEmail = async (req, res, next) => {
        try {
            const { email } = req.body;
            
            //!email 형태 확인
            const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
            if (!emailRegex.test(email)) { return res.status(400).json({ errorMessage: 'email 조건에 맞지 않습니다.' }) }

            //! email 중복확인
            const mail = await this.checkService.checkEmail(email);

            if (mail) {
                return res.status(222).json({ message: '중복된 email 입니다.' })
            }else {
                return res.status(200).json({ message: '사용 가능한 email 입니다.' })
            } 


        } catch (err) {
            next(err);
        }
    }
}