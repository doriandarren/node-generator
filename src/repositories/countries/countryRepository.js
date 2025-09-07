import { BaseRepository } from '../../helpers/repositories/baseRepository.js';
import Country from '../../models/Country.js';
import { Op } from 'sequelize'; // Para queries avanzadas si las necesitas


//const WITH = ['roles', 'status'];


export class CountryRepository extends BaseRepository {
  
  // 📌 List
  async list() {
    return await Country.findAll({
      order: [this.LATEST],
      //include: WITH // relations
    });
  }

  // 📌 Show
  async show(id) {
    return await Country.findByPk(id, {
      //include: WITH
    });
  }

  // 📌 Find
  async findByEmail(email) {
    return await Country.findOne({
      where: { email },
      //include: WITH
    });
  }

  // 📌 Store
  async store(data) {
    return await Country.create(data);
  }

  // 📌 Update
  async update(id, data) {
    const record = await Country.findByPk(id);
    if (!record) return null;
    return await record.update(data);
  }

  // 📌 Destroy (soft-delete)
  async destroy(id) {
    const data = await Country.findByPk(id);
    if (!data) return null;
    return await data.destroy();
  }

  // 📌 Restaurar usuario soft-deleted
  async restore(id) {
    const data = await Country.findByPk(id, { paranoid: false });
    if (!data) return null;
    return await data.restore();
  }

  // 📌 Buscar por nombre o correo
  async search(term) {
    return await Country.findAll({
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
