const { Users, Cart, Cellphone, DetailCart } = require('../db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Stripe = require('stripe');
const SECRET_KEY = 'PF-Henry'; //cambiar a una variable de entorno
const SECRET_KEY_STRIPE =
  'sk_test_51M5u48DvLT9vn19qTA8TOlOzuB26PmvGzIM0TQN5IJfC77HnAIMdmwfnWuQl9jRtQaapf1SKeMuQ4v1gaYOdvqjk00ak0cmM9Q'; //cambiar a una variable de entorno

const stripe = new Stripe(SECRET_KEY_STRIPE);

const registerUser = async (req, res) => {
  const { email } = req.body;
  try {
    const findUser = await Users.findOne({ where: { email } });
    if (findUser) return res.status(400).json('Usuario ya existe');

    const newUser = await Users.create(req.body);

    const token = jwt.sign(
      { id: newUser.id, status: newUser.status },
      SECRET_KEY,
      {
        expiresIn: 7200, // 2 horas
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const updateUser = await Users.update(
      { ...req.body },
      { where: { id: req.params.id } }
    );

    return res.json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await Users.findOne({ where: { email } });

    const validatePassword = await bcrypt.compareSync(
      password,
      findUser.password
    );

    if (validatePassword) {
      const token = jwt.sign(
        { id: findUser.id, status: findUser.status },
        SECRET_KEY,
        {
          expiresIn: 7200, // 2 horas
        }
      );
      console.log(token, 'token');
      return res.json({ token });
    } else {
      return res.status(400).json('Contraseña incorrecta');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const findOrCreateCart = async (req, res) => {
  console.log('creando Carriito', req.body);
  try {
    const findUser = await Users.findByPk(req.body.id);
    if (!findUser)
      return res
        .status(404)
        .json('Controlador para crear carrito no encontro usuario');
    // encontrar carritos asociados al usuario......
  } catch (error) {}
};

const userInfo = async (req, res) => {
  try {
    const findUser = await Users.findByPk(req.query.id);
    if (!findUser) return res.json('No se encontro usuario');
    const findCarts = await Cart.findAll({
      where: { userId: req.query.id },
      include: Cellphone,
    });
    return res.json({ findUser, findCarts });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const creatDatosPrueba = async (req, res) => {
  const crearCarritos = [
    { userId: 1, status: 'En proceso' },
    { userId: 1, status: 'Entregado' },
    { userId: 2, status: 'Por despachar' },
    { userId: 3, status: 'Despachado' },
    { userId: 4, status: 'Entregado' },
  ];

  try {
    // Se crean usuarios de prueba correctamente
    await Users.create({
      name: 'Scarlet Johanson',
      email: 'scarlet@mail.com',
      password: '12345',
      status: 'Admin',
    });
    await Users.create({
      name: 'Gal Gadot',
      email: 'gal@mail.com',
      password: '12345',
      status: 'Admin',
    });
    await Users.create({
      name: 'Dua Lipa',
      email: 'dua@mail.com',
      password: '12345',
      status: 'User',
    });
    await Users.create({
      name: 'Leo Messi',
      email: 'leomessi@mail.com',
      password: '12345',
      status: 'User',
    });

    // se crean carritos de compra, un carrito por cada usuario y uno adicional para el usuario 1 con estado entregado
    await Cart.bulkCreate(crearCarritos);

    // se agregan productos a los diferentes carritos
    await DetailCart.create({
      cartId: 1,
      cantidad: 5,
      valor_unitario: (
        await Cellphone.findByPk(8, { attributes: ['price'] })
      ).price,
      cellphoneId: 8,
    });
    await DetailCart.create({
      cartId: 1,
      cantidad: 3,
      valor_unitario: (
        await Cellphone.findByPk(4, { attributes: ['price'] })
      ).price,
      cellphoneId: 4,
    });
    await DetailCart.create({
      cartId: 1,
      cantidad: 2,
      valor_unitario: (
        await Cellphone.findByPk(2, { attributes: ['price'] })
      ).price,
      cellphoneId: 2,
    });
    await DetailCart.create({
      cartId: 1,
      cantidad: 8,
      valor_unitario: (
        await Cellphone.findByPk(1, { attributes: ['price'] })
      ).price,
      cellphoneId: 1,
    });
    await DetailCart.create({
      cartId: 2,
      cantidad: 3,
      valor_unitario: (
        await Cellphone.findByPk(1, { attributes: ['price'] })
      ).price,
      cellphoneId: 8,
    });
    await DetailCart.create({
      cartId: 2,
      cantidad: 3,
      valor_unitario: (
        await Cellphone.findByPk(8, { attributes: ['price'] })
      ).price,
      cellphoneId: 1,
    });
    await DetailCart.create({
      cartId: 3,
      cantidad: 2,
      valor_unitario: (
        await Cellphone.findByPk(8, { attributes: ['price'] })
      ).price,
      cellphoneId: 8,
    });
    await DetailCart.create({
      cartId: 3,
      cantidad: 9,
      valor_unitario: (
        await Cellphone.findByPk(4, { attributes: ['price'] })
      ).price,
      cellphoneId: 4,
    });
    await DetailCart.create({
      cartId: 3,
      cantidad: 1,
      valor_unitario: (
        await Cellphone.findByPk(2, { attributes: ['price'] })
      ).price,
      cellphoneId: 2,
    });
    await DetailCart.create({
      cartId: 3,
      cantidad: 1,
      valor_unitario: (
        await Cellphone.findByPk(1, { attributes: ['price'] })
      ).price,
      cellphoneId: 1,
    });
    await DetailCart.create({
      cartId: 4,
      cantidad: 2,
      valor_unitario: (
        await Cellphone.findByPk(8, { attributes: ['price'] })
      ).price,
      cellphoneId: 8,
    });
    await DetailCart.create({
      cartId: 4,
      cantidad: 9,
      valor_unitario: (
        await Cellphone.findByPk(4, { attributes: ['price'] })
      ).price,
      cellphoneId: 4,
    });
    await DetailCart.create({
      cartId: 4,
      cantidad: 1,
      valor_unitario: (
        await Cellphone.findByPk(2, { attributes: ['price'] })
      ).price,
      cellphoneId: 2,
    });
    await DetailCart.create({
      cartId: 4,
      cantidad: 4,
      valor_unitario: (
        await Cellphone.findByPk(1, { attributes: ['price'] })
      ).price,
      cellphoneId: 1,
    });
    await DetailCart.create({
      cartId: 5,
      cantidad: 3,
      valor_unitario: (
        await Cellphone.findByPk(8, { attributes: ['price'] })
      ).price,
      cellphoneId: 8,
    });
    await DetailCart.create({
      cartId: 5,
      cantidad: 1,
      valor_unitario: (
        await Cellphone.findByPk(4, { attributes: ['price'] })
      ).price,
      cellphoneId: 4,
    });
    await DetailCart.create({
      cartId: 5,
      cantidad: 1,
      valor_unitario: (
        await Cellphone.findByPk(2, { attributes: ['price'] })
      ).price,
      cellphoneId: 2,
    });
    await DetailCart.create({
      cartId: 5,
      cantidad: 2,
      valor_unitario: (
        await Cellphone.findByPk(1, { attributes: ['price'] })
      ).price,
      cellphoneId: 1,
    });

    // Se busca los detalles de todos los carritos y se confirman sus datos
    const findAllCarts = await Cart.findAll({
      include: Cellphone,
    });

    return res.json({ findAllCarts });
  } catch (error) {
    console.log('Error al crear usuarios de prueba', error);
    return res.status(500).json(error);
  }
};

const registerBuy = async (req, res) => {
  try {
    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Cell World',
      payment_method: id,
      confirm: true,
    });

    console.log(payment);

    res.json({ message: 'succesFull payment' });
  } catch (error) {
    res.json({ message: error.raw.message });
  }
};

module.exports = {
  registerUser,
  updateUser,
  login,
  userInfo,
  creatDatosPrueba,
  registerBuy,
};
