import User from "../../models/User";
import UserRepository from "../../repository/UserRepository";

class DeleteUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public execute(idUser: string): boolean {
    const userDeleted = this.userRepository.deleteUser(idUser);

    if (!userDeleted) {
      throw new Error("User not found.");
    }

    return true;
  }
}

export default DeleteUser;
