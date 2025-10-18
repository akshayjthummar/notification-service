import nodemailer, { Transporter } from 'nodemailer';
import { Message, NotificationTransport } from './types/notification-types';
import config from 'config';
import logger from './config/logger';

export class MailTransport implements NotificationTransport {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.get('mail.host'),
      port: config.get('mail.port'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.get('mail.auth.user'),
        pass: config.get('mail.auth.pass'),
      },
    });
  }
  async send(message: Message) {
    // email send
    const info = await this.transporter.sendMail({
      from: 'akshaythummar@gmail.com',
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });

    logger.info('Message sent:', info.messageId);
  }
}
