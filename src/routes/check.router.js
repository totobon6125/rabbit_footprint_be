import express from 'express';

import { CheckEmailCtr } from '../controllers/checkEmail.ctr.js'
import { CheckNickNameCtr } from '../controllers/checkNickName.ctr.js'
import { ChangeNickCtr } from '../controllers/changeNick.ctr.js'
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();
const checkEmailController = new CheckEmailCtr(); 
const checkNickNameController = new CheckNickNameCtr(); 
const changeNickController = new ChangeNickCtr(); 

//* 회원가입 체크 - 이메일 중복검사
router.get('/Email', checkEmailController.checkEmail); 

//* 회원가입 체크 - 이메일 중복검사
router.get('/NickName', checkNickNameController.checkNickName); 

//* 닉네임 수정 
router.put('/mypage/:userInfoId', authMiddleware, changeNickController.changeNick); 

export default router;