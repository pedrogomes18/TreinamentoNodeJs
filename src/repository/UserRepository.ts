import User from "../models/User";

interface CreateUserDTO {
  name: string;
  dataBirth: Date;
  cpf: string;
  telephone: string;
  created_at: Date;
  update_at: Date;
}

class UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }
  //Pega todos os Users
  public allUser(): User[] {
    return this.users;
  }

  //Cria os users
  public create({
    name,
    dataBirth,
    cpf,
    telephone,
    created_at,
    update_at,
  }: CreateUserDTO): User {
    const user = new User({
      name,
      dataBirth,
      cpf,
      telephone,
      created_at,
      update_at,
    });

    this.users.push(user);
    return user;
  }

  //Pega Usuários pelo ID
  public getUserById(idUser: string): User | null {
    const findUserById = this.users.find((user) => user.id === idUser);
    return findUserById || null;
  }

  //Pega usuários pelo CPF
  public findByUserCpf(cpf: string): User | null {
    const findUserByCpf = this.users.find((user) => user.cpf === cpf);
    return findUserByCpf || null;
  }
}

export default UserRepository;
