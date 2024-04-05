import { Response, Request } from "express"
import { User } from "../models/usersModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
export const userRgisteration = async (req: Request, res: Response) => {

    const { firstName, lastName, email, password, phone } = req.body
    if (!firstName || !lastName || !email || !password || !phone) {
        return res.status(400).json({
            message: "All fields are reqired !!"
        })
    }
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User(req.body);
        await user.save();
        // npm i jsonwebtoken
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        return res.status(200).send({ message: "User registered OK" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
}

export const validate_token = ((req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
});


export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        res.status(200).json({ userId: user._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const logout = async (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.send();
}



