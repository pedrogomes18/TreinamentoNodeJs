import User from "../models/User";
import UserRepository from "../repository/UserRepository";

interface Request {
  name: string;
  dataBirth: Date;
  cpf: string;
  telephone: string;
}

class CreateUserServices {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public execute({ name, dataBirth, cpf, telephone }: Request): User {
    const currentTime = new Date();

    const findAppointmentInSameDate = this.userRepository.findByUserCpf(cpf);

    if (findAppointmentInSameDate) {
      throw Error("This Appointment is already booked");
    }

    const user = this.userRepository.create({
      name,
      dataBirth,
      cpf,
      telephone,
      created_at: currentTime,
      update_at: currentTime,
    });

    return user;
  }
}

export default CreateUserServices;
