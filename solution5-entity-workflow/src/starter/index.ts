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

  await handle.executeUpdate(updateProfileUpdate, { args: [{ name: 'Alice', email: 'alice@example.com' }] });
  console.log('Profile updated');

  const state = await handle.query(getStateQuery);
  console.log('Current state:', state);

  await handle.signal(suspendSignal);
  console.log('User suspended');

  await handle.signal(deleteSignal);
  await handle.result();
  console.log('User deleted, workflow complete');
}

main().catch((err) => { console.error(err); process.exit(1); });
