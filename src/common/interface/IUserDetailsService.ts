import IUserDetails from "./IUserDetails";

export default interface IUserDetailsService {
  loadUserByUsername: (username: string) => Promise<IUserDetails | null>
}