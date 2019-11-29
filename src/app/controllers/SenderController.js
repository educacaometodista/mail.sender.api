import * as Yup from 'yup';
import Sender from '../models/Sender';

class SenderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Falha na validação' });
    }

    const { name, email } = req.body;

    const senderExists = await Sender.findOne({
      where: { email },
    });

    if (senderExists) {
      return res.status(401).json({ error: 'Este remetente já existe.' });
    }

    await Sender.create({
      name,
      email,
    });

    return res.json({
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    const sender = await Sender.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'name', 'email'],
    });

    await sender.update(req.body);

    return res.json(sender);
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new SenderController();
