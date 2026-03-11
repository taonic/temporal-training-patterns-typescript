import { Worker } from '@temporalio/worker';
import * as activities from '../activities';

async function main() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflow'),
    activities,
    taskQueue: 'parallel-task-queue',
  });
  await worker.run();
}

main().catch((err) => { console.error(err); process.exit(1); });
