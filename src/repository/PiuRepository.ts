import Piu from "../models/Piu";

interface CreatePiuDTO {
  idUser: string;
  text: string;
  created_at: Date;
  update_at: Date;
}

class PiuRepository {
  private pius: Piu[];

  constructor() {
    this.pius = [];
  }

  public allPiu(): Piu[] {
    return this.pius;
  }

  public create({ idUser, text, created_at, update_at }: CreatePiuDTO): Piu {
    const currentTime = new Date();
    const piu = new Piu({
      idUser,
      text,
      created_at: currentTime,
      update_at: currentTime,
    });

    this.pius.push(piu);
    return piu;
  }

  public getPiuById(idPiu: string): Piu | null {
    const findPiuById = this.pius.find((piu) => piu.id === idPiu);
    return findPiuById || null;
  }

  public updatePiu(idPiu: string, newText: string): Piu | null {
    const piuToUpdate = this.getPiuById(idPiu);
    if (!piuToUpdate) {
      return null;
    }

    const updatedPiu = {
      ...piuToUpdate,
      text: newText,
      update_at: new Date(),
    };

    const index = this.pius.findIndex((piu) => piu.id === idPiu);
    this.pius[index] = updatedPiu;

    return updatedPiu;
  }
}

export default PiuRepository;
