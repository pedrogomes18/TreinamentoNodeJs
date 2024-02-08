const express = require("express");
const uuid = require("uuid");

const app = express();
app.use(express.json());

/*
    Metodos HTTP
     * GET - Buscar Informações do Back
     * DELETE - Deletar um Recurso
     * POST - Criar uma informação no Back
     * PUT/PATCH - Alterar uma Informação
*/

/*
    Tipos de parâmetros
     * Query Params: Filtros e Paginação
     * Route Params: Identificar recursos (Atualizar/Deletar)
     * Request Body: Conteúudo na hora de criar ou editar um recurso. É o maldito JSON
*/

const projects = [];

//GET
app.get("/projects", (request, response) => {
  return response.json(projects);
});

//POST
app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid.v4(), title: title, owner: owner };

  projects.push(project);

  return response.json(project);
});

//PUT
app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id == id);

  if (projectIndex < 0) {
    return response.status(404).json({ error: "Project not found" });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;
  return response.json(project);
});

//DELETE
app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id == id);

  if (projectIndex < 0) {
    return response.status(404).json({ error: "Project not found" });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log("BackEnd Started!😉");
});
