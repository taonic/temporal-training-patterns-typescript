import { Client } from '@temporalio/client';
import { parallelWorkflow } from '../workflow';

async function main() {
  const client = new Client();
  const items = ['item-1', 'item-2', 'item-3', 'item-4', 'item-5'];

  const start = Date.now();
  const handle = await client.workflow.start(parallelWorkflow, {
    workflowId: `parallel-${Date.now()}`,
    taskQueue: 'parallel-task-queue',
    args: [items],
  });

  const results = await handle.result();
  console.log(`Completed in ${Date.now() - start}ms`);
  results.forEach((r) => console.log(`${r.item}: ${r.result} (${r.durationMs}ms)`));
}

main().catch((err) => { console.error(err); process.exit(1); });
