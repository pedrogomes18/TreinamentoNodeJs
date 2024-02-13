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

  // Pega todos os Users
  public allUser(): User[] {
    return this.users;
  }

  // Cria os users
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

  // Pega Usuários pelo ID
  public getUserById(idUser: string): User | null {
    const findUserById = this.users.find((user) => user.id === idUser);
    return findUserById || null;
  }

  // Pega usuários pelo CPF
  public findByUserCpf(cpf: string): User | null {
    const findUserByCpf = this.users.find((user) => user.cpf === cpf);
    return findUserByCpf || null;
  }

  // Atualiza um usuário
  public updateUser(
    idUser: string,
    newData: Partial<CreateUserDTO>
  ): User | null {
    const userToUpdate = this.getUserById(idUser);
    if (!userToUpdate) {
      return null;
    }

    const { created_at, ...updateData } = newData;

    const updatedUser = {
      ...userToUpdate,
      ...updateData,
      update_at: new Date(),
    };

    const index = this.users.findIndex((user) => user.id === idUser);
    this.users[index] = updatedUser;

    return updatedUser;
  }
}

export default UserRepository;
