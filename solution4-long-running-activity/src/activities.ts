import { Context, CancelledFailure } from '@temporalio/activity';
import type { BatchProgress } from '../../exercise4/src/activities';

export async function processBatch(items: string[]): Promise<string[]> {
  const context = Context.current();
  const previousProgress = context.info.heartbeatDetails as BatchProgress | undefined;
  const startIndex = previousProgress?.lastProcessedIndex ?? 0;

  const results: string[] = previousProgress ? Array(startIndex).fill('') : [];

  for (let i = startIndex; i < items.length; i++) {
    try {
      await Promise.race([new Promise((r) => setTimeout(r, 200)), context.cancelled]);
    } catch (err) {
      if (err instanceof CancelledFailure) {
        console.log(`Activity cancelled at item ${i}`);
        throw err;
      }
    }

    results.push(`processed-${items[i]}`);

    if ((i + 1) % 5 === 0) {
      context.heartbeat({ processedCount: i + 1, totalCount: items.length, lastProcessedIndex: i + 1 });
      console.log(`Processed ${i + 1}/${items.length} items`);
    }
  }

  return results;
}
