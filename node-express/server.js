import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

const PORT = 3000;

function checkAuthentication(_, res, next) {
  const authenticated = true;

  if (authenticated) {
    next();
  }
  res.status(401).json({ message: 'Acess denied' });
}

app.get('/', (_, res) => {
  res.status(200).json({ message: 'Home page' });
});

app.get('/about', (_, res) => {
  res.status(200).json({ message: 'About page' });
});

app.get('/profile', checkAuthentication, (_, res) => {
  res.status(200).json({ message: 'Welcome to your profile!' });
});

app.get('/dashboard', checkAuthentication, (_, res) => {
  res.status(200).json({ message: 'Welcome to the panel' });
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  res.status(200).json({ message: `Searching for user with ID: ${id}` });
});

app.get('/products', (req, res) => {
  const { category, maxPrice } = req.query;

  res.status(200).json({
    message: 'Listing all products',
    filters: {
      category: category || 'All',
      maxPrice: maxPrice || 'No limit',
    },
  });
});

app.post('/products', (_, res) => {
  res.status(201).json({
    message: 'Creating a new product',
    product: { id: Date.now(), name: 'Example Product' },
  });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;

  res
    .status(201)
    .json({ message: `User ${name} with e-mail ${email} created!` });
});

app.put('/products/:id', (req, res) => {
  const id = req.params.id;

  res.status(200).json({
    message: 'Updating the product',
    product: { id, name: 'Updated Product' },
  });
});

app.delete('/products/:id', (req, res) => {
  const id = req.params.id;

  res.status(200).json({ message: 'Deleting the product', productId: id });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
