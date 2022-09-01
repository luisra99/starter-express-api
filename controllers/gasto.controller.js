import { Gasto } from "../models/Gasto.js";
import { sequelize } from "../config/database.js";
export const getGastos = async (req, res) => {
  try {
    const gasto = await Gasto.findAll();
    res.json(gasto);
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};
export const getGasto = async (req, res) => {
  try {
    const { id } = req.params;
    const gasto = await Gasto.findByPk(id);
    if (!gasto)
      return res.status(404).json({ message: "No existe el  de gasto" });
    res.json(gasto);
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};
async function exist(id_tipogasto, monto, fecha) {
  const query =
    "SELECT * FROM gastos WHERE id_tipogasto='" +
    id_tipogasto +
    "' AND monto='" +
    monto +
    "' AND fecha='" +
    fecha +
    "';";
  const existe = await sequelize.query(query);
  return existe[1].rowCount;
}
export const createGasto = async (req, res) => {
  const { id_tipogasto, monto, descripcion, fecha, nuevo } = req.body;
  if (!nuevo) {
    if ((await exist(id_tipogasto, monto, fecha)) > 0)
      return res.json({
        status: "primary",
        titulo: "Posibles datos duplicados",
        mensaje:
          'Si comprobo que el gasto no esta declarado marque la casilla "Nuevo"',
      });
  }
  try {
    const newGasto = await Gasto.create({
      id_tipogasto,
      monto,
      descripcion,
      fecha,
    });
    res.json({
      status: "success",
      titulo: "Gasto creado",
      mensaje: "El gasto se ha declarado satisfactorimente",
    });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe un gasto con estas caracteristicas",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
export const updateGasto = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto } = req.body;
    const _gasto = await Gasto.findByPk(id);
    _gasto.monto = monto;
    await _gasto.save();
    res.json({
      status: "success",
      titulo: "Gasto actualizado",
      mensaje: "Se modifico la cantidad registrada",
    });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe un gasto con estas caracteristicas",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
export const deleteGasto = async (req, res) => {
  const { id } = req.params;
  try {
    await Gasto.destroy({
      where: {
        id,
      },
    });
    res
      .status(200)
      .json({
        status: "success",
        titulo: "Eliminado",
        mensaje: "Gasto eliminado correctamente.",
      });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Alerta", message: error.message });
  }
};
