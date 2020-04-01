import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  // ############## Index ##############
  async index(req, res) {
    const { q: recipientName, page = 1 } = req.query;

    if (recipientName) {
      const name = await Recipient.findAll({
        limit: 10,
        offset: (page - 1) * 10,
        order: [['id', 'DESC']],
        where: {
          name: {
            [Op.iLike]: `%${recipientName}%`,
          },
        },
      });

      return res.json(name);
    }

    const recipient = await Recipient.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      order: [['id', 'DESC']],
    });

    return res.json(recipient);
  }

  // ############## Store ##############
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      city: Yup.string().required(),
      postcode: Yup.string().required(),
      country: Yup.string().required(),
      complement: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails.' });
    }

    const {
      id,
      name,
      street,
      number,
      city,
      postcode,
      country,
      complement,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      city,
      postcode,
      country,
      complement,
    });
  }

  // ############## Update ##############
  async update(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists.' });
    }
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      city: Yup.string().required(),
      postcode: Yup.string().required(),
      country: Yup.string().required(),
      complement: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation fails.' });
    }

    const {
      name,
      street,
      number,
      city,
      postcode,
      country,
      complement,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      city,
      postcode,
      country,
      complement,
    });
  }

  // ############## Destroy ##############
  async destroy(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists.' });
    }

    recipient.destroy();

    return res.json(recipient);
  }
}

export default new RecipientController();
