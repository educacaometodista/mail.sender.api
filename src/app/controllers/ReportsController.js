import { subDays, getMonth } from 'date-fns';

import { Op } from 'sequelize';

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

  async defineDaysAgo(req, res) {
    const { time } = req.params;
    const { page = 1 } = req.query;

    const daysAgo = subDays(new Date(), time);

    const mails = await Mailer.findAll({
      where: {
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gt]: daysAgo,
        },
      },
      order: [['createdAt', 'DESC']],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(mails);
  }

  async totalIndex(req, res) {
    const mails = await Mailer.findAll();

    return res.json(mails);
  }
}

export default new ReportsController();
