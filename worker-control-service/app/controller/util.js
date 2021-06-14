export function CustomError({ status, message }) {
  this.name = "MeuErro";
  this.status = status;
  this.message = message || "Erro inesperado";
  this.stack = new Error().stack;
}
CustomError.prototype = Object.create(CustomError.prototype);
CustomError.prototype.constructor = CustomError;

export const trata = async (req, res, fn, ...param) => {
  try {
    let response = await fn(...param);
    res.send(JSON.stringify(response));
  } catch (err) {
    if (typeof err === "object" && err.status) {
      res.status(err.status).send(err.message);
    } else {
      res.status(500).send(err);
    }
    console.log(err);
  }
};
