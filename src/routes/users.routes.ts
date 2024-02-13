import { Router } from "express";
import UserRepository from "../repository/UserRepository";
import GetUserAll from "../services/User/GetUserAllServices";
import CreateUserServices from "../services/User/CreateUserServices";
import GetUserById from "../services/User/GetUserByIdServices";
import UpdateUser from "../services/User/UpdateUserServices";
import DeleteUser from "../services/User/DeleteUserServiices";
import { parseISO } from "date-fns";

const userRouter = Router();
export const userRepository = new UserRepository();

// Pega todos Users
userRouter.get("/getAll", (request, response) => {
  const getUserAll = new GetUserAll(userRepository);
  const user = getUserAll.execute();
  return response.json(user);
});

// Pega Usuário pelo ID
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

// Cria Users
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

// Atualiza User
userRouter.put("/update/:id", (request, response) => {
  try {
    const { id } = request.params;
    const { name, dataBirth, cpf, telephone } = request.body;

    const parsedDate = parseISO(dataBirth);

    const updateUser = new UpdateUser(userRepository);
    const updatedUser = updateUser.execute({
      idUser: id,
      newData: {
        name,
        dataBirth: parsedDate,
        cpf,
        telephone,
      },
    });

    if (!updatedUser) {
      return response.status(404).json({ error: "User not found." });
    }

    return response.json(updatedUser);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

// Deleta User
userRouter.delete("/delete/:id", (request, response) => {
  try {
    const { id } = request.params;

    const deleteUser = new DeleteUser(userRepository);
    deleteUser.execute(id);

    return response.json({ message: "User deleted successfully." });
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default userRouter;
