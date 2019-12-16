import excelToJson from 'convert-excel-to-json';
import path from 'path';

class ConvertFileController {
  async store(req, res) {
    const { filename } = req.body;

    const excel = await excelToJson({
      sourceFile: path.join(
        __dirname,
        '..',
        '..',
        '..',
        'tmp',
        'uploads',
        filename
      ),
      columnToKey: { A: 'email' },
    });

    const key = excel[Object.keys(excel)[0]];

    const recipients = [...new Set(key.map(k => k.email))];

    recipients.shift();

    return res.json(recipients.join(', ').toLowerCase());
  }
}

export default new ConvertFileController();
