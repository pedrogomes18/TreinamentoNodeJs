import Piu from "../models/Piu";

interface CreatePiuDTO {
  idUser: string;
  text: string;
  created_at: Date;
  update_at: string;
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
    const piu = new Piu({ idUser, text, created_at, update_at });

    this.pius.push(piu);
    return piu;
  }
}
