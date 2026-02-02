import nodemailer from 'nodemailer';

import { env } from '~/common/const/credential';

export const transport = nodemailer.createTransport({
  host: env.GOOGLE_EMAIL_HOST,
  port: Number.parseInt(env.GOOGLE_EMAIL_PORT, 10),
  secure: Boolean(env.GOOGLE_EMAIL_SECURE),
  auth: {
    user: env.GOOGLE_EMAIL,
    pass: env.GOOGLE_APP_PASSWORD,
  },
});

export const mailpitTransport = nodemailer.createTransport({
  host: env.MAILPIT_SERVER_HOST,
  port: Number.parseInt(env.MAILPIT_SMTP_PORT, 10),
  secure: false,
  ignoreTLS: true,
  auth: {
    user: env.MAILPIT_SERVER_USER,
    pass: env.MAILPIT_SERVER_PASSWORD,
  },
});
