import Mailer from '../models/Mailer';

class MailerController {
  async store(req, res) {
    const author_id = req.userId;

    const { id, sender_id, subject, body } = req.body;

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
