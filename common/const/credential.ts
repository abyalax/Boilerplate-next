import z from 'zod';

const envSchema = z.object({
  BASE_URL: z.string().min(1, 'BASE_URL is required'),

  NEXT_PUBLIC_BASE_URL_API: z.string().min(1, 'NEXT_PUBLIC_BASE_URL_API is required'),

  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  NEXT_SECRET: z.string().min(1, 'NEXT_SECRET is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),

  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required for OAuth with Google'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required for OAuth with Google'),
  GOOGLE_APP_PASSWORD: z.string().min(1, 'GOOGLE_APP_PASSWORD is required for forgot password mechanism'),

  GOOGLE_EMAIL: z.string().min(1, 'GOOGLE_EMAIL is required for forgot password mechanism'),
  GOOGLE_EMAIL_HOST: z.string().min(1, 'GOOGLE_EMAIL_HOST is required for forgot password mechanism'),
  GOOGLE_EMAIL_SECURE: z.string().min(1, 'GOOGLE_EMAIL_SECURE is required for forgot password mechanism'),
  GOOGLE_EMAIL_PORT: z.string().min(1, 'GOOGLE_EMAIL_PORT is required for forgot password mechanism'),

  /**Mailpit Services */
  MAILPIT_SERVER_HOST: z.string().min(1, 'MAILPIT_SERVER_HOST is required for email services'),
  MAILPIT_UI_PORT: z.string().min(1, 'MAILPIT_SUI_PORT is required for email services'),
  MAILPIT_SMTP_PORT: z.string().min(1, 'MAILPIT_SMTP_PORT is required for email services'),
  MAILPIT_SMTP_AUTH_ACCEPT_ANY: z.string().min(1, 'MAILPIT_SMTP_AUTH_ACCEPT_ANY is required for email services'),
  MAILPIT_MAX_MESSAGES: z.string().min(1, 'MAILPIT_MAX_MESSAGES is required for email services'),
  MAILPIT_SECURE: z.string().min(1, 'MAILPIT_SECURE is required for email services'),

  MAILPIT_SERVER_USER: z.string().min(1, 'MAILPIT_SERVER_USER is required for email services'),
  MAILPIT_SERVER_PASSWORD: z.string().min(1, 'MAILPIT_SERVER_PASSWORD is required for email services'),
  MAILPIT_FROM: z.string().min(1, 'EMAIL_FROM is required for email services'),

  /**Email JS Services */
  /**
   EMAIL_USER_ID: z.string().min(1, 'EMAIL_USER_ID is required, go to set up at email JS'),
   EMAIL_SERVICE_ID: z.string().min(1, 'EMAIL_SERVICE_ID is required, go to set up at email JS'),
   EMAIL_TEMPLATE_ID: z.string().min(1, 'EMAIL_TEMPLATE_ID is required, go to set up at email JS'),
   EMAIL_APPS: z.string().min(1, 'EMAIL_APPS is required for email JS'),
   */
});

export const env = envSchema.parse(process.env);
