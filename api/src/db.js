require('dotenv').config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: 5432,
  dialect: "postgres",
  logging: false,
  native: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Cellphone, Bill, Brand, Os, Cart, Users } = sequelize.models;

// Aca vendrian las relaciones
Users.hasMany(Bill, {   foreignKey: "idUser" });
Bill.belongsTo(Users); // ok

Users.hasOne(Cart, { foreignKey: "idUser"});
Cart.belongsTo(Users); // ok

Bill.belongsToMany(Cellphone, { through: "CellphoneUser"});
Cellphone.belongsToMany(Bill, { through: "CellphoneUser"});

Os.hasMany(Cellphone, { foreignKey: "idOs"});
Cellphone.belongsTo(Os);

Brand.hasMany(Cellphone);
Cellphone.belongsTo(Brand);

// Users.hasMany(Cellphone, { foreignKey: "idUser" });
// Cellphone.belongsTo(Users); // xxxx habia que establecer relacion muchos a muchos

// Cellphone.hasOne(Brand, { foreignKey: "idCellphone" });
// Brand.belongsTo(Cellphone); // xxx relacion uno a uno xxx

// Brand.hasOne(Os, {   foreignKey: "idBrand" });
// Os.belongsTo(Brand); // xxx relacion uno a uno xxx

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
