import nodemailer from 'nodemailer';

interface IMail {
  to: string;
  body: string;
}

export default class EtherealMail {
  static async sendMail({ to, body }: IMail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const transport = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transport.sendMail({
      from: 'equipe@apivendas.com.br',
      to,
      subject: 'Recuperação de senha',
      html: body
    });
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}