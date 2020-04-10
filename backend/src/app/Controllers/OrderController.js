// import * as Yup from 'yup';
import { Op } from 'sequelize';

import Orders from '../models/Orders';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

// import Queue from '../../lib/Queue';
// import newOrder from '../jobs/newOrder';

class OrderController {
  async index(req, res) {
    const { q: productName, page = 1 } = req.query;

    if (productName) {
      const product = await Orders.findAll({
        where: {
          product: {
            [Op.iLike]: `%${productName}%`,
          },
        },
        limit: 10,
        offset: (page - 1) * 10,
        order: [['id'], 'DESC'],
        attributes: [
          'id',
          'product',
          'canceled_at',
          'start_date',
          'end_date',
          'signature_id',
        ],
        include: [
          {
            model: File,
            as: 'signature',
            attributes: ['url', 'name'],
          },
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['id', 'name'],
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['url', 'path'],
              },
            ],
          },
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'id',
              'name',
              'street',
              'city',
              'country',
              'number',
              'postcode',
            ],
          },
        ],
      });
      return res.status(200).json(product);
    }

    const orders = await Orders.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      order: [['id'], 'DESC'],
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'signature_id',
      ],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'name'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['url', 'path'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'city',
            'country',
            'number',
            'postcode',
          ],
        },
      ],
    });
    return res.status(200).json(orders);
  }
}

export default OrderController;
