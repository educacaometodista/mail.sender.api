import * as Yup from 'yup';
import request from 'request';
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
      htmlbody: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Erro na validação.' });
    }

    const author_id = req.userId;

    const { id, sender_id, subject, recipients, htmlbody } = req.body;

    const sender = await Sender.findByPk(sender_id);

    if (!sender) {
      return res.status(400).json({ error: 'Remetente não encontrado' });
    }

    await request(
      {
        uri: htmlbody,
      },
      (error, response, body) => {
        Queue.add(SendMail.key, {
          sender,
          recipients,
          subject,
          htmlbody: body,
        });
      }
    );

    await Mailer.create({
      id,
      sender_id,
      subject,
      author_id,
      recipients,
      htmlbody,
    });

    return res.json({
      id,
      sender_id,
      subject,
      author_id,
      recipients,
      htmlbody,
    });
  }
}

export default new MailerController();
