import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './controllers/productsController.js';

function handleRequest(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const routeKey = `${req.method} ${req.url}`;

  if (routeKey === 'GET /api/products') {
    return getProducts(req, res);
  }
  if (routeKey === 'POST /api/products') {
    return createProduct(req, res);
  }
  if (req.url.startsWith('/api/products') && req.method === 'PUT') {
    return updateProduct(req, res);
  }
  if (req.url.startsWith('/api/products') && req.method === 'DELETE') {
    return deleteProduct(req, res);
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: 'Route not found' }));
}

export { handleRequest };
