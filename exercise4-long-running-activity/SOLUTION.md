# Exercise 4 Solution: Long-Running Activity with Heartbeats

## activities.ts

```typescript
export async function processBatch(items: string[]): Promise<string[]> {
  const context = Context.current();
  const previousProgress = context.info.heartbeatDetails as BatchProgress | undefined;
  const startIndex = previousProgress?.lastProcessedIndex ?? 0;

  const results: string[] = previousProgress ? Array(startIndex).fill('') : [];

  for (let i = startIndex; i < items.length; i++) {
    // Check for cancellation
    await Promise.race([
      new Promise((r) => setTimeout(r, 200)),
      context.cancelled,
    ]);

    results.push(`processed-${items[i]}`);

    if ((i + 1) % 5 === 0) {
      context.heartbeat({
        processedCount: i + 1,
        totalCount: items.length,
        lastProcessedIndex: i + 1,
      });
      console.log(`Processed ${i + 1}/${items.length} items`);
    }
  }

  return results;
}
```

## workflow.ts

```typescript
const { processBatch } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 minutes',
  heartbeatTimeout: '15 seconds',
});
```

## Key Points
- `context.heartbeat()` stores checkpoint data that survives worker crashes
- `context.info.heartbeatDetails` retrieves the last checkpoint on retry
- `heartbeatTimeout` must be longer than the heartbeat interval
- `context.cancelled` is a Promise that rejects when the activity is cancelled
