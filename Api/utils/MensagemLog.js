class MensagemLog {
  constructor() {
    this.statusCode = null;
    this.tipo = null;
    this.data = new Date();
    this.message = null;
  }

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.tipo = "success";
  }

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.tipo = "error";
  }

  send(res) {
    const result = {
      status: this.tipo,
      message: this.message,
      data: this.data,
    };

    if (this.tipo === "success") {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      status: this.tipo,
      message: this.message,
    });
  }
}

module.exports = MensagemLog;
