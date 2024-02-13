import Piu from "../../models/Piu";
import PiuRepository from "../../repository/PiuRepository";

interface Request {
  idPiu: string;
  newText: string;
}

class UpdatePiu {
  private piuRepository: PiuRepository;

  constructor(piuRepository: PiuRepository) {
    this.piuRepository = piuRepository;
  }

  public execute({ idPiu, newText }: Request): Piu | null {
    // Verificar se o ID do piu e o novo texto não são nulos
    if (!idPiu || !newText) {
      throw new Error("ID of the Piu and new text must be provided.");
    }

    // Verificar se o piu com o ID fornecido existe
    const piuToUpdate = this.piuRepository.getPiuById(idPiu);
    if (!piuToUpdate) {
      throw new Error("Piu not found.");
    }

    // Atualizar o piu com o novo texto
    const updatedPiu = this.piuRepository.updatePiu(idPiu, newText);

    return updatedPiu;
  }
}

export default UpdatePiu;
