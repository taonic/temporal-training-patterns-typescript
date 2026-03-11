# Exercise 4: Long-Running Activity with Heartbeats (30 min)

## Problem
Long-running activities processing large datasets can appear stuck, fail to detect cancellation, and restart from scratch after worker crashes — wasting all previous progress.

## Learning Objectives
- Use `context.heartbeat()` to report progress and store checkpoints
- Resume from last checkpoint after worker restart using `heartbeatDetails`
- Detect cancellation via `context.cancelled`
- Configure `heartbeatTimeout` to detect stuck activities

## Tasks

### 1. Add Heartbeating to Activity (15 min)
In `activities.ts`:
- Every 5 items, call `context.heartbeat({ processedCount, totalCount, lastProcessedIndex })`
- Check `context.cancelled` before processing each item — throw `CancelledFailure` if cancelled

### 2. Resume from Checkpoint (10 min)
- Read `context.info.heartbeatDetails` at the start of the activity
- If previous progress exists, start from `lastProcessedIndex` instead of 0

### 3. Configure Heartbeat Timeout (5 min)
In `workflow.ts`, add `heartbeatTimeout: '15 seconds'` to activity options

## Key Concepts
- **Heartbeat**: Periodic signal proving the activity is alive, with optional checkpoint data
- **heartbeatDetails**: Persisted data available to retry attempts for resumption
- **heartbeatTimeout**: If no heartbeat received within this window, activity is retried
- **Cancellation**: `context.cancelled` becomes a rejected promise when workflow cancels the activity

## Testing
1. Start the worker: `npx ts-node exercise4-long-running-activity/src/worker/index.ts`
2. Run the starter: `npx ts-node exercise4-long-running-activity/src/starter/index.ts`
3. Kill the worker mid-execution and restart — observe it resumes from checkpoint
