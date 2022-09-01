import { TipoGasto } from "../models/TipoGasto.js";
import { Gasto } from "../models/Gasto.js";
export const getTiposGasto = async (req, res) => {
  try {
    const tipoGasto = await TipoGasto.findAll();
    res.json(tipoGasto);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getTipoGasto = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoGasto = await TipoGasto.findByPk(id);
    if (!tipoGasto)
      return res
        .status(404)
        .json({
          status: "danger",
          titulo: "Error",
          message: "No existe el tipo de gasto",
        });
    res.json(tipoGasto);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const createTipoGasto = async (req, res) => {
  const { tipo_gasto } = req.body;
  try {
    const newTipoGasto = await TipoGasto.create({
      tipo_gasto,
    });
    res.status(200).json({
      status: "success",
      titulo: "Creado",
      mensaje: "Tipo de gasto creado correctamente.",
    });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe un gasto de este tipo",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
export const updateTipoGasto = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo_gasto } = req.body;
    const _tipo_gasto = await TipoGasto.findByPk(id);
    _tipo_gasto.tipo_gasto = tipo_gasto;
    await _tipo_gasto.save();
    res.status(200).json({
      status: "success",
      titulo: "Modificado",
      mensaje: "Tipo de gasto modificado correctamente.",
    });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe un gasto de este tipo",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
function exist(id) {
  const existe = Gasto.findOne({
    where: {
      id_tipogasto: id,
    },
  });
  return existe;
}
export const deleteTipoGasto = async (req, res) => {
  const { id } = req.params;

  if ((await exist(id)) === null) {
    try {
      await TipoGasto.destroy({
        where: {
          id,
        },
      });
      res
        .status(200)
        .json({
          status: "success",
          titulo: "Eliminado",
          mensaje: "Tipo de gasto eliminado correctamente.",
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
        titulo: "Tipo de gasto en uso",
        mensaje: "Existe un gasto de este tipo declarado",
      });
  }
};
