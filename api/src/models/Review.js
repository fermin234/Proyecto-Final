const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("review", {
    star: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            max:5,
            min:1
        }
    }, 
    coments: {
        type: DataTypes.TEXT,
    }
  },
  {
    timestamps: false
  });
};