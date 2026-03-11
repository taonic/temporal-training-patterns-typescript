# Exercise 1: Early Return Pattern (30 min)

## Problem
Clients need immediate feedback on whether an operation can proceed, but the full operation takes significant time. Blocking the client for the entire duration creates poor user experience.

## Learning Objectives
- Implement Update-with-Start for immediate client feedback
- Use `defineUpdate` and `setHandler` for update handlers
- Use `condition()` to block until initialization completes
- Split operations into fast init phase and slow completion phase

## Tasks

### 1. Implement the Update Handler (10 min)
In `workflow.ts`, set up the `returnInitResultUpdate` handler that:
- Waits for `initDone` using `condition()`
- Throws `initError` if initialization failed
- Returns `tx`

### 2. Implement Workflow Logic (10 min)
- Run `initTransaction(request)` using try/catch/finally
- Set `initDone = true` in `finally` to unblock the update handler
- If init failed: call `cancelTransaction` and throw
- If init succeeded: call `completeTransaction` and return result

### 3. Complete the Starter (10 min)
- Use `client.workflow.startWithUpdate` to start the workflow and receive the init result immediately
- Print the transaction ID as soon as it's available
- Wait for full workflow completion separately

## Key Concepts
- **Update-with-Start**: Single API call that starts a workflow and returns an update result
- **Local Activities**: Fast activities that run in the same process (no server roundtrip)
- **condition()**: Blocks until a predicate becomes true
- **Two-phase execution**: Fast init returns immediately, slow completion runs in background

## Testing
1. Start the worker: `npx ts-node exercise1-early-return/src/worker/index.ts`
2. Run the starter: `npx ts-node exercise1-early-return/src/starter/index.ts`
3. Observe that the transaction ID is printed before the workflow completes
