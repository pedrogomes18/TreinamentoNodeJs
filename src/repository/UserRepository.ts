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

  public allUser(): User[] {
    return this.users;
  }

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

  public findByUserCpf(cpf: string): User | null {
    const findUserById = this.users.find((user) => user.cpf === cpf);
    return findUserById || null;
  }
}

export default UserRepository;
