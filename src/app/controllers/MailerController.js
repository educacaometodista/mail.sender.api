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

    const { id, sender_id, subject, recipients, bodyurl, author_id } = req.body;

    const sender = await Sender.findByPk(sender_id);

    if (!sender) {
      return res.status(400).json({ error: 'Remetente não encontrado' });
    }

    const arr = recipients.split(',');

    function chunkArray(myArray, chunkSize) {
      let index = 0;
      const arrayLength = myArray.length;
      const tempArray = [];

      for (index = 0; index < arrayLength; index += chunkSize) {
        const myChunk = myArray.slice(index, index + chunkSize);
        tempArray.push(myChunk);
      }

      return tempArray;
    }
    const result = chunkArray(arr, 499);

    result.map(async r => {
      await request(
        {
          uri: bodyurl,
        },
        (error, response, body) => {
          Queue.add(SendMail.key, {
            sender,
            recipients: r,
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
      limit: 10,
      offset: (page - 1) * 10,
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
