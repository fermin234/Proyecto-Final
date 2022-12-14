const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "cart",
    {
      status: {
        type: DataTypes.ENUM("En proceso", "Por despachar", "Despachado", "Entregado"),
        allowNull: false,
        defaultValue: "En proceso"
      },
    },
    { timestamps: false }
  );
};
