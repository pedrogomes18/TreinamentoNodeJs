import { Router } from "express";
import AppointmentsRepository from "../repository/AppointmentsRepository";
import { startOfHour, parseISO } from "date-fns";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

//Get
appointmentsRouter.get("/", (request, response) => {
  const appointment = appointmentsRepository.all();
  return response.json(appointment);
});

//Post
appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate =
    appointmentsRepository.findByDate(parsedDate);

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: "This Appointment is already booked" });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
