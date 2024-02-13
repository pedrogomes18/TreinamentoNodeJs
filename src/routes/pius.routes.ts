import { Router } from "express";
import PiuRepository from "../repository/PiuRepository";
import GetPiuAllServices from "../services/Piu/GetPiuAllServices";
import CreatePiu from "../services/Piu/CreatePiuServices";
import { userRepository } from "../routes/users.routes";

const piusRouter = Router();
const piuRepository = new PiuRepository();

//Pega todos os Pius
piusRouter.get("/getAll", (request, response) => {
  const getPiuAllServices = new GetPiuAllServices(piuRepository);
  const piu = getPiuAllServices.execute();
  return response.json(piu);
});

//Cria o piu
piusRouter.post("/create", (request, response) => {
  try {
    const { idUser, text } = request.body;

    const createPiu = new CreatePiu(piuRepository, userRepository);

    const piu = createPiu.execute({
      idUser: idUser,
      text: text,
    });

    return response.json(piu);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default piusRouter;
