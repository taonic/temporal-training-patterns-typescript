import { Client } from '@temporalio/client';
import { longRunningWorkflow } from '../workflow';

async function main() {
  const client = new Client();
  const items = Array.from({ length: 20 }, (_, i) => `item-${i + 1}`);

  const handle = await client.workflow.start(longRunningWorkflow, {
    workflowId: `long-running-${Date.now()}`,
    taskQueue: 'long-running-task-queue',
    args: [items],
  });

  console.log(`Started workflow: ${handle.workflowId}`);
  const results = await handle.result();
  console.log(`Processed ${results.length} items`);
}

main().catch((err) => { console.error(err); process.exit(1); });
