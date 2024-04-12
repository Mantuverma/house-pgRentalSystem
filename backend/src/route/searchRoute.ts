import experess from "express";
const searchRoute = experess.Router();
import { searchHotels } from "../controllers/searchController"
searchRoute.get("/hotels", searchHotels)

export default searchRoute;