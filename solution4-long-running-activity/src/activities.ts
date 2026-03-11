import { Context, CancelledFailure } from '@temporalio/activity';

export interface BatchProgress {
  processedCount: number;
  totalCount: number;
}

export async function processBatch(items: string[]): Promise<string[]> {
  const context = Context.current();
  const previousProgress = context.info.heartbeatDetails as BatchProgress | undefined;
  const startIndex = previousProgress?.processedCount ?? 0;

  const results: string[] = previousProgress ? Array(startIndex).fill('') : [];

  for (let i = startIndex; i < items.length; i++) {
    try {
      await Promise.race([new Promise((r) => setTimeout(r, 1000)), context.cancelled]);
    } catch (err) {
      if (err instanceof CancelledFailure) {
        console.log(`Activity cancelled at item ${i}`);
        return results;
      }
    }

    results.push(`processed-${items[i]}`);
    
    context.heartbeat({ processedCount: i + 1, totalCount: items.length });
    console.log(`Processed ${i + 1}/${items.length} items`);
  }

  return results;
}
