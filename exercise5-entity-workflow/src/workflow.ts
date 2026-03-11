import { proxyActivities, defineSignal, defineQuery, defineUpdate, setHandler, condition, continueAsNew } from '@temporalio/workflow';
import type * as activities from './activities';

const { sendNotification, persistProfile } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});

export interface UserState {
  userId: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'DELETED';
  profile: Record<string, string>;
  operationCount: number;
}

// TODO: Define signals, queries, and updates:
// - suspendSignal: defineSignal('suspend')
// - deleteSignal: defineSignal('delete')
// - updateProfileUpdate: defineUpdate<void, [Record<string, string>]>('updateProfile')
// - getStateQuery: defineQuery<UserState>('getState')
export const suspendSignal = defineSignal('suspend');
export const deleteSignal = defineSignal('delete');
export const updateProfileUpdate = defineUpdate<void, [Record<string, string>]>('updateProfile');
export const getStateQuery = defineQuery<UserState>('getState');

const CONTINUE_AS_NEW_THRESHOLD = 100;

export async function userAccountWorkflow(userId: string): Promise<void> {
  const state: UserState = {
    userId,
    status: 'ACTIVE',
    profile: {},
    operationCount: 0,
  };

  // TODO: Set up signal handlers for suspendSignal and deleteSignal
  // - suspendSignal: set state.status = 'SUSPENDED', increment operationCount
  // - deleteSignal: set state.status = 'DELETED', increment operationCount

  // TODO: Set up update handler for updateProfileUpdate
  // - Validate not deleted
  // - Call persistProfile activity
  // - Update state.profile
  // - Increment operationCount
  // - If operationCount >= CONTINUE_AS_NEW_THRESHOLD, call continueAsNew

  // TODO: Set up query handler for getStateQuery returning state

  // Wait until deleted
  await condition(() => state.status === 'DELETED');
  await sendNotification(userId, 'Account deleted');
}
