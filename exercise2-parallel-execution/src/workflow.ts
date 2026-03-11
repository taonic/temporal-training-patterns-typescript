import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import type { ProcessResult } from './activities';

const { processItem } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});

// TODO: Implement parallel execution workflow
// 1. Launch all processItem() calls concurrently using Promise.all()
// 2. Return all results
// Hint: map items to promises, then await Promise.all()
export async function parallelWorkflow(items: string[]): Promise<ProcessResult[]> {
  // TODO: Replace sequential implementation with parallel
  const results: ProcessResult[] = [];
  for (const item of items) {
    results.push(await processItem(item));
  }
  return results;
}
