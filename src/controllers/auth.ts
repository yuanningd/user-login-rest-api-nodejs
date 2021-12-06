import { NextFunction, Request, Response } from 'express';
import { createJwtToken } from '../services/auth/jwt';
import IAuthenticationProvider from '../common/interface/IAuthenticationProvider';
import IAuthenticationToken from '../common/interface/IAuthenticationToken';
import { ILoginPostDto } from '../dtos/loginPostDto';



export const usernamePasswordLogin =(authProvider: IAuthenticationProvider) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authenticationResult = await attemptAuthentication(req, res, next, authProvider);
    successfulAuthentication(req, res, next, authenticationResult);
  } catch (error) {
    unsuccessfulAuthentication(req, res, error as Error)
  }
};

const attemptAuthentication = async (req: Request, res: Response, next: NextFunction, authProvider: IAuthenticationProvider) => {
  const { username, pwd }: ILoginPostDto = req.body;
  const unValidatedToken: IAuthenticationToken = { username, pwd };
  return await authProvider.authenticate(unValidatedToken);
}

const successfulAuthentication = (req: Request, res: Response, next: NextFunction, validatedToken: IAuthenticationToken) => {
  const { username } = validatedToken;
  const jwtToken = createJwtToken(username);
  res.status(200).send({ jwtToken });
}

const unsuccessfulAuthentication = (req: Request, res: Response, failed: Error) => {
  res.status(401).send(failed.message);
}