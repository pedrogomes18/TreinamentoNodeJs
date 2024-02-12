import { v4 as uuidv4 } from "uuid";

class User {
  id: string;
  name: string;
  dataBirth: Date;
  cpf: string;
  telephone: string;
  created_at: Date;
  update_at: string;

  constructor({
    name,
    dataBirth,
    cpf,
    telephone,
    created_at,
    update_at,
  }: Omit<User, "id">) {
    this.id = uuidv4();
    this.name = name;
    this.dataBirth = dataBirth;
    this.cpf = cpf;
    this.telephone = telephone;
    this.created_at = created_at;
    this.update_at = update_at;
  }
}

export default User;
