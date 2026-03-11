import { Client } from '@temporalio/client';
import { travelBookingWorkflow } from '../workflow';
import type { BookingRequest } from '../../exercise3/src/activities';

async function main() {
  const client = new Client();
  const request: BookingRequest = { userId: 'user-123', flightId: 'FL-456', hotelId: 'HT-789', carId: 'CR-012' };

  try {
    const handle = await client.workflow.start(travelBookingWorkflow, {
      workflowId: `booking-${Date.now()}`,
      taskQueue: 'saga-task-queue',
      args: [request],
    });
    const result = await handle.result();
    console.log('Booking successful:', result);
  } catch (err) {
    console.log('Booking failed, compensations ran:', (err as Error).message);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
