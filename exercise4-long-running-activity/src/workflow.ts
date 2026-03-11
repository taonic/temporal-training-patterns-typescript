import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

// TODO: Configure heartbeatTimeout to detect stuck activities quickly
const { processBatch } = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 minutes',
  // TODO: Add heartbeatTimeout: '15 seconds'
});

export async function longRunningWorkflow(items: string[]): Promise<string[]> {
  return await processBatch(items);
}
