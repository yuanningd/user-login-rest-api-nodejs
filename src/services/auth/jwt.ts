import jwt from 'jsonwebtoken'

const secreteKey = process.env.JWT_KEY || 'reallySecrete';

export const generateJwtToken = (username: string, roles: string[]) => {
  const token = jwt.sign(
    { username, roles },
    secreteKey,
    { expiresIn: '1d' }
  )
  return token;
};