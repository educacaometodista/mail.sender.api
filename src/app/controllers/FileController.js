import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const { declaration } = req.body;

    const file = await File.create({
      name,
      path,
      declaration,
    });

    return res.json(file);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const files = await File.findAll({
      attributes: ['id', 'url', 'name', 'declaration', 'path', 'createdAt'],
      order: [['createdAt', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(files);
  }
}

export default new FileController();
