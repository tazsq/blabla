import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import calender from "../assets/calender.png";
import circle from "../assets/circle.png";
import userpng from "../assets/user.png";
import { AuthContext } from "../contexts/AuthContext";
import "../css/FindaRide.css";
import ErrorMessage from "./ErrorMessage";
import FormInput from "./FormInput";
import { addDays } from "date-fns/addDays";
import axiosInstance from "../services/api";
function FindaRide() {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengersRequired: "",
  });
  const { user, setUser, handleLogout } = useContext(AuthContext);
  const [date, setDate] = useState(new Date(new Date().getFullYear(), 1, 12));
  const [currentMonth, setCurrentMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const formD = z.object({
    from: z.string(),
    to: z.string(),
    date: z.date(),
    passengersRequired: z.number().min(1).max(8),
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "passengersRequired" && (value > 8 || value < 1)) {
      toast.error(
        "Passengers should be less than equal to 8 and greater than 0",
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.from ||
        !formData.to ||
        formData.passengersRequired > 8 ||
        formData.passengersRequired < 1
      ) {
        toast.error("Enter valid fields");
        return;
      }
      const searchParams = new URLSearchParams();
      searchParams.append("from", formData.from.toLowerCase());
      searchParams.append("to", formData.to.toLowerCase());
      searchParams.append("date", formData.date);
      searchParams.append("passengersRequired", formData.passengersRequired);
      // searchParams.append("filter", filter[0]);
      console.log(user.accessToken, user, "user token--");
      const resp = await axiosInstance.get(
        `/api/routes/?${searchParams.toString()}`,
      );
      console.log(resp.status);
      if (resp.status === 401) {
        toast.error("Login expired!");
        return;
      } else if (resp.status === 400) {
        toast.error("userId missing");
        return;
      }
      if (resp.data.length === 0) {
        toast.error("you are out of luck :( No routes found");
        return;
      }
      setRides(resp.data);
      console.log(resp.data);
      navigate("/rides", {
        state: { ridesUpper: resp.data },
      });
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center ">
      {/* Header */}
      <div className="flex justify-center ">
        <h1 className="px-5 py-5 text-3xl font-semibold">Find a ride</h1>
      </div>

      {/* Form Container */}
      <div className="flex justify-center w-full">
        <form
          className="
        flex w-full max-w-[100vw]
        overflow-hidden rounded-2xl
        bg-white/85 backdrop-blur-xl
        shadow-[0_10px_30px_rgba(0,0,0,0.12)]
        max-md:flex-col
        mx-4
        md:max-w-[75vw]
      "
        >
          <FormInput
            icon={circle}
            type="text"
            name="from"
            placeholder="Leaving from"
            value={formData.from}
            handleChange={handleChange}
            required
          />

          <hr className="h-0.5 w-full border-border md:h-full md:w-0.5 md:bg-border" />

          <FormInput
            icon={circle}
            type="text"
            name="to"
            placeholder="Going to"
            value={formData.to}
            handleChange={handleChange}
            required
          />

          <hr className="h-0.5 w-full border-border md:h-full md:w-0.5 md:bg-border" />

          <FormInput
            icon={calender}
            type="date"
            name="date"
            value={formData.date}
            handleChange={handleChange}
          />

          <hr className="h-0.5 w-full border-border md:h-full md:w-0.5 md:bg-border" />

          <FormInput
            icon={userpng}
            type="number"
            name="passengersRequired"
            placeholder="1 passenger"
            max="8"
            value={formData.passengersRequired}
            handleChange={handleChange}
          />

          {/* Submit */}
          <div className="flex w-full md:w-auto">
            <button
              type="submit"
              onClick={handleSubmit}
              className="
            flex h-14 w-full items-center justify-center
            bg-sky-500 text-white font-medium
            transition-colors duration-200
            hover:bg-sky-600
            md:w-[200px]
            md:h-full
            md:rounded-none
            rounded-b-xl
          "
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <Card className="mx-auto w-fit max-w-[300px]" size="sm">
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            fixedWeeks
            className="p-4 [--cell-size:--spacing(9.5)] w-full"
          />
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 border-t">
          {[
            { label: "Today", value: 0 },
            { label: "Tomorrow", value: 1 },
            { label: "In 3 days", value: 3 },
            { label: "In a week", value: 7 },
            { label: "In 2 weeks", value: 14 },
          ].map((preset) => (
            <Button
              key={preset.value}
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => {
                const newDate = addDays(new Date(), preset.value);
                setDate(newDate);
                setCurrentMonth(
                  new Date(newDate.getFullYear(), newDate.getMonth(), 1),
                );
              }}
            >
              {preset.label}
            </Button>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
}

export default FindaRide;
