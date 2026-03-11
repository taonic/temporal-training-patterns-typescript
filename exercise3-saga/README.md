# Exercise 3: Saga Pattern (30 min)

## Problem
A travel booking requires flight, hotel, and car reservations. If any step fails, all previously completed bookings must be cancelled to maintain consistency.

## Learning Objectives
- Implement the Saga pattern for distributed transaction management
- Register compensating actions before each step
- Execute compensations in reverse order on failure

## Tasks

### 1. Implement Saga Workflow (25 min)
In `workflow.ts`:
- Before calling `bookFlight`, push `() => cancelFlight(request)` to `compensations`
- Before calling `bookHotel`, push `() => cancelHotel(request)` to `compensations`
- Before calling `bookCar`, push `() => cancelCar(request)` to `compensations`
- In the `catch` block, run all compensations in reverse order

### 2. Test Failure Scenarios (5 min)
- Car booking has 30% failure rate — observe compensations running

## Key Concepts
- **Saga Pattern**: Sequence of local transactions with compensating actions
- **Compensation**: Undo a completed step (cancel booking, refund payment)
- **LIFO Order**: Compensations run in reverse order of registration
- **Register Before Execute**: Push compensation before calling activity to handle partial failures

## Testing
1. Start the worker: `npx ts-node exercise3-saga/src/worker/index.ts`
2. Run the starter: `npx ts-node exercise3-saga/src/starter/index.ts`
3. Run multiple times to observe both success and compensation scenarios
