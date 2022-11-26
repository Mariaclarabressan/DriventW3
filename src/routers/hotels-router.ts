import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getRooms } from "@/controllers";

const hotelRouter = Router();

hotelRouter
  .all("/*", authenticateToken)
  .get("/hotels", getHotels)
  .get("/hotels/:id", getRooms);

export { hotelRouter };

