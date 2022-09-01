import { Categoria } from "../models/Categoria.js";
import { SubCategoria } from "../models/SubCategoria.js";
export const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);
    if (!categoria)
      return res.status(404).json({ message: "No existe la categoria" });
    res.json(categoria);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const createCategorias = async (req, res) => {
  const { categoria } = req.body;
  try {
    const newCategoria = await Categoria.create({
      categoria,
    });
    res.json({
      status: "success",
      titulo: "Creada",
      mensaje: "Categoría creada correctamente.",
    });
  } catch (error) {
    return res
      .status(200)
      .json({
        mensaje: (error.message = "Validation error"
          ? "Ya existe el elemento"
          : "Ha ocurrido un error, por favor reintente"),
      });
  }
};
export const updateCategorias = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoria } = req.body;
    const _categoria = await Categoria.findByPk(id);
    _categoria.categoria = categoria;
    await _categoria.save();

    res.status(200).json({
      status: "success",
      titulo: "Actualizada",
      mensaje: "Categoría actualizada correctamente.",
    });
  } catch (error) {
    return res
      .status(200)
      .json({
        mensaje: (error.message = "Validation error"
          ? "Ya existe el elemento"
          : "Ha ocurrido un error, por favor reintente"),
      });
  }
};
function exist(id) {
  const existe = SubCategoria.findOne({
    where: {
      id_categoria: id,
    },
  });
  return existe;
}
export const deleteCategorias = async (req, res) => {
  const { id } = req.params;
  if ((await exist(id)) === null) {
    try {
      await Categoria.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        status: "success",
        titulo: "Eliminada",
        mensaje: "Categoría eliminada correctamente.",
      });
    } catch (error) {
      return res
        .status(200)
        .json({ status: "danger", titulo: "Error", mensaje: error.message });
    }
  } else {
    res.status(200).json({
      status: "primary",
      titulo: "Categoría en uso",
      mensaje: "Existen sub-categorías asignadas a esta categoría",
    });
  }
};
