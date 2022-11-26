import hotelRepository from "@/repositories/hotel-repository";
import { notFoundError, conflictError } from "@/errors";

import ticketService from "../tickets-service";

async function getHotels(userId: number) {
  const userTicked = await ticketService.getTicketByUserId(userId);

  if(!userTicked) {
    throw notFoundError();
  }

  if(!userTicked.TicketType.includesHotel) throw notFoundError();
    
  if(userTicked.status === "RESERVED") throw conflictError("Paid firts engraçadinho! "); 
    
  if(userTicked.TicketType.isRemote) throw conflictError("Tá em casa!");

  const hotels = await hotelRepository.findHotels();
  return hotels;
}

async function getRoomByHotelId(hotelId: number) {
  const room = await hotelRepository.findRoomById(hotelId);

  if(!room) {
    throw notFoundError();
  }

  return room;
}

const hotelService = {
  getHotels,
  getRoomByHotelId
};

export default hotelService;
