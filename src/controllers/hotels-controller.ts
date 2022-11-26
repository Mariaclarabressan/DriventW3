import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";

import hotelService from "@/services/hotels-service";
import ticketService from "@/services/tickets-service";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const hotels = await hotelService.getHotels(userId);

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;

  try {
    const userRoom = await hotelService.getRoomByHotelId(Number(hotelId));

    return res.status(httpStatus.OK).send(userRoom);
  } catch (error) {
    if(error.name === "UnauthorizeError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
