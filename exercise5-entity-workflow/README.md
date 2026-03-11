# Exercise 5: Entity Workflow Pattern (30 min)

## Problem
Long-lived business entities (users, accounts, devices) need consistent state management, audit trails, and safe concurrent operations over their entire lifetime — potentially months or years.

## Learning Objectives
- Model a business entity as a long-running workflow
- Use signals for async state changes (suspend, delete)
- Use updates for synchronous operations with validation (updateProfile)
- Use queries for read-only state inspection
- Implement Continue-As-New to prevent unbounded history

## Tasks

### 1. Set Up Signal Handlers (10 min)
In `workflow.ts`, use `setHandler` for:
- `suspendSignal`: set `state.status = 'SUSPENDED'`, increment `operationCount`
- `deleteSignal`: set `state.status = 'DELETED'`, increment `operationCount`

### 2. Set Up Update Handler (10 min)
For `updateProfileUpdate`:
- Throw if `state.status === 'DELETED'`
- Call `persistProfile(userId, newProfile)` activity
- Update `state.profile`
- Increment `operationCount`
- If `operationCount >= CONTINUE_AS_NEW_THRESHOLD`, call `continueAsNew(userId)`

### 3. Set Up Query Handler (5 min)
For `getStateQuery`: return `state`

### 4. Test the Entity (5 min)
Run the starter and observe signals, updates, and queries working on the same workflow

## Key Concepts
- **Entity ID = Workflow ID**: One workflow per entity, idempotent starts
- **Signals**: Async state changes that don't need a response
- **Updates**: Synchronous operations with validation and return values
- **Queries**: Read-only state inspection without side effects
- **Continue-As-New**: Resets history while preserving state — prevents history size limits

## Testing
1. Start the worker: `npx ts-node exercise5-entity-workflow/src/worker/index.ts`
2. Run the starter: `npx ts-node exercise5-entity-workflow/src/starter/index.ts`
3. Observe the workflow in Temporal UI — note signals, updates, and queries in history
