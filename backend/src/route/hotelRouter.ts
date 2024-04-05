import express from "express"
import verifyToken from "../middleware/auth";
import { addNewHotel } from "../controllers/hotelController";
const hotelRouter = express.Router();
import multer from "multer"
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});


hotelRouter.post("/addHotel", verifyToken, upload.array("imageFiles", 6), addNewHotel)

export default hotelRouter;