import Piu from "../../models/Piu";
import { startOfHour } from "date-fns";
import PiuRepository from "../../repository/PiuRepository";
import UserRepository from "../../repository/UserRepository";

interface Request {
  idUser: string;
  text: string;
  created_at: Date;
  update_at: Date;
}

class CreatePiu {
  private piuRepository: PiuRepository;
  private userRepository: UserRepository;

  constructor(piuRepository: PiuRepository, userRepository: UserRepository) {
    this.piuRepository = piuRepository;
    this.userRepository = userRepository;
  }

  public execute({ idUser, text, created_at, update_at }: Request): Piu {
    const currentTime = new Date();

    if (!idUser || !text) {
      throw new Error("All fields must be filled.");
    }

    const user = this.userRepository.getUserById(idUser);
    if (!user) {
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
