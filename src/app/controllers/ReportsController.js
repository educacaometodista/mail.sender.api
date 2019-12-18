import { getMonth } from 'date-fns';

import Mailer from '../models/Mailer';

class ReportsController {
  async index(req, res) {
    const { month } = req.params;

    const mails = await Mailer.findAll();

    const monthly = mails.filter(
      el => getMonth(el.createdAt) === Number(month)
    );

    return res.json(monthly);
  }

  async fifteenDays(req, res) {
    const actualMonth = new Date();

    return res.json(actualMonth);
  }
}

export default new ReportsController();
