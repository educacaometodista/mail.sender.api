import Mail from '../../lib/Mail';

class SendMail {
  get key() {
    return 'SendMail';
  }

  async handle({ data }) {
    const {
      sender,
      recipients,
      subject,
      title,
      subtitle,
      color,
      ctaText,
      ctaUrl,
      body,
    } = data;

    await Mail.sendMail({
      // to: `${sender.name} <${sender.email}>`,
      to: recipients,
      from: `${sender.name} <${sender.email}>`,
      // bcc: recipients,
      subject,
      template: 'template',
      context: {
        title,
        subtitle,
        topImage: sender.top,
        mainContent: body,
        color,
        ctaText,
        ctaUrl,
      },
    });
  }
}

export default new SendMail();
