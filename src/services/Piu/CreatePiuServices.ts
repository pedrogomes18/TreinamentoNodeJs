import Piu from "../../models/Piu";
import PiuRepository from "../../repository/PiuRepository";
import UserRepository from "../../repository/UserRepository";

interface Request {
  idUser: string;
  text: string;
}

class CreatePiu {
  private piuRepository: PiuRepository;
  private userRepository: UserRepository;

  constructor(piuRepository: PiuRepository, userRepository: UserRepository) {
    this.piuRepository = piuRepository;
    this.userRepository = userRepository;
  }

  public execute({ idUser, text }: Request): Piu {
    const currentTime = new Date();

    if (!idUser || !text) {
      throw new Error("All fields must be filled.");
    }

    const user = this.userRepository.getUserById(idUser);
    if (user === null) {
      throw new Error("User not found.");
    }

    if (text.length >= 140) {
      throw new Error("The text must contain less than 140 characters.");
    }

    const piu = this.piuRepository.create({
      idUser,
      text,
      created_at: currentTime,
      update_at: currentTime,
    });

    return piu;
  }
}

export default CreatePiu;
