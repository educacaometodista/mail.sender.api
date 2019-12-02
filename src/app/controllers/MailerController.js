import * as Yup from 'yup';
import Mailer from '../models/Mailer';
import Sender from '../models/Sender';

import SendMail from '../jobs/SendMail';
import Queue from '../../lib/Queue';

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

    const { id, sender_id, subject, recipients } = req.body;

    const {
      firstContent,
      secondContent,
      thirdContent,
      fourthContent,
      fifthContent,
      sixthContent,
    } = req.body;

    const body = `${firstContent || ''} ${secondContent || ''} ${thirdContent ||
      ''} ${fourthContent || ''} ${fifthContent || ''} ${sixthContent || ''}`;

    // const recipients = req.body.recipients.split(/, ;/g).map(r => `<${r}>,`);

    const sender = await Sender.findByPk(sender_id);

    if (!sender) {
      return res.status(400).json({ error: 'Remetente não encontrado' });
    }

    const { title, subtitle, color, ctaText, ctaUrl } = req.body;

    await Queue.add(SendMail.key, {
      sender,
      recipients,
      subject,
      title,
      subtitle,
      color,
      ctaText,
      ctaUrl,
      firstContent,
      secondContent,
      thirdContent,
      fourthContent,
      fifthContent,
      sixthContent,
    });

    await Mailer.create({
      id,
      sender_id,
      subject,
      body,
      author_id,
      recipients,
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
