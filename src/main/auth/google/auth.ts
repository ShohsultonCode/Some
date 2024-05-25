import { UnauthorizedException } from '@nestjs/common';
import { oauth2Client, oauth2ClientId } from './config';

export const verifyGoogleUser = async (token: any) => {
  try {
    // Validate token format
    console.log(token);
    
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new UnauthorizedException('Invalid token format');
    }

    console.log('Received token:', token); // Log the token before verification
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: oauth2ClientId,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const { email, name } = payload;
    return { email, name };
  } catch (error) {
    console.log(error);
    
    throw new UnauthorizedException('Invalid token');
  }
};
