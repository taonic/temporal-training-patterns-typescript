# Exercise 2: Parallel Execution Pattern (30 min)

## Problem
Sequential activity execution causes unnecessary delays when operations are independent. Total time equals the sum of all durations instead of the maximum.

## Learning Objectives
- Execute multiple activities concurrently using `Promise.all()`
- Understand the performance difference between sequential and parallel execution
- Collect and process results from parallel operations

## Tasks

### 1. Implement Parallel Workflow (20 min)
In `workflow.ts`, replace the sequential `for` loop with parallel execution:
- Map `items` to an array of `processItem()` promises
- Use `Promise.all()` to wait for all to complete
- Return all results

### 2. Observe the Difference (10 min)
- Run the sequential version and note the total time
- Implement parallel version and compare

## Key Concepts
- **Promise.all()**: Waits for all promises to resolve concurrently
- **Temporal + Promises**: Each `proxyActivities` call returns a Promise — they can be run in parallel natively
- **Fan-out/Fan-in**: Dispatch multiple operations, collect all results

## Testing
1. Start the worker: `npx ts-node exercise2-parallel-execution/src/worker/index.ts`
2. Run the starter: `npx ts-node exercise2-parallel-execution/src/starter/index.ts`
3. Compare total time: sequential ≈ sum of durations, parallel ≈ max duration
