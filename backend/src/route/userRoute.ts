import express from "express"
import { userRgisteration, validate_token, login, logout } from "../controllers/userController";
import verifyToken from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registeration", userRgisteration)
userRouter.get("/validate-token", verifyToken, validate_token)
userRouter.post("/login", login)
userRouter.post("/logout", logout)
export default userRouter