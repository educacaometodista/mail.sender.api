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
      subject: Yup.string().required(),
      bodyurl: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Erro na validação.' });
    }

    const author_id = req.userId;

    const { id, sender_id, subject, recipients, bodyurl } = req.body;

    const sender = await Sender.findByPk(sender_id);

    if (!sender) {
      return res.status(400).json({ error: 'Remetente não encontrado' });
    }

    await request(
      {
        uri: bodyurl,
      },
      (error, response, body) => {
        Queue.add(SendMail.key, {
          sender,
          recipients,
          subject,
          bodyurl: body,
        });
      }
    );

    await Mailer.create({
      id,
      sender_id,
      subject,
      author_id,
      recipients,
      bodyurl,
    });

    return res.json({
      id,
      sender_id,
      subject,
      author_id,
      recipients,
      bodyurl,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const mailers = await Mailer.findAll({
      order: [['createdAt', 'DESC']],
      limit: 6,
      offset: (page - 1) * 6,
      attributes: [
        'id',
        'sender_id',
        'recipients',
        'subject',
        'bodyurl',
        'author_id',
        'createdAt',
      ],
    });

    return res.json(mailers);
  }

  async delete(req, res) {
    const mailer = await Mailer.findByPk(req.params.id);

    if (!mailer) {
      return res.status(401).json({ error: 'E-mail não encontrado.' });
    }

    await mailer.destroy();

    const allMailers = await Mailer.findAll({
      attributes: [
        'id',
        'sender_id',
        'recipients',
        'subject',
        'bodyurl',
        'author_id',
      ],
    });

    return res.json(allMailers);
  }
}

export default new MailerController();
