import { BaseRepository } from '../../helpers/repositories/baseRepository.js';
import User from '../../models/User.js';
import { Op } from 'sequelize'; // Para queries avanzadas si las necesitas


//const WITH = ['roles', 'status'];


export class UserRepository extends BaseRepository {
  
  // 📌 List
  async list() {
    return await User.findAll({
      order: [this.LATEST],
      //include: WITH // relations
    });
  }

  // 📌 Show
  async show(id) {
    return await User.findByPk(id, {
      //include: WITH
    });
  }

  // 📌 Find
  async findByEmail(email) {
    return await User.findOne({
      where: { email },
      //include: WITH
    });
  }

  // 📌 Store
  async store(data) {
    return await User.create(data);
  }

  // 📌 Update
  async update(id, data) {
    const record = await User.findByPk(id);
    if (!record) return null;
    return await record.update(data);
  }

  // 📌 Destroy (soft-delete)
  async destroy(id) {
    const data = await User.findByPk(id);
    if (!data) return null;
    return await data.destroy();
  }

  // 📌 Restaurar usuario soft-deleted
  async restore(id) {
    const data = await User.findByPk(id, { paranoid: false });
    if (!data) return null;
    return await data.restore();
  }

  // 📌 Buscar por nombre o correo
  async search(term) {
    return await User.findAll({
        include: WITH,
        where: {
            [Op.or]: [
              { name: { [Op.like]: `%${term}%` } },
              { email: { [Op.like]: `%${term}%` } }
            ]
        }
    });
  }
}
