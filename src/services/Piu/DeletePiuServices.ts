import PiuRepository from "../../repository/PiuRepository";

class DeletePiu {
  private piuRepository: PiuRepository;

  constructor(piuRepository: PiuRepository) {
    this.piuRepository = piuRepository;
  }

  public execute(idPiu: string): boolean {
    const isDeleted = this.piuRepository.deletePiu(idPiu);

    if (!isDeleted) {
      throw new Error("Piu not found.");
    }

    return true;
  }
}

export default DeletePiu;
