import { ProductoExist } from "../models/ProductoExist.js";
import { ValeDeVenta } from "../models/ValeDeVenta.js";
import { sequelize } from "../config/database.js";
import { Producto } from "../models/Producto.js";
import { SubCategoria } from "../models/SubCategoria.js";
import { Merma } from "../models/Merma.js";
import { TipoGasto } from "../models/TipoGasto.js";

export const getProductoExists = async (req, res) => {
  try {
    const productoExist = await ProductoExist.findAll();
    res.json(productoExist);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
function dateNow() {
  const d = new Date(Date.now());
  let month = (d.getMonth() + 1).toString();
  let day = (d.getDate()+1).toString();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
}
export const getProductoExist = async (req, res) => {
  try {
    const { id } = req.params;
    const productoExist = await ProductoExist.findByPk(id);
    const productoDetails = await Producto.findOne({
      where: {
        id: productoExist.id_producto,
      },
    });
    const productoCat = await SubCategoria.findOne({
      where: {
        id: productoDetails.id_subcategoria,
      },
    });
    if (!productoExist)
      return res
        .status(200)
        .json({
          status: "danger",
          titulo: "No existe",
          mensaje: "El producto ya no existe",
        });
    res.json({ productoExist, productoDetails, productoCat });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
async function GetTipoGasto(t) {
  console.log("-------------------------GetTipoGasto---------------------");
  try {
    var tipoGasto = await TipoGasto.findOne({
      where: {
        tipo_gasto: t === 1 ? "Merma Comercial" : "Merma",
      },
    });
    if (tipoGasto === null) {
      tipoGasto = await TipoGasto.create({
        tipo_gasto: t === 1 ? "Merma Comercial" : "Merma",
      });
      return tipoGasto.id;
    } else {
      return tipoGasto.id;
    }
  } catch (error) {
    console.log(error);
  }
}
async function GastoMerma(existencia, cant, type) {
  console.log("-------------------------GastoMerma---------------------");
  // const id_tipogasto = await GetTipoGasto(type);
  var monto =
    type === 1
      ? existencia[0][0].costo - existencia[0][0].precio
      : existencia[0][0].costo;
  var descripcion ="(" +
  type +
  ") "
    existencia[0][0].sub_categoria +
    " de " +
    existencia[0][0].material +
    " Color: " +
    existencia[0][0].color +
    " CVT: " +
    existencia[0][0].curvatura +
    " (" +
    existencia[0][0].nombre +
    ")";
  
  const fecha = dateNow()
  const gasto = await Merma.create({
    id_producto:existencia[0][0].id_producto,
    costo:existencia[0][0].costo,
    unidades:cant,
    descripcion,
    valor: monto * cant,
    fecha,
  });
}
const ReportMermaComercial = async (producto) => {
  console.log(
    "-------------------------ReportMermaComercial---------------------"
  );
  if (parseInt(producto.costo) > parseInt(producto.precio)) {
    const query =
      "SELECT * FROM existencia WHERE id_existencia='" + producto.id + "'";
    try {
      GastoMerma(await sequelize.query(query),1, "MC");
    } catch (error) {
      console.log(error.message);
    }
  }
};
const ReportMerma = async (id, cant) => {
  console.log("-------------------------ReportMerma---------------------");
  const query = "SELECT * FROM existencia WHERE id_existencia='" + id + "'";
  try {
    GastoMerma(await sequelize.query(query), cant,"M");
  } catch (error) {
    console.log(error.message);
  }
};
export const createProductoExist = async (req, res) => {
  const {
    id_subcategoria,
    id_local,
    id_curvatura,
    id_talla,
    id_color,
    id_material,
    descripcion,
    costo,
    precio,
    comision,
    merma_c,
    total,
    almacen,
    area_de_venta,
  } = req.body;

  try {
    var producto = await Producto.findOne({
      where: {
        id_subcategoria,
        id_material,
        id_curvatura,
      },
    });
    if (producto === null) {
      producto = await Producto.create({
        id_subcategoria,
        id_material,
        id_curvatura,
      });
    }
    const id_producto = producto.id;
    const findProduct = await ProductoExist.findOne({
      where: {
        id_producto,
        id_local,
        id_talla,
        costo,
        precio,
        comision,
        merma_c,
      },
    });
    if (findProduct != null)
      res.json({
        status: "primary",
        titulo: "Producto en existencia",
        mensaje:
          "Ya existe un producto en este local con estas características",
      });
    else {
      const pd = await ProductoExist.create({
        id_producto,
        id_local,
        id_talla,
        id_color,
        descripcion,
        costo,
        precio,
        comision,
        merma_c,
        total,
        almacen,
        area_de_venta,
      });
      res.json({
        status: "success",
        titulo: "Producto Creado",
        mensaje: "Compruebe su existencia",
      });
    }
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const CreateProductMC = async (product, merma, av, precio) => {
  console.log(merma,av,precio)
  const {
    id_producto,
    id_local,
    id_talla,
    id_color,
    descripcion,
    costo,
    comision,
  } = product;

  try {
    await ProductoExist.create({
      id_producto,
      id_local,
      id_talla,
      id_color,
      descripcion,
      costo,
      precio: precio,
      comision,
      merma_c: true,
      total: merma,
      almacen: merma - av,
      area_de_venta: av,
    });
    res.json({
      status: "success",
      titulo: "Producto Creado",
      mensaje: "Compruebe su existencia",
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateProductoExist = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_local,
      id_talla,
      id_color,
      descripcion,
      costo,
      precio,
      comision,
      merma_c,
      total,
      almacen,
      area_de_venta,
    } = req.body;
    const productoExist = await ProductoExist.findByPk(id);
    productoExist.id_color = id_color;
    productoExist.id_local = id_local;
    productoExist.id_talla = id_talla;
    productoExist.descripcion = descripcion;
    productoExist.costo = costo;
    productoExist.precio = precio;
    productoExist.comision = comision;
    productoExist.merma_c = merma_c;
    productoExist.total = total;
    productoExist.almacen = almacen;
    productoExist.area_de_venta = area_de_venta;
    await productoExist.save();
    res.json({
      status: "primary",
      titulo: "Actualizado",
      mensaje: "Producto actualizado correctamente",
    });
  } catch (error) {
    return res.status(200).json(
      (error.message = "Validation error"
        ? {
            status: "primary",
            titulo: "Existente",
            mensaje: "Ya existe un producto con estas características",
          }
        : { status: "danger", titulo: "Error", mensaje: error.message })
    );
  }
};
export const mermarProductoExist = async (req, res) => {
  try {
    const { id } = req.params;
    const { total, almac, areav, merma_c, merma, avmrc, precion } = req.body;
    const productoExist = await ProductoExist.findByPk(id);
    productoExist.total = total;
    productoExist.almacen = almac;
    productoExist.area_de_venta = areav;
    if (!productoExist.merma_c && merma_c) {
      CreateProductMC(productoExist, merma, avmrc,precion);
    }
    const result = await productoExist.save().then(() => {
      if (!merma_c) ReportMerma(id, merma, precion);
    });
    // CreateProductMC(productoExist,merma)
    res.json({
      status: "primary",
      titulo: "Mermado",
      mensaje: "Producto actualizado correctamente",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const deleteProductoExist = async (req, res) => {
  const { id } = req.params;
  try {
    await ProductoExist.destroy({
      where: {
        id,
      },
    });
    res.json({
      status: "success",
      titulo: "Eliminado",
      mensaje: "El producto ha sido eliminado correctamente",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Alerta", mensaje: error.message });
  }
};
export const soldProductoExist = async (req, res) => {
  const { id } = req.params;
  // const{id_trabajador,fecha,unidades}=req.body
  try {
    const resultadoDeVenta = await Venta(id);
    //const resultadoDeVenta=await Venta(id,id_trabajador,fecha,unidades)
    res.json({
      status: "success",
      titulo: "Venta Satisfactoria",
      mensaje: "La venta se ha realizado con exito",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Alerta", mensaje: error.message });
  }
};
const Venta = async (id) => {
  try {
    //Test values
    const worker = 1;
    const unidades = 1;
    //Test values
    const product = await ProductoExist.findByPk(id);
    const {
      id_producto,
      id_local,
      id_talla,
      id_color,
      descripcion,
      comision,
      costo,
      precio,
      total,
      almacen,
      area_de_venta,
    } = product;
    ReportMermaComercial(product);
    const vale = await CrearVale(
      id_producto,
      id_local,
      id_talla,
      id_color,
      descripcion,
      costo,
      precio,
      comision,
      worker
    );
    // console.log(vale)
    if (vale != undefined) {
      product.total = total - 1;
      area_de_venta === 0
        ? (product.almacen = almacen - 1)
        : (product.area_de_venta = area_de_venta - 1);
      const resultado = await product.save();
    }
    return resultado;
  } catch (error) {
    return error;
  }
};
const CrearVale = async (
  id_producto,
  id_local,
  id_talla,
  id_color,
  descripcion,
  costo,
  precio,
  comision,
  id_trabajador
) => {
  try {
    const newValeDeVenta = await ValeDeVenta.create({
      id_producto,
      id_local,
      id_talla,
      id_color,
      descripcion,
      costo,
      precio,
      comision,
      id_trabajador
    });
    return newValeDeVenta;
  } catch (error) {
    console.log(error);
  }
};
