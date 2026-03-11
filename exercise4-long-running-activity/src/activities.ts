import { Context } from '@temporalio/activity';

export interface BatchProgress {
  processedCount: number;
  totalCount: number;
  lastProcessedIndex: number;
}

export async function processBatch(items: string[]): Promise<string[]> {
  const context = Context.current();

  // Check for previous progress (resume after crash)
  // TODO: Get heartbeat details using context.info.heartbeatDetails
  const previousProgress = context.info.heartbeatDetails as BatchProgress | undefined;
  const startIndex = previousProgress?.lastProcessedIndex ?? 0;

  const results: string[] = previousProgress
    ? Array(startIndex).fill('') // placeholder for already-processed items
    : [];

  for (let i = startIndex; i < items.length; i++) {
    // TODO: Check for cancellation and heartbeat every 5 items
    // Use context.heartbeat({ processedCount: i + 1, totalCount: items.length, lastProcessedIndex: i + 1 })
    // Use context.cancelled to check if cancelled

    // Simulate processing time
    await new Promise((r) => setTimeout(r, 200));
    results.push(`processed-${items[i]}`);

    if ((i + 1) % 5 === 0) {
      // TODO: Send heartbeat with current progress
      console.log(`Processed ${i + 1}/${items.length} items`);
    }
  }

  return results;
}
