# Exercise 2 Solution: Parallel Execution Pattern

## workflow.ts

```typescript
export async function parallelWorkflow(items: string[]): Promise<ProcessResult[]> {
  return await Promise.all(items.map((item) => processItem(item)));
}
```

## Key Points
- `Promise.all()` dispatches all activities simultaneously
- Temporal schedules each activity independently with its own retry policy
- Total time ≈ slowest single activity instead of sum of all activities
- For rate-limited APIs, batch with `Promise.all()` on chunks: `items.slice(i, i + batchSize)`
