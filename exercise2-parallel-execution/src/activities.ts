export interface ProcessResult {
  item: string;
  result: string;
  durationMs: number;
}

export async function processItem(item: string): Promise<ProcessResult> {
  const start = Date.now();
  // Simulate variable processing time
  await new Promise((r) => setTimeout(r, Math.random() * 1000 + 500));
  return { item, result: `processed-${item}`, durationMs: Date.now() - start };
}
