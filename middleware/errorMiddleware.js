export const notFound = (req, res) => {
  res.status(404).send('Not Found');
}

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error')
}