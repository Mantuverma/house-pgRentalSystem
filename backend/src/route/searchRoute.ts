import experess from "express";
export const searchRoute = experess.Router();
import { searchHotels, HotelDetails } from "../controllers/searchController"
searchRoute.get("/search", searchHotels)
searchRoute.get("/:id", HotelDetails)


// export default searchRoute;