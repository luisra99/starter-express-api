import { Color } from "../models/Color.js";
import { ProductoExist } from "../models/ProductoExist.js";

export const getColors = async (req, res) => {
  try {
    const color = await Color.findAll();
    res.json(color);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getColor = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await Color.findByPk(id);
    if (!color) return res.status(404).json({ message: "No existe la color" });
    res.json(color);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const createColors = async (req, res) => {
  const { color } = req.body;
  try {
    const newColor = await Color.create({
      color
    });
    res.status(200).json({
      status: "success",
      titulo: "Creado",
      mensaje: "Color creado correctamente."
    });
  } catch (error) {
    return res.status(200).json(
      (error.message = "Validation error"
        ? {
            status: "primary",
            titulo: "Existente",
            mensaje: "Ya existe este color"
          }
        : { status: "danger", titulo: "Error", mensaje: error.message })
    );
  }
};
export const updateColors = async (req, res) => {
  try {
    const { id } = req.params;
    const { color } = req.body;
    const _color = await Color.findByPk(id);
    _color.color = color;
    await _color.save();
    res.json({
      status: "success",
      titulo: "Actualizado",
      mensaje: "Color actualizado correctamente.",
    });
  } catch (error) {
    return res.status(200).json(
      (error.message = "Validation error"
        ? {
            status: "primary",
            titulo: "Existente",
            mensaje: "Ya existe este color",
          }
        : { status: "danger", titulo: "Error", mensaje: error.message })
    );
  }
};
function exist(id) {
  const existe = ProductoExist.findOne({
    where: {
      id_color: id,
    },
  });
  return existe;
}
export const deleteColors = async (req, res) => {
  const { id } = req.params;
  if ((await exist(id)) === null) {
    try {
      await Color.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        status: "success",
        titulo: "Eliminado",
        mensaje: "Color eliminado correctamente.",
      });
    } catch (error) {
      return res
        .status(200)
        .json({ status: "danger", titulo: "Error", mensaje: error.message });
    }
  } else {
    res.status(200).json({
      status: "primary",
      titulo: "Color en uso",
      mensaje: "Existen productos creados con este color",
    });
  }
};
