import AuthenticationProvider from "../../../services/auth/authenticationProvider";
import UserDetailsService from "../../../services/auth/userDetailService";

describe('authenticationProvider', () => {
  let userDetailsService: UserDetailsService;
  let authenticationProvider: AuthenticationProvider;
  const mockUnValidatedToken = { username: 'username', pwd: 'pwd' };

  beforeEach(() => {
    userDetailsService = new UserDetailsService();
    authenticationProvider = new AuthenticationProvider(userDetailsService);
  })

  it('should return validated token', async () => {
    const mockUserDetails = { username: 'username', pwd: "pwd", isAccountLocked: false, roles: ['admin'] }
    jest.spyOn(userDetailsService, 'loadUserByUsername').mockResolvedValue(mockUserDetails);

    const authResult = await authenticationProvider.authenticate(mockUnValidatedToken);
    expect(authResult.details.roles[0]).toBe('admin');
  });

  it('should throw user not found error', async () => {
    jest.spyOn(userDetailsService, 'loadUserByUsername').mockResolvedValue(null);

    expect(async () => { await authenticationProvider.authenticate(mockUnValidatedToken) }).rejects.toThrow('User not found');
  });

  it('should throw user is locked error', async () => {
    const mockUserDetails = { username: 'username', pwd: "pwd", isAccountLocked: true, roles: ['admin'] };
    jest.spyOn(userDetailsService, 'loadUserByUsername').mockResolvedValue(mockUserDetails);

    expect(async () => { await authenticationProvider.authenticate(mockUnValidatedToken) }).rejects.toThrow('User is locked');
  });

  it('should throw user bad credentials error', async () => {
    const mockUserDetails = { username: 'username', pwd: "pw", isAccountLocked: false, roles: ['admin'] };
    jest.spyOn(userDetailsService, 'loadUserByUsername').mockResolvedValue(mockUserDetails);

    expect(async () => { await authenticationProvider.authenticate(mockUnValidatedToken) }).rejects.toThrow('Bad credentials');
  });

});