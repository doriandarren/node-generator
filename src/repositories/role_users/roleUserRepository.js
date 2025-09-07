import { BaseRepository } from '../../helpers/repositories/baseRepository.js';
import RoleUser from '../../models/RoleUser.js';
import { Op } from 'sequelize'; // Para queries avanzadas si las necesitas


//const WITH = ['roles', 'status'];


export class RoleUserRepository extends BaseRepository {
  
  // 📌 List
  async list() {
    return await RoleUser.findAll({
      order: [this.LATEST],
      //include: WITH // relations
    });
  }

  // 📌 Show
  async show(id) {
    return await RoleUser.findByPk(id, {
      //include: WITH
    });
  }

  // 📌 Find
  async findByEmail(email) {
    return await RoleUser.findOne({
      where: { email },
      //include: WITH
    });
  }

  // 📌 Store
  async store(data) {
    return await RoleUser.create(data);
  }

  // 📌 Update
  async update(id, data) {
    const record = await RoleUser.findByPk(id);
    if (!record) return null;
    return await record.update(data);
  }

  // 📌 Destroy (soft-delete)
  async destroy(id) {
    const data = await RoleUser.findByPk(id);
    if (!data) return null;
    return await data.destroy();
  }

  // 📌 Restaurar usuario soft-deleted
  async restore(id) {
    const data = await RoleUser.findByPk(id, { paranoid: false });
    if (!data) return null;
    return await data.restore();
  }

  // 📌 Buscar por nombre o correo
  async search(term) {
    return await RoleUser.findAll({
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
