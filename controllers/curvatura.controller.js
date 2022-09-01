import { Curvatura } from "../models/Curvatura.js";
import { Producto } from "../models/Producto.js";
export const getCurvaturas = async (req, res) => {
  try {
    const curvatura = await Curvatura.findAll();
    res.json(curvatura);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getCurvatura = async (req, res) => {
  try {
    const { id } = req.params;
    const curvatura = await Curvatura.findByPk(id);
    if (!curvatura)
      return res.status(404).json({ message: "No existe la curvatura" });
    res.json(curvatura);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const createCurvaturas = async (req, res) => {
  const { curvatura } = req.body;
  try {
    const newCurvatura = await Curvatura.create({
      curvatura,
    });
    res.json({
      status: "success",
      titulo: "Creado",
      mensaje: "Curvatura creada correctamente.",
    });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe una curvatura con esta denominación",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
export const updateCurvaturas = async (req, res) => {
  try {
    const { id } = req.params;
    const { curvatura } = req.body;
    const _curvatura = await Curvatura.findByPk(id);
    _curvatura.curvatura = curvatura;
    await _curvatura.save();
    res.json({
      status: "success",
      titulo: "Actualizado",
      mensaje: "Curvatura actualizada correctamente.",
    });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe una curvatura con esta denominación",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
function exist(id) {
  const existe = Producto.findOne({
    where: {
      id_curvatura: id,
    },
  });
  return existe;
}
export const deleteCurvaturas = async (req, res) => {
  const { id } = req.params;
  if ((await exist(id)) === null) {
    try {
      await Curvatura.destroy({
        where: {
          id,
        },
      });
      res
        .status(200)
        .json({
          status: "success",
          titulo: "Eliminado",
          mensaje: "Curvatura eliminada correctamente.",
        });
    } catch (error) {
      return res
        .status(200)
        .json({ status: "danger", titulo: "Error", mensaje: error.message });
    }
  } else {
    res
      .status(200)
      .json({
        status: "primary",
        titulo: "Curvatura en uso",
        mensaje: "Existe un producto creado con esta curvatura",
      });
  }
};
