import User from '../../models/user';

class UserDetailsService {

  async loadUserByUsername(username: string) {
    const user = await User.findOne({ name: username }).exec();
    if (user) {
      const { pwd, locked, roles } = user;
      return {username, pwd, roles, isAccountLocked: locked}
    }
    return null;
  }

}

export default UserDetailsService;