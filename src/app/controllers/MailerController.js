import * as Yup from 'yup';
import Mailer from '../models/Mailer';
import Sender from '../models/Sender';

import Mail from '../../lib/Mail';

class MailerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      sender_id: Yup.number().required(),
      subject: Yup.string()
        .required()
        .min(16),
      body: Yup.string().max(9999),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Erro na validação.' });
    }

    const author_id = req.userId;

    const { id, sender_id, subject, body } = req.body;

    const recipients = req.body.recipients.split(/, ;/g).map(r => `${r},`);

    const sender = await Sender.findByPk(sender_id);

    if (!sender) {
      return res.status(400).json({ error: 'Remetente não encontrado' });
    }

    const { title, subtitle, color, ctaText, ctaUrl } = req.body;

    await Mail.sendMail({
      to: `${sender.name} <${sender.email}>`,
      from: `${sender.name} <${sender.email}>`,
      bcc: recipients,
      subject,
      template:
        'http://portal.metodista.br/msg/institucional/comunicados-2019/novo/template',
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

    await Mailer.create({
      id,
      sender_id,
      subject,
      body,
      author_id,
      recipients: 'teste',
    });

    return res.json({
      id,
      sender_id,
      subject,
      body,
      author_id,
    });
  }
}

export default new MailerController();
