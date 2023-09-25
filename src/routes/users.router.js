import express from "express";

import { UsersCtr } from "../controllers/users.ctr.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const usersController = new UsersCtr();

// (1) 내 정보 등록 API
router.post(
  "/mypage/:userInfoId",
  authMiddleware,
  usersController.createUserInfo
);

// (2) 내 정보 조회 API
router.get("/mypage", authMiddleware, usersController.getUserInfo);

// (3) 내 정보 수정 API
router.put(
  "/mypage/:userInfoId",
  authMiddleware,
  usersController.updateUserInfo
);

// (4) 랜덤으로 다른 유저에게 보내기 API
router.get("/random", authMiddleware, usersController.getRandomUser);

export default router;
