export interface Transaction {
  id: string;
  amount: number;
  status: string;
}

export interface TransactionRequest {
  amount: number;
  fromAccount: string;
  toAccount: string;
}

export async function initTransaction(request: TransactionRequest): Promise<Transaction> {
  // Simulate fast validation (< 1s)
  if (request.amount <= 0) throw new Error('Invalid amount');
  return { id: `tx-${Date.now()}`, amount: request.amount, status: 'initialized' };
}

export async function completeTransaction(tx: Transaction): Promise<Transaction> {
  // Simulate slow processing (2-3s)
  await new Promise((r) => setTimeout(r, 2000));
  return { ...tx, status: 'completed' };
}

export async function cancelTransaction(tx: Transaction): Promise<void> {
  console.log(`Cancelling transaction ${tx.id}`);
}
