import express, { Request, Response } from 'express'
import { signup, signin, signinWithOTP, requestOTP } from '../controllers/auth.controller'
import { passwordReset, passwordResetRequest, passwordResetCheckToken } from '../controllers/pw.controller'
import { allAccess, userBoard, adminBoard, moderatorBoard } from '../controllers/user.controller'
import { verifyMail } from '../controllers/verifyMail.controller'
import authJwt from '../middleware/authJwt'
import verifyBody from '../middleware/verifyBody'
import verifySignUp from '../middleware/verifySignup'

const router = express.Router()

router.post('*', verifyBody)
router.post(
  "/auth/signup", verifySignUp.checkDuplicateUsernameOrEmail, signup
);
router.post("/auth/signin", signin)
router.post("/auth/signinWithOTP", signinWithOTP)
router.post("/auth/requestOTP", requestOTP)

router.get("/pw/reset-pw-request", passwordResetRequest)
router.get("/pw/reset-pw-check", passwordResetCheckToken)
router.post("/pw/reset-pw", passwordReset)

router.get("/mail/verifyMail", verifyMail)
router.get("/test/all", allAccess);
router.get("/user", [authJwt.verifyToken], userBoard);
router.get(
  "/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  moderatorBoard
);

router.get(
  "/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  adminBoard
);

export default router
