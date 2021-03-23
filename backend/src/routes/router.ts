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
  "/api/auth/signup", verifySignUp.checkDuplicateUsernameOrEmail, signup
);
router.post("/api/auth/signin", signin)
router.post("/api/auth/signinWithOTP", signinWithOTP)
router.post("/api/auth/requestOTP", requestOTP)
router.get("/api/pw/reset-pw-request", passwordResetRequest)
router.get("/api/pw/reset-pw-check", passwordResetCheckToken)
router.post("/api/pw/reset-pw", passwordReset)
router.get("/api/mail/verifyMail", verifyMail)
router.get("/api/test/all", allAccess);
router.get("/api/test/user", [authJwt.verifyToken], userBoard);
router.get(
  "/api/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  moderatorBoard
);

router.get(
  "/api/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  adminBoard
);

export default router
