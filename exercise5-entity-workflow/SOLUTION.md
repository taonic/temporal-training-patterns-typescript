# Exercise 5 Solution: Entity Workflow Pattern

## workflow.ts

```typescript
setHandler(suspendSignal, () => {
  state.status = 'SUSPENDED';
  state.operationCount++;
});

setHandler(deleteSignal, () => {
  state.status = 'DELETED';
  state.operationCount++;
});

setHandler(updateProfileUpdate, async (newProfile: Record<string, string>) => {
  if (state.status === 'DELETED') throw new Error('Account is deleted');
  await persistProfile(userId, newProfile);
  state.profile = { ...state.profile, ...newProfile };
  state.operationCount++;
  if (state.operationCount >= CONTINUE_AS_NEW_THRESHOLD) {
    await continueAsNew<typeof userAccountWorkflow>(userId);
  }
});

setHandler(getStateQuery, () => state);
```

## Key Points
- Workflow ID = entity ID ensures one workflow per entity and idempotent starts
- `continueAsNew` resets history while the workflow continues with the same state
- Updates are synchronous — the client waits for the handler to complete
- Signals are async — the client doesn't wait for the handler
- Queries are read-only — they never modify state
