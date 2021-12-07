import jwt from 'jsonwebtoken'

const secreteKey = process.env.JWT_KEY as string;

export const generateJwtToken = (username: string) => {
  const token = jwt.sign(
    { username },
    secreteKey,
    { expiresIn: '1d' }
  )
  return token;
}