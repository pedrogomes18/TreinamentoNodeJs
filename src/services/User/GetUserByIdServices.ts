import User from "../../models/User";
import UserRepository from "../../repository/UserRepository";

interface Request {
  id: string;
}

class GetUserById {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public execute({ id }: Request): User | null {
    const findUserById = this.userRepository.getUserById(id);

    if (findUserById) {
      return findUserById;
    } else {
      throw Error("User not Found");
      return null;
    }
  }
}

export default GetUserById;
