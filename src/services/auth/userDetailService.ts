import IUserDetailsService from '../../common/interface/IUserDetailsService';
import User from '../../models/user'

class UserDetailsService implements IUserDetailsService{

  async loadUserByUsername(username: string) {
    const user = await User.findOne({ name: username }).exec();
    if (user) {
      const { pwd, locked } = user;
      return {username, pwd, isAccountLocked: locked}
    }
    return null;
  }

}

export default UserDetailsService;