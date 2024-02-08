import { v4 as uuidv4 } from "uuid";
import { Router } from "express";
import { startOfHour, parseISO } from "date-fns";

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointment = {
    id: uuidv4(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);
  return response.json(appointment);
});

export default appointmentsRouter;
