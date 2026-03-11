import { Client } from '@temporalio/client';
import { transactionWorkflow, returnInitResultUpdate } from '../workflow';
import type { TransactionRequest } from '../activities';

async function main() {
  const client = new Client();

  const request: TransactionRequest = { amount: 100, fromAccount: 'account-123', toAccount: 'account-456' };

  const handle = await client.workflow.start(transactionWorkflow, {
    workflowId: `transaction-${Date.now()}`,
    taskQueue: 'early-return-task-queue',
    args: [request],
  });

  const tx = await handle.executeUpdate(returnInitResultUpdate);
  console.log(`Transaction initialized immediately: ${tx.id}`);
  console.log('Workflow continues in background...');

  const result = await handle.result();
  console.log(`Transaction completed: ${result.status}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
