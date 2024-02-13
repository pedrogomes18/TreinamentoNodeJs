import { Router } from "express";
import PiuRepository from "../repository/PiuRepository";
import GetPiuAllServices from "../services/Piu/GetPiuAllServices";
import CreatePiu from "../services/Piu/CreatePiuServices";
import UpdatePiu from "../services/Piu/UpdatePiuServices";
import { userRepository } from "../routes/users.routes";

const piusRouter = Router();
export const piuRepository = new PiuRepository();

// Pega todos os Pius
piusRouter.get("/getAll", (request, response) => {
  const getPiuAllServices = new GetPiuAllServices(piuRepository);
  const piu = getPiuAllServices.execute();
  return response.json(piu);
});

// Cria o piu
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

// Atualiza o piu
piusRouter.put("/update/:idPiu", (request, response) => {
  try {
    const { idPiu } = request.params;
    const { newText } = request.body;

    const updatePiu = new UpdatePiu(piuRepository);
    const updatedPiu = updatePiu.execute({ idPiu, newText });

    if (!updatedPiu) {
      return response.status(404).json({ error: "Piu not found." });
    }

    return response.json(updatedPiu);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default piusRouter;
