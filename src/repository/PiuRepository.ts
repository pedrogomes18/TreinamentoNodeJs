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

  public deletePiu(idPiu: string): boolean {
    const index = this.pius.findIndex((piu) => piu.id === idPiu);
    if (index !== -1) {
      this.pius.splice(index, 1);
      return true; // Indicando que o Piu foi excluído com sucesso
    }
    return false; // Indicando que o Piu não foi encontrado para exclusão
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
}

export default PiuRepository;
