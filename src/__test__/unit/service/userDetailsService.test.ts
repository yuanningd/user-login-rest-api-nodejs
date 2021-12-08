import UserDetailsService from "../../../services/auth/userDetailService";
import User from '../../../models/user';

const mockUser = { username: 'username' }

describe('userDetailsService', () => {
  it('should return userDetails', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(mockUser as any);
    const userDetailsService = new UserDetailsService();
    const user = await userDetailsService.loadUserByUsername('username');
    expect(user?.username).toBe(mockUser.username);
  });

  it('should return null', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(undefined as any);
    const userDetailsService = new UserDetailsService();
    const user = await userDetailsService.loadUserByUsername('username');
    expect(user).toBe(null);
  });
});