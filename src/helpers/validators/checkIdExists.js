// src/helpers/validators/checkIdExists.js
export const checkIdExists = (Model) => {
  return async (id) => {
    const record = await Model.findByPk(id);
    if (!record) {
      throw new Error(`${Model.name} with ID ${id} not found`);
    }
  };
};
