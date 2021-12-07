import  IAuthenticationToken  from "../../common/interface/IAuthenticationToken";
import IUserDetails from "../../common/interface/IUserDetails";
import UserDetailsService from "./userDetailService";

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
      throw new Error('User not found')
    }
    return userDetails;
  }

  preAuthenticationChecks = (userDetails: IUserDetails) => {
    if (userDetails.isAccountLocked) {
      throw new Error('User is locked')
    }
  }

  passwordAuthenticationChecks = (userDetails: IUserDetails, password: string) => {
    if (password !== userDetails.pwd) {
      throw new Error('Bad credentials')
    }
  }
}

export default AuthenticationProvider;