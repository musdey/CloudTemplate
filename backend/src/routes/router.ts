import express, { Request, Response } from 'express'
import { signup, signin } from '../controllers/auth.controller'
import { allAccess, userBoard, adminBoard, moderatorBoard } from '../controllers/user.controller'
import authJwt from '../middleware/authJwt'

import verifySignUp from '../middleware/verifySignup'

const router = express.Router()

// Route für alle
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the CICEK.digital Template" });
});
router.post(
  "/api/auth/signup", verifySignUp.checkDuplicateUsernameOrEmail, signup
);
router.post("/api/auth/signin", signin)
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
