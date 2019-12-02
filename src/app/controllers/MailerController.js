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
      body: Yup.string()
        .required()
        .max(9999),
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

    await Mail.sendMail({
      to: `${sender.name} <${sender.email}>`,
      from: `${sender.name} <${sender.email}>`,
      bcc: recipients,
      subject,
      template: sender.initials,
      context: {
        title: 'Título',
        subtitle: 'Subtítulo',
        ctaText: 'TEXTO',
        ctaUrl: 'LINK',
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
