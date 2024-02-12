import { v4 as uuidv4 } from "uuid";

class Piu {
  id: string;
  idUser: string;
  text: string;
  created_at: Date;
  update_at: string;

  constructor({ idUser, text, created_at, update_at }: Omit<Piu, "id">) {
    this.id = uuidv4();
    this.idUser = idUser;
    this.text = text;
    this.created_at = created_at;
    this.update_at = update_at;
  }
}

export default Piu;
