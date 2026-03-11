# Exercise 1 Solution: Early Return Pattern

## workflow.ts

```typescript
setHandler(returnInitResultUpdate, async () => {
  await condition(() => initDone);
  if (initError) throw initError;
  return tx!;
});

try {
  tx = await initTransaction(request);
} catch (err) {
  initError = err as Error;
} finally {
  initDone = true;
}

if (initError) {
  await cancelTransaction(tx!);
  throw initError;
}

return await completeTransaction(tx!);
```

## starter/index.ts

```typescript
const handle = await client.workflow.startWithUpdate(transactionWorkflow, {
  workflowId: `transaction-${Date.now()}`,
  taskQueue: 'early-return-task-queue',
  args: [request],
  update: { name: 'returnInitResult' },
});

const tx = await handle.updateResult();
console.log(`Transaction initialized immediately: ${tx.id}`);

const result = await handle.workflowHandle.result();
console.log(`Transaction completed: ${result.status}`);
```

## Key Points
- `condition()` blocks the update handler until `initDone` is set in `finally`
- `proxyLocalActivities` runs init in the same worker process — no server roundtrip
- Client gets the transaction ID before `completeTransaction` finishes
