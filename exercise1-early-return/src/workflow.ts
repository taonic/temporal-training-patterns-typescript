import { proxyLocalActivities, proxyActivities, defineUpdate, setHandler, condition } from '@temporalio/workflow';
import type * as activities from './activities';
import type { Transaction, TransactionRequest } from './activities';

const { initTransaction } = proxyLocalActivities<typeof activities>({
  startToCloseTimeout: '5 seconds',
});

const { completeTransaction, cancelTransaction } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30 seconds',
});

// TODO: Define an update named 'returnInitResult' that returns Transaction
export const returnInitResultUpdate = defineUpdate<Transaction, []>('returnInitResult');

export async function transactionWorkflow(request: TransactionRequest): Promise<Transaction> {
  let tx: Transaction | undefined;
  let initDone = false;
  let initError: Error | undefined;

  // TODO: Set up update handler for returnInitResultUpdate that:
  //   1. Waits for initDone using condition()
  //   2. Throws initError if it exists
  //   3. Returns tx

  // TODO: Run initTransaction(request) in try/catch/finally
  //   - On success: set tx
  //   - On error: set initError
  //   - Finally: set initDone = true

  // TODO: If initError, call cancelTransaction and throw
  // TODO: Call completeTransaction and return result
  return tx!;
}
