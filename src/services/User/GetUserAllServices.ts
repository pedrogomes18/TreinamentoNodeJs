import User from "../../models/User";
import UserRepository from "../../repository/UserRepository";

class GetUserAll {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public execute(): User[] | null {
    const getAllUser = this.userRepository.allUser();

    if (getAllUser) {
      return getAllUser;
    } else {
      throw Error("Users not Found");
    }
  }
}

export default GetUserAll;
