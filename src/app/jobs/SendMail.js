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
      ctaText,
      ctaUrl,
      firstContent,
      secondContent,
      thirdContent,
      fourthContent,
      fifthContent,
      sixthContent,
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
        firstContent,
        secondContent,
        thirdContent,
        fourthContent,
        fifthContent,
        sixthContent,
        color: sender.color,
        ctaText,
        ctaUrl,
      },
    });
  }
}

export default new SendMail();
