import User from "../../models/User";
import UserRepository from "../../repository/UserRepository";

interface Request {
  idUser: string;
  newData: Partial<User>;
}

class UpdateUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public execute({ idUser, newData }: Request): User | null {
    try {
      if (!idUser || !newData) {
        throw new Error("ID of the User and new data must be provided.");
      }

      if (newData.cpf) {
        const userWithSameCpf = this.userRepository.findByUserCpf(newData.cpf);
        if (userWithSameCpf && userWithSameCpf.id !== idUser) {
          throw new Error("CPF is already registered for another user.");
        }
      }

      const updatedUser = this.userRepository.updateUser(idUser, newData);

      if (!updatedUser) {
        throw new Error("User not found or failed to update user.");
      }

      return updatedUser;
    } catch (error) {
      throw new Error("Unable to update user");
    }
  }
}

export default UpdateUser;
