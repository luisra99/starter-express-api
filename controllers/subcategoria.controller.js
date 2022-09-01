import { SubCategoria } from "../models/SubCategoria.js";
import { Producto } from "../models/Producto.js";
export const getSubCategorias = async (req, res) => {
  try {
    const subCategorias = await SubCategoria.findAll();
    res.json(subCategorias);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getSubCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategoria = await SubCategoria.findByPk(id);
    if (!subCategoria)
      return res.status(404).json({ message: "No existe la SubCategoria" });
    res.json(subCategoria);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const createSubCategorias = async (req, res) => {
  const { sub_categoria, id_categoria } = req.body;
  try {
    const newSubCategoria = await SubCategoria.create({
      sub_categoria,
      id_categoria,
    });
    res.json({
      status: "success",
      titulo: "Creada",
      mensaje: "Sub-Categoría creada correctamente.",
    });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe una subcategoria de esta denominación",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
export const updateSubCategorias = async (req, res) => {
  try {
    const { id } = req.params;
    const { sub_categoria, id_categoria } = req.body;
    const _subCategoria = await SubCategoria.findByPk(id);
    _subCategoria.sub_categoria = sub_categoria;
    _subCategoria.id_categoria = id_categoria;
    await _subCategoria.save();
    res.status(200).json({
      status: "success",
      titulo: "Actualizada",
      mensaje: "Sub-Categoría actualizada correctamente.",
    });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe una sub-categoría de esta denominación",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
function exist(id) {
  const existe = Producto.findOne({
    where: {
      id_subcategoria: id,
    },
  });
  return existe;
}
export const deleteSubCategorias = async (req, res) => {
  const { id } = req.params;
  if ((await exist(id)) === null) {
    try {
      await SubCategoria.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        status: "success",
        titulo: "Eliminado",
        mensaje: "La sub-categoría ha sido eliminada correctamente",
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
        titulo: "Sub-Categoría en uso",
        mensaje: "Existe un producto creado con esta sub-categoría",
      });
  }
};
