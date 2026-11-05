import express from 'express';
import { config } from 'dotenv';

import { router_basket } from './src/routes/basket.routes.js';
import { router_block } from './src/routes/blockedUser.routes.js';
import { router_cateregoriya } from './src/routes/cateragoriya.routes.js';
import { router_discount } from './src/routes/discount.routes.js';
import { router_newproduct } from './src/routes/newProduct.routes.js';
import { router_products } from './src/routes/products.routes.js';
import { router_returned } from './src/routes/returnedProducts.routes.js';
import { router_trend } from './src/routes/trendProduct.routes.js';
import { router_users } from './src/routes/users.routes.js';

config();

const port = process.env.PORT || 3001;
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Marshrutlarni serverga ulash
app.use('/basket', router_basket);
app.use('/block', router_block);
app.use('/category', router_cateregoriya);
app.use('/discount', router_discount);
app.use('/new-products', router_newproduct);
app.use('/products', router_products);
app.use('/returned-products', router_returned);
app.use('/trend-products', router_trend);
// app.use('/users', router_user);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Bunday API marshrut mavjud emas"
  });
});

// Serverni ishga tushirish
app.listen(port, () => {
  console.log(`Server ${port}-portda muvaffaqiyatli ishga tushdi`);
});