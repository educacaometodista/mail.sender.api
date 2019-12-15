import File from '../models/File';

class ConvertFileController {
  async index(req, res) {
    return res.json({ ok: true });
  }
}

export default new ConvertFileController();
