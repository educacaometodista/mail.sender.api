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
    } = data;

    await Mail.sendMail({
      to: `${sender.name} <${sender.email}>`,
      from: `${sender.name} <${sender.email}>`,
      bcc: recipients,
      subject,
      template: sender.initials,
      context: {
        title,
        subtitle,
        topImage: sender.top,
        mainContent: 'Teste',
        color,
        ctaText,
        ctaUrl,
      },
    });
  }
}

export default new SendMail();
