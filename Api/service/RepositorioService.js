const gitHubApi = require("../api/gitHubApi");
const CardCarrossel = require("../model/CardCarrossel");
const log = require("../middlewares/log");
class RepositorioServices {
  async getRepositoriesTakeBlip(params) {
    try {
      let paramsFixo = { sort: "created", direction: "asc" };
      const repositorios = await gitHubApi.get("/users/takenet/repos", {
        params: Object.assign(params, paramsFixo),
      });

      return repositorios;
    } catch (error) {
      log.logger.error("error getRepositoriesTakeBlip: " + error.message);
    }
  }
  isLanguage(languageRepositorio, languageInformada) {
    try {
      if (languageRepositorio && languageInformada) {
        return (
          languageRepositorio.toUpperCase() == languageInformada.toUpperCase()
        );
      }
      return false;
    } catch (error) {
      log.logger.error("error na validação: " + error.message);
    }
  }
  async filtraRepositoriosTakeBlip(params, retornoMaximo, linguagem) {
    try {
      const reposFiltrado = [];
      while (reposFiltrado.length < retornoMaximo) {
        const response = await this.getRepositoriesTakeBlip(params);
        const repositories = response.data;
        if (
          repositories.length === 0 ||
          reposFiltrado.length >= retornoMaximo
        ) {
          break;
        }
        reposFiltrado.push(
          ...repositories.filter((repo) => {
            return this.isLanguage(repo.language, linguagem);
          })
        );
        params.page++;
      }
      return reposFiltrado.slice(0, retornoMaximo);
    } catch (error) {
      log.logger.error("error no filtro: " + error.message);
    }
  }
  async criaCarrossel(params, retornoMaximo, linguagem) {
    try {
      let carrossel = [];
      const repositoriosFiltrado = await this.filtraRepositoriosTakeBlip(
        params,
        retornoMaximo,
        linguagem
      );
      for (const repositorio of repositoriosFiltrado) {
        carrossel.push(
          new CardCarrossel(
            repositorio.full_name,
            repositorio.description,
            repositorio.created_at,
            repositorio.owner.avatar_url
          )
        );
      }
      return carrossel;
    } catch (error) {
      log.logger.error("error na criação do Carrossel: " + error.message);
    }
  }
}

module.exports = new RepositorioServices();
