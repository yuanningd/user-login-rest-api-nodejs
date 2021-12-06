import IAuthenticationToken from "./IAuthenticationToken";

export default interface IAuthenticationProvider {
  authenticate: (unValidatedToken: IAuthenticationToken) => Promise<IAuthenticationToken>;
}