import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';
import type { ProcessResult } from './activities';

const { processItem } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});

export async function parallelWorkflow(items: string[]): Promise<ProcessResult[]> {
  return await Promise.all(items.map((item) => processItem(item)));
}
