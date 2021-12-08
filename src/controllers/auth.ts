import { NextFunction, Request, Response } from 'express';
import { generateJwtToken } from '../services/auth/jwt';
import AuthenticationProvider from '../services/auth/authenticationProvider';
import IAuthenticationToken from '../common/interface/IAuthenticationToken';
import { ILoginPostDto } from '../dtos/loginPostDto';
import { addWrongPasswordInputRecord } from '../services/wrongPasswordInputRecord';
import { updateIsUserLockedStatus } from '../services/user';
import IUserDetails from '../common/interface/IUserDetails';

export const usernamePasswordLogin =(authProvider: AuthenticationProvider) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authenticationResult = await attemptAuthentication(req, res, next, authProvider);
    successfulAuthentication(req, res, next, authenticationResult);
  } catch (error) {
    unsuccessfulAuthentication(req, res, error as Error)
  }
};

const attemptAuthentication = async (req: Request, res: Response, next: NextFunction, authProvider: AuthenticationProvider) => {
  const { username, pwd } = req.body as ILoginPostDto;
  const unValidatedToken: IAuthenticationToken = { username, pwd };
  return await authProvider.authenticate(unValidatedToken);
};

const successfulAuthentication = (req: Request, res: Response, next: NextFunction, validatedToken: IAuthenticationToken) => {
  const { details: userDetails } = validatedToken;
  const { username, roles } = userDetails as IUserDetails;
  const jwtToken = generateJwtToken(username, roles);
  res.status(200).send({ jwtToken });
};

const unsuccessfulAuthentication = async (req: Request, res: Response, failed: Error) => {
  if (failed.message === 'Bad credentials') {
    const currentTime = new Date();
    const { username } = req.body;
    await addWrongPasswordInputRecord(username, currentTime);
    await updateIsUserLockedStatus(username, currentTime);
  }
  res.status(401).send(failed.message);
};