export async function sendNotification(userId: string, message: string): Promise<void> {
  console.log(`Notification to ${userId}: ${message}`);
}

export async function persistProfile(userId: string, profile: Record<string, string>): Promise<void> {
  console.log(`Persisting profile for ${userId}:`, profile);
}
