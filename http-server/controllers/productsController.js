const DECIMAL = 10;
const ID_INDEX = 3;

function getProducts(_, res) {
  const products = [
    { id: 1, name: 'Product A', price: 50.0 },
    { id: 2, name: 'Product B', price: 30.0 },
  ];

  res.statusCode = 200;
  res.end(JSON.stringify(products));
}

function createProduct(req, res) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const newProduct = JSON.parse(body);
      newProduct.id = Date.now();

      res.statusCode = 201;
      res.end(
        JSON.stringify({ message: 'Product created', product: newProduct }),
      );
    } catch (error) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          error: 'Error processing product',
          details: error.details,
        }),
      );
    }
  });
}

function updateProduct(req, res) {
  const id = req.url.split('/')[ID_INDEX];
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const updatedProduct = JSON.parse(body);
      updatedProduct.id = parseInt(id, DECIMAL);

      res.statusCode = 200;
      res.end(
        JSON.stringify({ message: 'Updated product', product: updatedProduct }),
      );
    } catch (error) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          error: 'Error processing product',
          details: error.details,
        }),
      );
    }
  });
}

function deleteProduct(req, res) {
  const id = req.url.split('/')[ID_INDEX];

  res.statusCode = 200;
  res.end(JSON.stringify({ message: `Product with ID ${id} deleted` }));
}

export { getProducts, createProduct, updateProduct, deleteProduct };
