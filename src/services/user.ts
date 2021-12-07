import User from '../models/user';
import { determineIfUserShouldBeLocked } from './wrongPasswordInputRecord';

export const updateIsUserLockedStatus = async (username: string, dateTime: Date) => {
  if (await determineIfUserShouldBeLocked(username, dateTime)) {
    const filter = { username };
    const update = { locked: true };
    await User.findOneAndUpdate(filter, update);
  }
}