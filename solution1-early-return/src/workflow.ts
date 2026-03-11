import { proxyLocalActivities, proxyActivities, defineUpdate, setHandler, condition } from '@temporalio/workflow';
import type * as activities from './activities';
import type { Transaction, TransactionRequest } from './activities';

const { initTransaction } = proxyLocalActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

const { completeTransaction, cancelTransaction } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
});

export const returnInitResultUpdate = defineUpdate<Transaction, []>('returnInitResult');

export async function transactionWorkflow(request: TransactionRequest): Promise<Transaction> {
  let tx: Transaction | undefined;
  let initDone = false;
  let initError: Error | undefined;

  setHandler(returnInitResultUpdate, async () => {
    await condition(() => initDone);
    if (initError) throw initError;
    return tx!;
  });

  try {
    tx = await initTransaction(request);
  } catch (err) {
    initError = err as Error;
  } finally {
    initDone = true;
  }

  if (initError) {
    await cancelTransaction(tx!);
    throw initError;
  }

  return await completeTransaction(tx!);
}
