import  IAuthenticationToken  from "../../common/interface/IAuthenticationToken";
import IUserDetails from "../../common/interface/IUserDetails";
import UserDetailsService from "./userDetailService";
import logger from "../../config/winston";

class AuthenticationProvider {
  userDetailsService: UserDetailsService

  constructor(userDetailService: UserDetailsService) {
    this.userDetailsService = userDetailService;
  }

  authenticate = async (unValidatedToken: IAuthenticationToken) => {
    const { username, pwd } = unValidatedToken;

    const userDetails = await this.retrieveUser(username);
    this.preAuthenticationChecks(userDetails);
    this.passwordAuthenticationChecks(userDetails, pwd);
    
    const validatedToken :IAuthenticationToken = {username, pwd, details: userDetails}
    return validatedToken;
  }

  retrieveUser = async (username: string) => {
    const userDetails = await this.userDetailsService.loadUserByUsername(username);
    if (!userDetails) {
      logger.debug(`Failed to authenticate since user ${username} is not found`);
      throw new Error('User not found')
    }
    return userDetails;
  }

  preAuthenticationChecks = (userDetails: IUserDetails) => {
    if (userDetails.isAccountLocked) {
      logger.debug('Failed to authenticate since user account is locked');
      throw new Error('User is locked')
    }
  }

  passwordAuthenticationChecks = (userDetails: IUserDetails, password: string) => {
    if (password !== userDetails.pwd) {
      logger.debug('Failed to authenticate since password does not match');
      throw new Error('Bad credentials')
    }
  }
}

export default AuthenticationProvider;