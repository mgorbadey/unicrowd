const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendNotificationMail(to, clientName, serviceItem, dateTime) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Уведомление о новой записи на UniCrowd',
      text: '',
      html:
        `
            <div>
              <h1>У вас новая запись:</h1>
              <ul>
              <li>Клиент: ${clientName}</li>
              <li>Процедура: ${serviceItem}</li>
              <li>Дата и время: ${dateTime}</li>
              </ul>
            </div>
          `,
    });
  }

  async sendAcceptEventMail(to, masterName, serviceItem, dateTime) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Подтверждение вашей записи на UniCrowd',
      text: '',
      html:
        `
            <div>
              <h1>Ваша запись подтверждена:</h1>
              <ul>
              <li>Мастер: ${masterName}</li>
              <li>Процедура: ${serviceItem}</li>
              <li>Дата и время: ${dateTime}</li>
              </ul>
            </div>
          `,
    });
  }

  async sendCancelEventMail(to, masterName, serviceItem, dateTime, masterId) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Отмена вашей записи на UniCrowd',
      text: '',
      html:
        `
            <div>
              <h1>К сожалению, ваша запись была отменена мастером:</h1>
              <ul>
              <li>Мастер: ${masterName}</li>
              <li>Процедура: ${serviceItem}</li>
              <li>Дата и время: ${dateTime}</li>
              </ul>
              <h1>Попробуйте подобрать новое подходящее время:</h1>
              <h3>Расписание мастера ${masterName}</h3>
              <a href=http://localhost:3000/masters/${masterId}/schedules>http://localhost:3000/masters/${masterId}/schedules</a>
            </div>
          `,
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация вашего аккаунта на UniCrowd',
      text: '',
      html:
        `
            <div>
              <hi>Для активации вашего аккаунта пройдите по ссылке</hi>
              <a href=${link}>${link}</a>
            </div>
          `,
    });
  }

}

module.exports = new MailService();