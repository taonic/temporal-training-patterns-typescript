import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { processBatch } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 minutes',
  heartbeatTimeout: '2 seconds',
});

export async function longRunningWorkflow(items: string[]): Promise<string[]> {
  return await processBatch(items);
}
