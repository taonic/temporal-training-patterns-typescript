import { proxyActivities, defineSignal, defineQuery, defineUpdate, setHandler, condition, continueAsNew } from '@temporalio/workflow';
import type * as activities from './activities';

export interface UserState {
  userId: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'DELETED';
  profile: Record<string, string>;
  operationCount: number;
}

const { sendNotification, persistProfile } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds',
});

export const suspendSignal = defineSignal('suspend');
export const deleteSignal = defineSignal('delete');
export const updateProfileUpdate = defineUpdate<void, [Record<string, string>]>('updateProfile');
export const getStateQuery = defineQuery<UserState>('getState');

const CONTINUE_AS_NEW_THRESHOLD = 100;

export async function userAccountWorkflow(userId: string): Promise<void> {
  const state: UserState = { userId, status: 'ACTIVE', profile: {}, operationCount: 0 };

  setHandler(suspendSignal, () => {
    state.status = 'SUSPENDED';
    state.operationCount++;
  });

  setHandler(deleteSignal, () => {
    state.status = 'DELETED';
    state.operationCount++;
  });

  setHandler(updateProfileUpdate, async (newProfile: Record<string, string>) => {
    if (state.status === 'DELETED') throw new Error('Account is deleted');
    await persistProfile(userId, newProfile);
    state.profile = { ...state.profile, ...newProfile };
    state.operationCount++;
    if (state.operationCount >= CONTINUE_AS_NEW_THRESHOLD) {
      await continueAsNew<typeof userAccountWorkflow>(userId);
    }
  });

  setHandler(getStateQuery, () => state);

  await condition(() => state.status === 'DELETED');
  await sendNotification(userId, 'Account deleted');
}
