const express = require("express");

const app = express();

/*
    Metodos HTTP
     * GET - Buscar Informações do Back
     * DELETE - Deletar um Recurso
     * POST - Criar uma informação no Back
     * PUT/PATCH - Alterar uma Informação
*/

//GET
app.get("/projects", (resquest, response) => {
  return response.json(["Projeto 1", "Projeto 2", "Projeto 3"]);
});

//POST
app.post("/projects", (resquest, response) => {
  return response.json(["Projeto 1", "Projeto 2", "Projeto 3", "Projeto 4"]);
});

//PUT
app.put("/projects/:id", (resquest, response) => {
  return response.json(["Projeto 8", "Projeto 2", "Projeto 3", "Projeto 4"]);
});

//DELETE
app.delete("/projects/:id", (resquest, response) => {
  return response.json(["Projeto 8", "Projeto 2", "Projeto 3"]);
});

app.listen(3333, () => {
  console.log("BackEnd Started!😉");
});
