import excelToJson from 'convert-excel-to-json';

import path from 'path';

class ConvertFileController {
  async index(req, res) {
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
      sheets: [
        {
          name: 'Sheet1',
        },
      ],
      columnToKey: { A: 'email', B: 'nome' },
    });

    return res.json(excel);
  }
}

export default new ConvertFileController();
