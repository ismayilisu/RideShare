
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from '../assets/Project_01.svg';
import dayjs from 'dayjs'
const RideComponent = ({ prop }) => {
  const [login, setLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    //basic authentication no much though given
    if (token) {
      setLogin(true);
    }
  }, []);

  const navigate = useNavigate();
  const [date,setdate]=useState('')
  const handleBooking = () => {
    if (login) {
      navigate('/getdet', { state: { ride: prop } });
    } else {
      setShowPopup(true); 
    }
  };

  return (
    <div className="flex flex-col rounded-t-2xl bg-gray-600 font-mono text-2xl relative">
      <div className="h-30 w-full rounded-t-xl p-2 flex flex-row font-bold text-lg items-center bg-gray-400">
        <div className="flex flex-col items-center justify-center flex-1">
          <h6>{prop.fvicinity}</h6>
        </div>

        <div className="flex flex-row items-center justify-around bg-amber-300 flex-1 rounded-2xl p-2 bg-white">
          <div className="flex flex-col items-center">
          <h2>{dayjs(prop.date).format('YYYY-MM-DD')}</h2>

            <h2>{prop.time}</h2>
          </div>
          <img src={img} className="w-10 h-auto" />
          <div className="flex flex-col items-center">
            <h2>{`Rem.seats: ${prop.av_seat}/${(prop.paid+prop.av_seat)}`}</h2>
            <h2>{`Fare: ₹${((prop.tot_fare-(prop.paid*(prop.tot_fare/(prop.av_seat+prop.paid))))/prop.av_seat).toFixed(1)}/pp`}</h2>
          </div>
        </div>
        {/* (prop.tot_fare-(prop.paid*(prop.tot_fare/(prop.av_seat+prop.paid))))/prop.av_seat */}

        <div className="flex flex-col items-center justify-center flex-1">
          <h3>{prop.tvicinity}</h3>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <button
          className="text-black p-2 hover:cursor-pointer w-full"
          onClick={handleBooking}
        >
          Book Now
        </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-900  backdrop-blur-3xl opacity-100 flex items-center justify-center z-50">
          <div className="  bg-white p-6 rounded-xl shadow-lg text-center w-80 flex items-center flex-col gap-2">
            <h2 className="text-xl font-semibold ">Please login to continue</h2>
            <button
              onClick={() => navigate('/LoginPage')}
              className="bg-black text-white px-4 py-2 rounded-xl"
            >
              Login
            </button>
            <div>
              <button
                className=" text-sm text-gray-600 underline"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default RideComponent;
