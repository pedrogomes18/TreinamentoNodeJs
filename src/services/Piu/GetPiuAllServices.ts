import Piu from "../../models/Piu";
import PiuRepository from "../../repository/PiuRepository";

class GetPiuAll {
  private piuRepository: PiuRepository;

  constructor(piuRepository: PiuRepository) {
    this.piuRepository = piuRepository;
  }

  public execute(): Piu[] | null {
    const getAllPiu = this.piuRepository.allPiu();

    if (getAllPiu) {
      return getAllPiu;
    } else {
      throw Error("Pius not Found");
    }
  }
}

export default GetPiuAll;
