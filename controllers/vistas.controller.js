import { sequelize } from "../config/database.js";

export const getExist = async (req, res) => {
  try {
    const existencias = await sequelize.query("SELECT * FROM existencia");
    const exist=await sequelize.query("select (select count(*) as inx from existencia where existencia.total=0),(select count(*) as nr from existencia where existencia.total>0 and existencia.area_de_venta=0),(select count(*) as mc from existencia where existencia.merma_c=true)")
    res.json([existencias[0],exist[0]]);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getVales = async (req, res) => {
  try {
    const vales = await sequelize.query("SELECT * FROM vales");
    res.json(vales[0]);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getActualidad = async (req, res) => {
  try {
    const vales = await sequelize.query("SELECT * FROM actualidad");
    // console.log(vales)
    res.json(vales[0][0]);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getActualidadLocal = async (req, res) => {
  try {
    res.json((await sequelize.query(" SELECT * from tiendas "))[0]);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getActualidadTrabajador = async (req, res) => {
  try {
    res.json((await sequelize.query(" SELECT * from trabajadores "))[0]);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getGastos = async (req, res) => {
  try {
    const gastos = await sequelize.query("SELECT * FROM gastos_view");
    res.json(gastos[0]);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
