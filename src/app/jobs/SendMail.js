import Mail from '../../lib/Mail';

class SendMail {
  get key() {
    return 'SendMail';
  }

  async handle({ data }) {
    const { sender, recipients, subject, body } = data;

    await Mail.sendMail({
      // to: `${sender.name} <${sender.email}>`,
      to: recipients,
      from: `${sender.name} <${sender.email}>`,
      // bcc: recipients,
      subject,
      template: 'template',
      html: body,
    });
  }
}

export default new SendMail();
