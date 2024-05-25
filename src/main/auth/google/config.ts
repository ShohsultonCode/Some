import { OAuth2Client } from 'google-auth-library';

import { config } from 'dotenv';
config();

export const oauth2ClientId = process.env.GOOGLE_CLIENT_ID;
export const oauth2Client = new OAuth2Client(oauth2ClientId);
