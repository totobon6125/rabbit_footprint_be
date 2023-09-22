import { CustomError } from "../errors/customError.js";
// 잡혀온 err 는 여기서 class CustomError를 통해 처리되거나 처리되지 않는 error 는 500 error 로 분류 됩니다.
export default function (err, req, res, next) {
    
    if (err instanceof CustomError) {
        return res.status(err.status).json({ errorMessage: err.message })
    };
    console.log(err)
    return res.status(500).json({ errorMessage: '서버 내부 에러가 발생했습니다.' });
};
