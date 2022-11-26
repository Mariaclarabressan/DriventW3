import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findHotelById(hotelId: number) {
  return prisma.hotel.findFirst({
    where: { id: hotelId }
  });
}

async function findRoomById(hotelId: number) {
  return prisma.hotel.findMany({
    where: { id: hotelId },
    include: {
      Rooms: true
    }
  });
}

const hotelRepository = {
  findHotelById,
  findHotels,
  findRoomById
};

export default hotelRepository;
