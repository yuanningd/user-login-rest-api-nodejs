import { updateIsUserLockedStatus } from "../../../services/user";
import User from '../../../models/user';
import * as recordService from '../../../services/wrongPasswordInputRecord';

describe('user service', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should update user locked status', async () => {
    jest.spyOn(recordService, 'determineIfUserShouldBeLocked').mockResolvedValue(true);
    const mockFindOneAndUpdate = jest.spyOn(User, 'findOneAndUpdate').mockImplementation(jest.fn());
    await updateIsUserLockedStatus('username', new Date());
    expect(mockFindOneAndUpdate).toBeCalled();
  });

  it('should not update user locked status', async () => {
    jest.spyOn(recordService, 'determineIfUserShouldBeLocked').mockResolvedValue(false);
    const mockFindOneAndUpdate = jest.spyOn(User, 'findOneAndUpdate').mockImplementation(jest.fn());
    await updateIsUserLockedStatus('username', new Date());
    expect(mockFindOneAndUpdate).not.toBeCalled();
  });
});
