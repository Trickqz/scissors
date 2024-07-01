import Schedule from "./components/schedule";
import Tables from "./components/tables";
import { useState } from 'react';

interface Appointment {
  date: Date;
  time: string;
  name: string;
}

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (appointment: Appointment) => {
      setAppointments([...appointments, appointment]);
  };

  return (
    <div className="bg-[#19181B] w-full h-full flex items-center p-[12px]">
      <Schedule onAddAppointment={addAppointment} />
      <Tables appointments={appointments} />
    </div>
  )
}