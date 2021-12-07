import  IAuthenticationToken  from "../../common/interface/IAuthenticationToken";
import IUserDetailsService from "../../common/interface/IUserDetailsService";
import IUserDetails from "../../common/interface/IUserDetails";
import IAuthenticationProvider from "../../common/interface/IAuthenticationProvider";

class AuthenticationProvider implements IAuthenticationProvider{
  userDetailsService: IUserDetailsService

  constructor(userDetailService: IUserDetailsService) {
    this.userDetailsService = userDetailService;
  }

  async authenticate(unValidatedToken: IAuthenticationToken) {
    const { username, pwd } = unValidatedToken;

    const userDetails = await this.retrieveUser(username);
    this.preAuthenticationChecks(userDetails);
    this.passwordAuthenticationChecks(userDetails, pwd);
    
    const validatedToken :IAuthenticationToken = {username, pwd, details: userDetails}
    return validatedToken;
  }

  async retrieveUser(username: string) {
    const userDetails = await this.userDetailsService.loadUserByUsername(username);
    if (!userDetails) {
      throw new Error('User not fount')
    }
    return userDetails;
  }

  preAuthenticationChecks(userDetails: IUserDetails) {
    if (userDetails.isAccountLocked) {
      throw new Error('User is locked')
    }
  }

  passwordAuthenticationChecks(userDetails: IUserDetails, password: string) {
    if (password !== userDetails.pwd) {
      throw new Error('Bad credentials')
    }
  }
}

export default AuthenticationProvider;