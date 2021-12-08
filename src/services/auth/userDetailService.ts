import User from '../../models/user';

class UserDetailsService {

  loadUserByUsername = async (username: string) => {
    const user = await User.findOne({ name: username });
    if (user) {
      const { pwd, locked, roles } = user;
      return { username, pwd, roles, isAccountLocked: locked };
    }
    return null;
  };

}

export default UserDetailsService;