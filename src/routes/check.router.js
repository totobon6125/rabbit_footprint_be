import express from 'express';

import { CheckEmailCtr } from '../controllers/checkEmail.ctr.js'
import { CheckNickNameCtr } from '../controllers/checkNickName.ctr.js'


const router = express.Router();
const checkEmailController = new CheckEmailCtr(); 
const checkNickNameController = new CheckNickNameCtr(); 

//* 회원가입 체크 - 이메일 중복검사
router.get('/Email', checkEmailController.checkEmail); 

//* 회원가입 체크 - 이메일 중복검사
router.get('/NickName', checkNickNameController.checkNickName); 


export default router;