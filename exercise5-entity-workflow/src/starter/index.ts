import { Client } from '@temporalio/client';
import { userAccountWorkflow, suspendSignal, deleteSignal, updateProfileUpdate, getStateQuery } from '../workflow';

async function main() {
  const client = new Client();
  const userId = 'user-123';

  // Start entity workflow (idempotent — safe to call multiple times)
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

  // Query state
  const state = await handle.query(getStateQuery);
  console.log('Current state:', state);

  // Suspend
  await handle.signal(suspendSignal);
  console.log('User suspended');

  // Delete
  await handle.signal(deleteSignal);
  await handle.result();
  console.log('User deleted, workflow complete');
}

main().catch((err) => { console.error(err); process.exit(1); });
