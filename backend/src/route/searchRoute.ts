import experess from "express";
export const searchRoute = experess.Router();
import { searchHotels } from "../controllers/searchController"
searchRoute.get("/search", searchHotels)

// export default searchRoute;