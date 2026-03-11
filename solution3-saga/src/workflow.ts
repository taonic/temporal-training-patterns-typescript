import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import type { BookingRequest } from './activities';

export interface BookingResult {
  flightBookingId: string;
  hotelBookingId: string;
  carBookingId: string;
}

const { bookFlight, cancelFlight, bookHotel, cancelHotel, bookCar, cancelCar } =
  proxyActivities<typeof activities>({ startToCloseTimeout: '10 seconds' });

type Compensation = () => Promise<void>;

export async function travelBookingWorkflow(request: BookingRequest): Promise<BookingResult|null> {
  const compensations: Compensation[] = [];

  try {
    compensations.unshift(() => cancelFlight(request));
    const flightBookingId = await bookFlight(request);

    compensations.unshift(() => cancelHotel(request));
    const hotelBookingId = await bookHotel(request);

    compensations.unshift(() => cancelCar(request));
    const carBookingId = await bookCar(request);

    return { flightBookingId, hotelBookingId, carBookingId };
  } catch (err) {
    for (const compensation of compensations) {
      await compensation();
    }
    return null;
  }
}
