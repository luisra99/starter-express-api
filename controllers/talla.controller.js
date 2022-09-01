import { Talla } from "../models/Talla.js";
import { ProductoExist } from "../models/ProductoExist.js";
export const getTallas = async (req, res) => {
  try {
    const talla = await Talla.findAll();
    res.json(talla);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getTalla = async (req, res) => {
  try {
    const { id } = req.params;
    const talla = await Talla.findByPk(id);
    if (!talla) return res.status(404).json({ message: "No existe la talla" });
    res.json(talla);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const createTallas = async (req, res) => {
  const { talla } = req.body;
  try {
    const newTalla = await Talla.create({
      talla,
    });
    res.json({
      status: "success",
      titulo: "Creada",
      mensaje: "Talla creada correctamente.",
    });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe una talla de esta denominación",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
export const updateTallas = async (req, res) => {
  try {
    const { id } = req.params;
    const { talla } = req.body;
    const _talla = await Talla.findByPk(id);
    _talla.talla = talla;
    await _talla.save();
    res
      .status(200)
      .json({
        status: "success",
        titulo: "Actualizado",
        mensaje: "Talla actualizada correctamente.",
      });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe una talla de esta denominación",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
function exist(id) {
  const existe = ProductoExist.findOne({
    where: {
      id_talla: id,
    },
  });
  return existe;
}
export const deleteTallas = async (req, res) => {
  const { id } = req.params;

  if ((await exist(id)) === null) {
    try {
      await Talla.destroy({
        where: {
          id,
        },
      });
      res
        .status(200)
        .json({
          status: "success",
          titulo: "Eliminado",
          mensaje: "Talla eliminada correctamente.",
        });
    } catch (error) {
      return res
        .status(200)
        .json({ status: "danger", titulo: "Alerta", message: error.message });
    }
  } else {
    res
      .status(200)
      .json({
        status: "primary",
        titulo: "Talla en uso",
        mensaje: "Existe un producto creado con esta talla",
      });
  }
};
