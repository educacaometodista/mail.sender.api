import * as Yup from 'yup';
import Mailer from '../models/Mailer';
import Sender from '../models/Sender';

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

    const senderExists = await Sender.findByPk(sender_id);

    if (!senderExists) {
      return res.status(400).json({ error: 'Remetente não encontrado' });
    }

    await Mailer.create({
      id,
      sender_id,
      subject,
      body,
      author_id,
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
