import { mailpitTransport } from '~/lib/mail/transport';

type Messages = {
  ID: string;
  MessageID: string;
  Read: boolean;
  From: [];
  To: [];
  Cc: string;
  Bcc: string;
  ReplyTo: [];
  Subject: string;
  Created: string;
  Username: '';
  Tags: [];
  Size: number;
  Attachments: number;
  Snippet: string;
};

describe('Email Integration Test with Mailpit', () => {
  const testEmail = 'tester@app.com';
  const testSubject = 'Jest Mailpit Test';

  it('should send email and be received by Mailpit', async () => {
    // 1. Kirim email via Nodemailer
    const send = await mailpitTransport.sendMail({
      from: 'admin@app.com',
      to: testEmail,
      subject: testSubject,
      html: '<p>Hello from Jest!</p>',
    });

    expect(send.response).toContain('250 2.0.0 Ok');

    // 2. Verifikasi ke API Mailpit
    // Gunakan fetch bawaan Node 18+ atau axios
    const response = await fetch('http://localhost:8025/api/v1/messages');
    const data = await response.json();

    console.log(data);

    const latestEmail = data.messages.find((m: Messages) => m.Subject === testSubject);

    expect(latestEmail).toBeDefined();
    expect(latestEmail.To[0].Address).toBe(testEmail);
  });
});
