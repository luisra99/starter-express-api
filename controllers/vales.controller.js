import { ValeDeVenta } from "../models/ValeDeVenta.js";

export const clear = async (req, res) => {
  try {
    const vale = await ValeDeVenta.destroy({
      where: {},
      truncate: true,
    });
    res.json(vale);
  } catch (error) {
    return res
      .status(200)
      .json({
        mensaje: (error.message = "Validation error"
          ? "Registros Vacíos"
          : "Ha ocurrido un error, por favor reintente"),
      });
  }
};
