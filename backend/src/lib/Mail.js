import nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';

import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { port, host, auth, secure } = mailConfig;

    this.transporter = nodemailer.createTransport({
      port,
      host,
      secure,
      auth: auth.user ? auth : null,
    });
    this.configureTemplates();
  }

  sendMail(message) {
    this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'email');
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extname: '.hbs',
      })
    );
  }
}

export default new Mail();
