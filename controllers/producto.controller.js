import { Producto } from "../models/Producto.js";
export const getProductos = async (req, res) => {
  try {
    const producto = await Producto.findAll();
    res.json(producto);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto)
      return res.status(404).json({ message: "No existe la talla" });
    res.json(producto);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const createProducto = async (req, res) => {
  const { id_subcategoria, id_material, id_curvatura } = req.body;
  try {
    const newProducto = await Producto.create({
      id_subcategoria,
      id_material,
      id_curvatura,
    });
    res.json(newProducto);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_subcategoria, id_material, id_curvatura } = req.body;
    const producto = await Producto.findByPk(id);
    producto.id_material = id_material;
    producto.id_curvatura = id_curvatura;
    producto.id_subcategoria = id_subcategoria;
    await producto.save();
    res.json(producto);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await Producto.destroy({
      where: {
        id,
      },
    });
    res.status(204);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
