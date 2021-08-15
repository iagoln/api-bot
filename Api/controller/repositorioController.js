const MensagemLog = require("../utils/MensagemLog");
const repositorioServices = require("../service/RepositorioService");

const mensagemLog = new MensagemLog();

exports.getRepositorio = async (req, res) => {
  try {
    let params = {
      page: 1,
      per_page: 50,
    };
    let linguagem = "C#";
    let retornoMaximo = 5;
    const carrossel = await repositorioServices.criaCarrossel(
      params,
      retornoMaximo,
      linguagem
    );
    if (carrossel) {
      mensagemLog.setSuccess(200, carrossel);
    }
    return mensagemLog.send(res);
  } catch (error) {
    mensagemLog.setError(500, error.message);
    return mensagemLog.send(res);
  }
};
