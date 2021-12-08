import { Request, Response } from 'express';
import IAuthenticationToken from '../../../common/interface/IAuthenticationToken';
import { usernamePasswordLogin } from '../../../controllers/auth';
import AuthenticationProvider from '../../../services/auth/authenticationProvider';
import UserDetailsService from '../../../services/auth/userDetailService';
import * as recordService from '../../../services/wrongPasswordInputRecord';
import * as userService from '../../../services/user';

const mockUserDetails = {
  username: 'user',
  roles: ['admin']
};

const mockReq = {
  body: {
    username: 'username',
    pwd: "pwd"
  }
} as unknown as Request;

const send = jest.fn();
const mockRes = {
  status: jest.fn(() => ({ send }))
} as unknown as Response;

const mockNext = jest.fn();

describe('auth controller', () => {
  it('should send status 200', async () => {
    const userDetailsService = new UserDetailsService();
    const authenticationProvider = new AuthenticationProvider(userDetailsService);
    jest.spyOn(authenticationProvider, 'authenticate').mockResolvedValue({ details: mockUserDetails } as IAuthenticationToken);
    await usernamePasswordLogin(authenticationProvider)(mockReq, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(200);
  });

  it('should send status 401', async () => {
    const userDetailsService = new UserDetailsService();
    const authenticationProvider = new AuthenticationProvider(userDetailsService);
    jest.spyOn(authenticationProvider, 'authenticate').mockRejectedValue(new Error('User is not found'));
    await usernamePasswordLogin(authenticationProvider)(mockReq, mockRes, mockNext);
    expect(mockRes.status).toBeCalledWith(401);
    expect(send).toBeCalledWith('User is not found');
  });

  it('should add new record in wrongPasswordInputRecords collection and update user status', async () => {
    const userDetailsService = new UserDetailsService();
    const authenticationProvider = new AuthenticationProvider(userDetailsService);
    jest.spyOn(authenticationProvider, 'authenticate').mockRejectedValue(new Error('Bad credentials'));
    const mockAddWrongPasswordInputRecord = jest.spyOn(recordService, 'addWrongPasswordInputRecord').mockImplementation(jest.fn());
    const mockUpdateIsUserLockedStatus = jest.spyOn(userService, 'updateIsUserLockedStatus').mockImplementation(jest.fn());
    await usernamePasswordLogin(authenticationProvider)(mockReq, mockRes, mockNext);
    expect(mockAddWrongPasswordInputRecord).toBeCalled();
    expect(mockUpdateIsUserLockedStatus).toBeCalled();
  });
});

