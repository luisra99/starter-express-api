import { Trabajador } from "../models/Trabajador.js";
import bcrypt from 'bcrypt'
export const getTrabajadores = async (req, res) => {
  console.log("test")
  try {
    const trabajador = await Trabajador.findAll();
    res.json(trabajador);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const getTrabajador = async (req, res) => {
  try {
    const { id } = req.params;
    const trabajador = await Trabajador.findByPk(id);
    if (!trabajador)
      return res.status(404).json({ message: "No existe la talla" });
    res.json(trabajador);
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const createTrabajador = async (req, res) => {
  const {
    direccion,
    primer_apellido,
    segundo_apellido,
    nombre,
    contacto,
    salario_base,
    ci,
    id_local,passw
  } = req.body;
  try {
    const newTrabajador = await Trabajador.create({
      direccion,
      primer_apellido,
      segundo_apellido,
      nombre,
      contacto,
      salario_base,
      ci,
      id_local,
      password:await bcrypt.hash(passw,10)
    });
    res.json({
      status: "success",
      titulo: "Agregado",
      mensaje: "Empleado agregado correctamente",
    });
  } catch (error) {
    return res
      .status(200)
      .json(
        (error.message = "Validation error"
          ? {
              status: "primary",
              titulo: "Existente",
              mensaje: "Ya existe un trabajador con este carnet de identidad",
            }
          : { status: "danger", titulo: "Error", mensaje: error.message })
      );
  }
};
export const updateTrabajador = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      direccion,
      primer_apellido,
      segundo_apellido,
      nombre,
      ci,
      id_local,
      contacto,
      salario_base,
    } = req.body;
    const trabajador = await Trabajador.findByPk(id);
    trabajador.ci = ci;
    trabajador.nombre = nombre;
    trabajador.primer_apellido = primer_apellido;
    trabajador.segundo_apellido = segundo_apellido;
    trabajador.direccion = direccion;
    trabajador.contacto = contacto;
    trabajador.salario_base = salario_base;
    trabajador.id_local = id_local;

    await trabajador.save();
    res.json({
      status: "success",
      titulo: "Actualizado",
      mensaje: "Empleado modificado correctamente",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
export const deleteTrabajador = async (req, res) => {
  const { id } = req.params;
  try {
    await Trabajador.destroy({
      where: {
        id,
      },
    });
    res
      .status(200)
      .json({
        status: "success",
        titulo: "Eliminado",
        mensaje: "Trabajador eliminado correctamente.",
      });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "danger", titulo: "Error", mensaje: error.message });
  }
};
