import * as Yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { q: deliverymanName, page } = req.query;

    if (deliverymanName) {
      const name = await Deliveryman.findAll({
        limit: 10,
        offset: (page - 1) * 10,
        order: [['id'], 'DESC'],
        where: {
          name: {
            [Op.iLike]: `${deliverymanName}%`,
          },
        },
      });

      return res.json(name);
    }

    const deliveryman = await Deliveryman.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      order: [['id'], 'DESC'],
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['nanem', 'path', 'url', 'id'],
        },
      ],
    });

    return res.json(deliveryman);
  }

  async show(req, res) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email', 'created_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url', 'id'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Recipient does not exists.' });
    }

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id, name, avatar_id, email } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      avatar_id,
      email,
    });
  }
}

export default new DeliverymanController();
