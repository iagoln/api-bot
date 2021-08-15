const repositorioServices = require("../../service/RepositorioService");
const CardCarrossel = require("../../model/CardCarrossel");

describe("repositorioService", () => {
  let params = {
    page: 1,
    per_page: 50,
  };

  test("Deve retornar 200", async () => {
    const response = await repositorioServices.getRepositoriesTakeBlip(params);
    expect(response.status).toBe(200);
  });

  test("Deve retornar verdadeiro", () => {
    expect(repositorioServices.isLanguage("c#", "C#")).toBeTruthy();
  });

  test("Deve retornar falso", () => {
    expect(repositorioServices.isLanguage("cc2#", "C#")).toBeFalsy();
  });

  test("Deve retorna 5 itens, em ordem crescente", async () => {
    const response = await repositorioServices.filtraRepositoriosTakeBlip(
      params,
      5,
      "C#"
    );
    expect(response).toHaveLength(5);
    expect(new Date(response[0].created_at).getTime()).toBeLessThan(
      new Date(response[1].created_at).getTime()
    );
    expect(new Date(response[1].created_at).getTime()).toBeLessThan(
      new Date(response[2].created_at).getTime()
    );
    expect(new Date(response[2].created_at).getTime()).toBeLessThan(
      new Date(response[3].created_at).getTime()
    );
    expect(new Date(response[3].created_at).getTime()).toBeLessThan(
      new Date(response[4].created_at).getTime()
    );
  });

  test("Deve criar Carrossel", async () => {
    const response = await repositorioServices.criaCarrossel(params, 5, "C#");
    expect(response).toHaveLength(5);
    expect(response[0]).toBeInstanceOf(CardCarrossel);
    expect(response[1]).toBeInstanceOf(CardCarrossel);
    expect(response[2]).toBeInstanceOf(CardCarrossel);
    expect(response[3]).toBeInstanceOf(CardCarrossel);
    expect(response[4]).toBeInstanceOf(CardCarrossel);
  });
});
