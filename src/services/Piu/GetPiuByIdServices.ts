import Piu from "../../models/Piu";
import PiuRepository from "../../repository/PiuRepository";

interface Request {
  idPiu: string;
}

class GetPiuById {
  private piuRepository: PiuRepository;

  constructor(piuRepository: PiuRepository) {
    this.piuRepository = piuRepository;
  }

  public execute({ idPiu }: Request): Piu | null {
    const findPiuById = this.piuRepository.getPiuById(idPiu);

    if (findPiuById) {
      return findPiuById;
    } else {
      throw Error("Piu not Found");
      return null;
    }
  }
}

export default GetPiuById;
