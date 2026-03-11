import { Client } from '@temporalio/client';
import { userAccountWorkflow, suspendSignal, deleteSignal, updateProfileUpdate, getStateQuery } from '../workflow';

async function main() {
  const client = new Client();
  const userId = 'user-123';

  const handle = await client.workflow.start(userAccountWorkflow, {
    workflowId: userId,
    taskQueue: 'entity-task-queue',
    args: [userId],
  });

  // Update profile multiple times to trigger continue-as-new
  for (let i = 0; i < 25; i++) {
    await handle.executeUpdate(updateProfileUpdate, { args: [{ name: 'Alice', email: 'alice@example.com', updateCount: `${i}` }] });
    if ((i + 1) % 5 === 0) {
      console.log(`Profile updated ${i + 1} times`);
    }
  }
  console.log('All profile updates complete (should have triggered continue-as-new)');

  const state = await handle.query(getStateQuery);
  console.log('Current state:', state);

  await handle.signal(suspendSignal);
  console.log('User suspended');
}

main().catch((err) => { console.error(err); process.exit(1); });
