import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import calender from "../assets/calender.png";
import circle from "../assets/circle.png";
import userpng from "../assets/user.png";
import "../css/FindaRide.css";
import routeService from "../services/routeService";
import ErrorMessage from "./ErrorMessage";
import FormInput from "./FormInput";
import SuccessMsg from "./SuccessMsg";
function CreateaRide() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengerCapacity: "",
    startTime: "",
    endTime: "",
  });
  const [successmsg, setSuccessmsg] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setSuccessmsg("");
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "passengerCapacity" && (value > 8 || value < 1)) {
      setError("Passengers should be less than equal to 8 and greater than 0");
    } else {
      setError("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.date ||
        !formData.from ||
        formData.passengerCapacity > 8 ||
        formData.passengerCapacity < 1 ||
        !formData.to ||
        !formData.startTime ||
        !formData.endTime
      ) {
        setError("Enter all values");
        setSuccessmsg("");
        return;
      }
      if (!user) {
        console.log("cant be submitted. Login first bitch~");
        return;
      }
      const response = await routeService.create(formData, user.token);
      console.log(response);
      setSuccessmsg("Route created successfully");
    } catch (error) {
      if (error.status === 500)
        setError("Server not working~ Not your problem~!");
      else if (error.status === 401) {
        setError("Token expired, login again!");
        setSuccessmsg("");
      } else if (error.status === 400) {
        setError("UserId missing or not valid");
        setSuccessmsg("");
      } else {
        setError("somehow crashed");
        setSuccessmsg("");
      }
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center">
      {/* Header */}
      <div className="flex justify-center">
        <h1 className="px-5 py-5 text-2xl font-semibold">Create a ride</h1>
      </div>

      {/* Form container */}
      <div className="flex w-full justify-center">
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
          />

          <hr className="h-0.5 w-full border-border md:h-full md:w-0.5 md:bg-border" />

          <FormInput
            icon={circle}
            type="text"
            name="to"
            placeholder="Going to"
            value={formData.to}
            handleChange={handleChange}
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
            name="passengerCapacity"
            placeholder="1 passenger"
            max="8"
            value={formData.passengerCapacity}
            handleChange={handleChange}
          />

          {/* Submit */}
          <div className="flex w-full md:w-auto">
            <button
              type="submit"
              onClick={handleSubmit}
              className="
            flex h-14 w-full items-center justify-center
            bg-emerald-500 text-white font-medium
            transition-colors duration-200
            hover:bg-emerald-600
            md:w-[200px]
            md:h-full
            md:rounded-none
            rounded-b-xl
          "
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateaRide;
