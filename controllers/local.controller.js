import { Local } from "../models/Local.js";
import { ProductoExist } from "../models/ProductoExist.js";

export const getLocals = async (req, res) => {
  try {
    const local = await Local.findAll();
    res.json(local);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getLocal = async (req, res) => {
  try {
    const { id } = req.params;
    const local = await Local.findByPk(id);
    if (!local) return res.status(404).json({ message: "No existe la talla" });
    res.json(local);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const createLocal = async (req, res) => {
  var { direccion, tipo, nombre, municipio, provincia } = req.body;
  direccion = direccion.trim();
  municipio = municipio.trim();
  provincia = provincia.trim();
  direccion = provincia + ", " + municipio + ", " + direccion;
  const trabajadores = 0;
  try {
    const newLocal = await Local.create({
      direccion,
      trabajadores,
      tipo,
      nombre,
    });
    res.json({
      status: "success",
      titulo: "Agregado",
      mensaje: "Local agregado correctamente",
    });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe un local con esta dirección",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
export const updateLocal = async (req, res) => {
  try {
    const { id } = req.params;
    var { direccion, tipo, nombre, municipio, provincia } = req.body;
    direccion = direccion.trim();
    municipio = municipio.trim();
    provincia = provincia.trim();
    direccion = provincia + ", " + municipio + ", " + direccion;
    const trabajadores = 0;
    const local = await Local.findByPk(id);
    local.direccion = direccion;
    local.trabajadores = trabajadores;
    local.tipo = tipo;
    local.nombre = nombre;
    await local.save();
    res.json({
      status: "success",
      titulo: "Actualizado",
      mensaje: "Local actualizado correctamente",
    });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe un local con esta dirección",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
function exist(id) {
  const existe = ProductoExist.findOne({
    where: {
      id_local: id,
    },
  });
  return existe;
}
export const deleteLocal = async (req, res) => {
  const { id } = req.params;
  if ((await exist(id)) === null) {
    try {
      await Local.destroy({
        where: {
          id,
        },
      });
      res.status(200).json( {
        status: "success",
        titulo: "Eliminado",
        mensaje: "Local eliminado correctamente",
      });
    } catch (error) {
      return res
        .status(200)
        .json({ status: "danger", titulo: "Error", mensaje: error.message });
    }
  } else {
    return res
      .status(200)
      .json({
        status: "primary",
        titulo: "En uso",
        mensaje: "Existen productos en este local",
      });
  }
};
