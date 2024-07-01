import IconDay from '/day.svg';
import IconAfternoon from '/afternoon.svg';
import IconNight from '/night.svg';
import DateIcon from '/datetable.svg';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface Appointment {
    date: Date;
    time: string;
    name: string;
}

interface TablesProps {
    appointments: Appointment[];
}

export default function Tables({ appointments }: TablesProps) {
    const renderAppointments = (period: string) => {
        return appointments
            .filter(appt => {
                const hour = parseInt(appt.time.split(":")[0], 10);
                if (period === "morning") return hour >= 9 && hour < 13;
                if (period === "afternoon") return hour >= 13 && hour < 19;
                if (period === "night") return hour >= 19 && hour <= 21;
                return false;
            })
            .map((appt, index) => (
                <div key={index} className="flex gap-5">
                    <h1 className="text-[#B2AFB6] text-lg font-semibold">{appt.time}</h1>
                    <h1 className="text-[#B2AFB6] text-lg font-light">{appt.name}</h1>
                </div>
            ));
    };

    return (
        <div className="ml-[12px] w-[1390px] h-full flex flex-col items-center">
            <div className="w-[682px]">
                <div className="w-full h-[56px] items-center mt-20 relative flex">
                    <div className="w-[518px]">
                        <h1 className="text-gray-100 text-2xl font-bold">Sua agenda</h1>
                        <p className="text-[#98959D] text-sm">Consulte os seus cortes de cabelo agendados por dia</p>
                    </div>
                    <Select>
                        <SelectTrigger className="w-[152px] h-[48px] hover:border-[#846F2E] outline-none text-base text-[#B2AFB6] absolute right-0 border border-[#3E3C41] bg-inherit">
                            <img src={DateIcon} className="w-[20px] h-[20px]" alt="" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2E2C30] border text-[#B2AFB6] border-[#3E3C41] ">
                            <SelectItem value="asd">24/05/2024</SelectItem>
                            <SelectItem value="s">23/05/2024</SelectItem>
                            <SelectItem value="asad">22/05/2024</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full mt-[32px]">
                    <div className="w-full min-h-[116px] border rounded-[8px] border-[#2E2C30]">
                        <div className="border-b border-[#2E2C30] relative w-full h-[44px] items-center flex">
                            <img className="ml-[20px] w-[20px] h-[20px]" src={IconDay} alt="" />
                            <h1 className="ml-[12px] text-[#98959D] text-base font-light">Manhã</h1>
                            <h1 className="absolute right-[20px] text-[#7A767F] text-base font-light">09h-12h</h1>
                        </div>
                        <div className="w-full p-5 flex flex-col gap-1">
                            {renderAppointments("morning")}
                        </div>
                    </div>
                    <div className="w-full min-h-[116px] mt-[12px] border rounded-[8px] border-[#2E2C30]">
                        <div className="border-b border-[#2E2C30] relative w-full h-[44px] items-center flex">
                            <img className="ml-[20px] w-[20px] h-[20px]" src={IconAfternoon} alt="" />
                            <h1 className="ml-[12px] text-[#98959D] text-base font-light">Tarde</h1>
                            <h1 className="absolute right-[20px] text-[#7A767F] text-base font-light">13h-18h</h1>
                        </div>
                        <div className="w-full p-5 flex flex-col gap-1">
                            {renderAppointments("afternoon")}
                        </div>
                    </div>
                    <div className="w-full min-h-[116px] mt-[12px] border rounded-[8px] border-[#2E2C30]">
                        <div className="border-b border-[#2E2C30] relative w-full h-[44px] items-center flex">
                            <img className="ml-[20px] w-[20px] h-[20px]" src={IconNight} alt="" />
                            <h1 className="ml-[12px] text-[#98959D] text-base font-light">Noite</h1>
                            <h1 className="absolute right-[20px] text-[#7A767F] text-base font-light">19h-21h</h1>
                        </div>
                        <div className="w-full p-5 flex flex-col gap-1">
                            {renderAppointments("night")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}