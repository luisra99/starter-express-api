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
    const dia = await sequelize.query(" SELECT sum(vale_de_venta.importe) AS importe_dia,vale_de_venta.id_local, locals.nombre, sum(vale_de_venta.comision) AS comision_dia FROM vale_de_venta, locals WHERE vale_de_venta.id_local = locals.id AND vale_de_venta.fecha::date = CURRENT_DATE GROUP BY vale_de_venta.id_local, locals.nombre;");
    const semana = await sequelize.query("SELECT * FROM importe_por_local_semana_actual");
    const mes = await sequelize.query("SELECT * FROM importe_por_local_mes_actual");
    const year = await sequelize.query("SELECT * FROM importe_por_local_year_actual");
    console.log(dia)
    res.json([dia[0],semana[0],mes[0],year[0]]);
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
