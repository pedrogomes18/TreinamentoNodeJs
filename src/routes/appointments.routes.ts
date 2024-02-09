import { Router } from "express";
import AppointmentsRepository from "../repository/AppointmentsRepository";
import { parseISO } from "date-fns";
import CreateAppointmentServices from "../services/CreateAppointmentServices";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

//Get
appointmentsRouter.get("/", (request, response) => {
  const appointment = appointmentsRepository.all();
  return response.json(appointment);
});

//Post
appointmentsRouter.post("/", (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentServices(
      appointmentsRepository
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
