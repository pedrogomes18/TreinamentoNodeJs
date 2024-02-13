import { Router } from "express";
import UserRepository from "../repository/UserRepository";
import GetUserAll from "../services/User/GetUserAllServices";
import CreateUserServices from "../services/User/CreateUserServices";
import GetUserById from "../services/User/GetUserByIdServices";
import { parseISO } from "date-fns";

const userRouter = Router();
const userRepository = new UserRepository();

//Pega todos Users
userRouter.get("/getAll", (request, response) => {
  const getUserAll = new GetUserAll(userRepository);
  const user = getUserAll.execute();
  return response.json(user);
});

//Pega Usuário pelo ID
userRouter.get("/getUser/:id", (request, response) => {
  try {
    const id = request.params.id;

    const getUserById = new GetUserById(userRepository);

    const user = getUserById.execute({
      id,
    });
    return response.json(user);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

//Cria Users
userRouter.post("/create", (request, response) => {
  try {
    const { name, dataBirth, cpf, telephone } = request.body;

    const parsedDate = parseISO(dataBirth);

    const createUser = new CreateUserServices(userRepository);

    const user = createUser.execute({
      name,
      dataBirth: parsedDate,
      cpf,
      telephone,
    });

    return response.json(user);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default userRouter;
