// import * as Yup from 'yup';
import { Op } from 'sequelize';
// import Orders from '../models/Orders';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async index(req, res) {
    const { q: description, page = 1 } = req.query;

    if (description) {
      const problems = await DeliveryProblem.findAll({
        where: {
          description: {
            [Op.iLike]: `%${description}%`,
          },
        },
        limit: 5,
        offset: (page - 1) * 5,
        order: [['id'], 'DESC'],
      });

      res.json(problems);
    }

    const problems = await DeliveryProblem.findAll({
      limit: 5,
      offset: (page - 1) * 5,
      order: [['id'], 'DESC'],
    });

    res.json(problems);
  }
}

export default new DeliveryProblemController();
