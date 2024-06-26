import { Response, Request } from "express"
import { Hotel } from "../models/hotelsModel"
import { HotelType } from "../shared/types";
import cloudinary from "cloudinary"

export const addNewHotel = async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        const imageUrls = await uploadImages(imageFiles);

        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        const hotel = new Hotel(newHotel);
        await hotel.save();

        res.status(201).send(hotel);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
    }
}

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export const getAllHotel = async (req: Request, res: Response) => {
    try {
        console.log()

        const hotels = await Hotel.find({ userId: req.userId });
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
};

export const getHotelById = async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
        if (!id) {
            return res.json(
                { message: "Please provide hotel id" }
            )
        }
        const hotel = await Hotel.findOne({
            _id: id,
            userId: req.userId,
        });
        console.log(hotel)
        return res.json(hotel)
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
}

export const updatedHotelDetails = async (req: Request, res: Response) => {
    try {
        const updatedHotel: HotelType = req.body;
        updatedHotel.lastUpdated = new Date();

        const hotel = await Hotel.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.userId,
            },
            updatedHotel,
            { new: true }
        );

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);

        hotel.imageUrls = [
            ...updatedImageUrls,
            ...(updatedHotel.imageUrls || []),
        ];

        await hotel.save();
        res.status(201).json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Something went throw" });
    }
}