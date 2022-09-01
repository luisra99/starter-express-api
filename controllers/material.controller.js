import { Material } from "../models/Material.js";
import { Producto } from "../models/Producto.js";

export const getMaterials = async (req, res) => {
  try {
    const material = await Material.findAll();
    res.json(material);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const material = await Material.findByPk(id);
    if (!material)
      return res.status(404).json({ message: "No existe la material" });
    res.json(material);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const createMaterials = async (req, res) => {
  const { material } = req.body;
  try {
    const newMaterial = await Material.create({
      material,
    });
    res.json({
      status: "success",
      titulo: "Creado",
      mensaje: "Material creado correctamente.",
    });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe un material de este tipo",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
export const updateMaterials = async (req, res) => {
  try {
    const { id } = req.params;
    const { material } = req.body;
    const _material = await Material.findByPk(id);
    _material.material = material;
    await _material.save();
    res
      .status(200)
      .json({
        status: "success",
        titulo: "Actualizado",
        mensaje: "Material actualizado correctamente.",
      });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe un material de este tipo",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
function exist(id) {
  const existe = Producto.findOne({
    where: {
      id_material: id,
    },
  });
  return existe;
}
export const deleteMaterials = async (req, res) => {
  const { id } = req.params;
  if ((await exist(id)) === null) {
    try {
      await Material.destroy({
        where: {
          id,
        },
      });
      res
        .status(200)
        .json({
          status: "success",
          titulo: "Eliminado",
          mensaje: "Material eliminado correctamente.",
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
        titulo: "Material en uso",
        mensaje: "Existe un producto creado con este material",
      });
  }
};
