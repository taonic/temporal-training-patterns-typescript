# Exercise 3 Solution: Saga Pattern

## workflow.ts

```typescript
export async function travelBookingWorkflow(request: BookingRequest): Promise<BookingResult> {
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
    throw err;
  }
}
```

## Key Points
- `unshift()` prepends to the array so compensations are already in reverse order
- Compensations are registered **before** the activity executes to handle partial failures
- Each compensation is idempotent — safe to call even if the forward action never completed
- Temporal guarantees compensations will run even after worker restarts
