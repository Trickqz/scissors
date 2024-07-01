import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ptBR } from "date-fns/locale";
import { AlertCircle, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Scissors from '/scissors.svg';
import Iconinput from '/input.svg';
import React from "react";

interface Appointment {
    date: Date;
    time: string;
    name: string;
}

interface ScheduleProps {
    onAddAppointment: (appointment: Appointment) => void;
}

export default function Schedule({ onAddAppointment }: ScheduleProps) {
    const [date, setDate] = React.useState<Date>();
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [clientName, setClientName] = useState<string>("");
    const [disabledTimes, setDisabledTimes] = useState<string[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const toggleSelect = (time: string) => {
        setSelectedTime(prevTime => prevTime === time ? null : time);
    };

    const handleSchedule = () => {
        if (selectedTime && clientName && date) {
            setDisabledTimes([...disabledTimes, selectedTime]);
            onAddAppointment({ date, time: selectedTime, name: clientName });
            setSelectedTime(null);
            setClientName("");
        } else {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
        }
    };

    const timeSlots = ["09:00", "10:00", "11:00", "12:00"];
    const timeSlots2 = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
    const timeSlots3 = ["19:00", "20:00", "21:00"];

    return (
        <div className="w-[498px] flex justify-center h-full bg-[#232225]">
            <div className='w-[338px] mt-[90px]'>
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold text-gray-100'>Agende um atendimento</h1>
                    <p className='text-sm text-[#98959D]'>Selecione data, horário e informe o nome do cliente para criar o agendamento</p>
                </div>
                <div className='flex flex-col mt-[24px]'>
                    <h1 className='text-[#B2AFB6] font-bold text-base'>Data</h1>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full h-[48px] mt-[8px] justify-start text-left text-base border-[#3E3C41] hover:bg-inherit hover:border-[#846F2E] bg-inherit text-[#B2AFB6] hover:text-[#B2AFB6] border font-medium",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 text-[#B8952E]" />
                                {date ? format(date, "PPP", { locale: ptBR }) : <span className="text-[#B2AFB6]">Escolha uma data</span>}</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[#2E2C30] text-white border border-[#3E3C41]">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="mt-[32px]">
                    <h1 className='text-[#B2AFB6] font-bold text-base'>Horários</h1>
                    <div className="mt-[8px]">
                        <p className="text-[#98959D] text-sm font-medium">Manhã</p>
                        <div className="flex gap-[8px] mt-[8px]">
                            {timeSlots.map((timeSlot, index) => (
                                <Button
                                    key={index}
                                    onClick={() => toggleSelect(timeSlot)}
                                    disabled={disabledTimes.includes(timeSlot)}
                                    className={cn(
                                        "hover:bg-[#3E3C41] w-[78.5px] text-base h-10 transition-colors duration-300",
                                        selectedTime === timeSlot ? "bg-[#2E2C30] text-[#B8952E] border border-[#B8952E]" : "bg-[#2E2C30] text-[#B2AFB6] border border-[#3E3C41]"
                                    )}
                                >
                                    {timeSlot}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-[12px]">
                        <p className="text-[#98959D] text-sm font-medium">Tarde</p>
                        <div className="gap-[8px] mt-[8px] grid grid-cols-4">
                            {timeSlots2.map((timeSlot2, index2) => (
                                <Button
                                    key={index2}
                                    onClick={() => toggleSelect(timeSlot2)}
                                    disabled={disabledTimes.includes(timeSlot2)}
                                    className={cn(
                                        "hover:bg-[#3E3C41] w-[78.5px] text-base h-10 transition-colors duration-300",
                                        selectedTime === timeSlot2 ? "bg-[#2E2C30] text-[#B8952E] border border-[#B8952E]" : "bg-[#2E2C30] text-[#B2AFB6] border border-[#3E3C41]"
                                    )}
                                >
                                    {timeSlot2}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-[12px]">
                        <p className="text-[#98959D] text-sm font-medium">Noite</p>
                        <div className="gap-[8px] mt-[8px] grid grid-cols-4">
                            {timeSlots3.map((timeSlot3, index3) => (
                                <Button
                                    key={index3}
                                    onClick={() => toggleSelect(timeSlot3)}
                                    disabled={disabledTimes.includes(timeSlot3)}
                                    className={cn(
                                        "hover:bg-[#3E3C41] w-[78.5px] text-base h-10 transition-colors duration-300",
                                        selectedTime === timeSlot3 ? "bg-[#2E2C30] text-[#B8952E] border border-[#B8952E]" : "bg-[#2E2C30] text-[#B2AFB6] border border-[#3E3C41]"
                                    )}
                                >
                                    {timeSlot3}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-[32px]">
                        <h1 className="text-[#B2AFB6] font-bold text-base">Cliente</h1>
                        <div className="relative">
                            <Input
                                className="bg-inherit focus:border-[#846F2E] text-base font-medium duration-300 hover:border-[#846F2E] border text-[#B2AFB6] h-[48px] border-[#3E3C41] pl-10"
                                placeholder="Nome do cliente"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                            />
                            <img className="absolute left-3 top-1/2 transform -translate-y-1/2" src={Iconinput} alt="" />
                        </div>
                    </div>
                    <Button
                        onClick={handleSchedule}
                        className="w-full mt-[28px] bg-[#B8952E] text-[#050505] font-semibold hover:bg-[#B8952E] hover:border-2 border-[#DBC170] text-lg h-[56px]"
                    >
                        Agendar
                    </Button>
                </div>
            </div>
            <div className="absolute w-[139px] h-[56px] rounded-br-xl flex justify-center items-center bg-[#2E2C30] top-0 left-0">
                <h1 className="text-[#B8952E] font-medium text-xl">HairDay</h1>
                <img className='absolute top-[8px] right-3' src={Scissors} alt="" />
            </div>
            <div className="absolute bottom-10 right-10">
            <AnimatePresence>
                {showAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }} >
                        <Alert variant="destructive" className="text-[#98959D] border-[#3E3C41] ">
                            <AlertCircle color="#98959D" className="h-5 w-5" />
                            <AlertTitle className="text-white">Informações Inválidas</AlertTitle>
                            <AlertDescription className="w-[400px]"> Por favor, preencha todos os campos para agendar um atendimento.</AlertDescription>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>
            </div>
        </div>
    );
}