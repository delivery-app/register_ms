import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './server/routes/userRoutes';
import finalUserRoutes from './server/routes/finalUserRoutes';
import delivererRoutes from './server/routes/delivererRoutes';
import supplierRoutes from './server/routes/supplierRoutes';
import locationRoutes from './server/routes/locationRoutes';

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3002;

app.use('/user-api/users', userRoutes);
app.use('/user-api/final_users', finalUserRoutes);
app.use('/user-api/deliverers', delivererRoutes);
app.use('/user-api/suppliers', supplierRoutes);
app.use('/user-api/locations', locationRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this API.',
}));

app.listen(port, function() {
  console.log(`Server is running on PORT ${port}`);
});

export default app;