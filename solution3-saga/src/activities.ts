import { ApplicationFailure } from "@temporalio/workflow";

export interface BookingRequest {
  userId: string;
  flightId: string;
  hotelId: string;
  carId: string;
}

export async function bookFlight(req: BookingRequest): Promise<string> {
  console.log(`Booking flight ${req.flightId}`);
  return `flight-booking-${req.flightId}`;
}

export async function cancelFlight(req: BookingRequest): Promise<void> {
  console.log(`Cancelling flight ${req.flightId}`);
}

export async function bookHotel(req: BookingRequest): Promise<string> {
  console.log(`Booking hotel ${req.hotelId}`);
  return `hotel-booking-${req.hotelId}`;
}

export async function cancelHotel(req: BookingRequest): Promise<void> {
  console.log(`Cancelling hotel ${req.hotelId}`);
}

export async function bookCar(req: BookingRequest): Promise<string> {
  console.log(`Booking car ${req.carId}`);
  throw ApplicationFailure.nonRetryable('Car booking failed');
}

export async function cancelCar(req: BookingRequest): Promise<void> {
  console.log(`Cancelling car ${req.carId}`);
}
