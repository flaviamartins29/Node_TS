import { Router, request, response } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
const appointmentsRouter = Router();
//DTO DATA TRANSFER OJECT
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/',(request, response)=>{
  const appointments = appointmentsRepository.all();
  return response.json(appointments)
})

// SOC SEPARATION OF CONCERNS // SEPARAÇAO DE PREOCUPAÇÃO

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentsInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointments is already booked' });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;
