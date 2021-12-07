export default interface IUserDetails {
  username: string,
  pwd: string,
  isAccountLocked: boolean,
  roles: string[]
  [propName: string]: any
}