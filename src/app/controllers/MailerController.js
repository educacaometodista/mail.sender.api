/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';
import request from 'request';
import schedule from 'node-schedule';
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
      recipients: Yup.string().required(),
      author_id: Yup.number().required(),
      date: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Erro na validação.' });
    }

    const {
      id,
      sender_id,
      subject,
      recipients,
      bodyurl,
      author_id,
      date,
    } = req.body;

    const dateIsValid = date !== undefined;

    if (!dateIsValid) {
      return res.status(401).json({ error: 'Data inválida.' });
    }

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
    const arrayMax = chunkArray(arr, 499);

    if (dateIsValid && new Date(date) > new Date()) {
      schedule.scheduleJob(date, () => {
        for (const index in arrayMax) {
          if (Object.prototype.hasOwnProperty.call(arrayMax, index)) {
            request(
              {
                uri: bodyurl,
              },
              (_error, _response, body) => {
                Queue.add(SendMail.key, {
                  sender,
                  recipients: arrayMax[index].join().replace(',', ', '),
                  subject,
                  bodyurl: body,
                });
              }
            );
          }
        }
      });
    } else {
      for (const index in arrayMax) {
        if (Object.prototype.hasOwnProperty.call(arrayMax, index)) {
          request(
            {
              uri: bodyurl,
            },
            (_error, _response, body) => {
              Queue.add(SendMail.key, {
                sender,
                recipients: arrayMax[index].join().replace(',', ', '),
                subject,
                bodyurl: body,
              });
            }
          );
        }
      }
    }

    await Mailer.create({
      id,
      sender_id,
      subject,
      author_id,
      recipients,
      bodyurl,
      createdAt: dateIsValid && date !== null ? date : new Date(),
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
