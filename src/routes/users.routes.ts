import { Router } from "express";
import UserRepository from "../repository/UserRepository";
import CreateUserServices from "../services/CreateUserServices";
import { parseISO } from "date-fns";

const userRouter = Router();
const userRepository = new UserRepository();

//Get
userRouter.get("/", (request, response) => {
  const user = userRepository.allUser();
  return response.json(user);
});

//Post
userRouter.post("/", (request, response) => {
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
