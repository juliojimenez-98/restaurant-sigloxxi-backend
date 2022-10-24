const tablasPermitidas = (tabla = "", tablas = []) => {
  const incluida = tablas.includes(tabla);

  if (!incluida) {
    throw new Error(
      `La tabla ${tabla} no esta permitida, las permitidas son: ${tablas}`
    );
  }
  return true;
};

module.exports = {
  tablasPermitidas,
};
