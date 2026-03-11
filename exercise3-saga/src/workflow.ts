import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import type { BookingRequest } from './activities';

const { bookFlight, cancelFlight, bookHotel, cancelHotel, bookCar, cancelCar } =
  proxyActivities<typeof activities>({ startToCloseTimeout: '10 seconds' });

type Compensation = () => Promise<void>;

export interface BookingResult {
  flightBookingId: string;
  hotelBookingId: string;
  carBookingId: string;
}

// TODO: Implement the Saga pattern for travel booking
// 1. Create a compensations array
// 2. Wrap all steps in try/catch
// 3. Before each booking, push its cancel function to compensations
// 4. On error, run all compensations in reverse order (compensations.reverse())
// 5. Re-throw the error after compensating
export async function travelBookingWorkflow(request: BookingRequest): Promise<BookingResult> {
  const compensations: Compensation[] = [];

  try {
    // TODO: Book flight, register cancelFlight as compensation
    const flightBookingId = await bookFlight(request);

    // TODO: Book hotel, register cancelHotel as compensation
    const hotelBookingId = await bookHotel(request);

    // TODO: Book car, register cancelCar as compensation
    const carBookingId = await bookCar(request);

    return { flightBookingId, hotelBookingId, carBookingId };
  } catch (err) {
    // TODO: Run compensations in reverse order
    throw err;
  }
}
