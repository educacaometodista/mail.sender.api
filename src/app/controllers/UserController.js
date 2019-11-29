import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'avatar_url'],
    });

    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Falha na validação dos campos.' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res
        .status(401)
        .json({ error: 'Um usuário com este e-mail já existe.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_url: Yup.string(),
      oldPassword: Yup.string().min(5),
      password: Yup.string()
        .min(5)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(401).json({ error: 'Usuário já existente.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha atual inválida.' });
    }

    const { id, name, avatar_url } = await user.update(req.body);

    return res.json({
      id,
      name,
      avatar_url,
    });
  }

  async delete(req, res) {
    const user = await User.findOne({
      where: { id: req.params.id },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: 'Usuário já excluído ou inexistente.' });
    }

    await user.destroy();

    const allUsers = await User.findAll({
      attributes: ['id', 'name', 'email', 'avatar_url'],
    });

    return res.json(allUsers);
  }
}

export default new UserController();
