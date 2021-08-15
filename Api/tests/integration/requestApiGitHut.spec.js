const repositorioService = require("../../service/RepositorioService");

let params = {
  page: 1,
  per_page: 50,
};

describe("gitHubApi", () => {
  test("Deve retornar status 200", () => {
    repositorioService.getRepositoriesTakeBlip(params).then(({ status }) => {
      expect(status).toBe(200);
    });
  });

  test("Deve retornar um array", () => {
    repositorioService
      .getRepositoriesTakeBlip(params)
      .then(({ data, status }) => {
        expect(status).toBe(200);
        expect(data).toHaveLength(50);
      });
  });

  test("Deve retornar as propriedades ", () => {
    repositorioService
      .getRepositoriesTakeBlip(params)
      .then(({ data, status }) => {
        expect(status).toBe(200);
        expect(data).toHaveProperty(
          "full_name",
          "description",
          "created_at",
          "owner.avatar_url"
        );
      })
      .catch((err) => {
        expect(err.status).toBe(403);
      });
  });
});
