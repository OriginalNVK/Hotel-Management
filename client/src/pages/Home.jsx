import { heroHome, headquarter, company1, company2, company3, company4, company5 } from "../assets";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/bookings");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#FFBD71] to-[#FFDCA2] overflow-x-hidden">
      {/* Hero Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full px-4 sm:px-8 lg:px-20 xl:px-32 bg-gradient-to-b from-[#FFDCA2] to-[#FF7A7B] py-8 sm:py-10 shadow-lg gap-8">
        <div className="flex flex-col font-play w-full lg:w-auto">
          <p className="text-[#CA2626] text-3xl sm:text-4xl lg:text-5xl font-bold text-center lg:text-left">GOLDEN HOTEL</p>
          <p className="text-lg sm:text-2xl text-white text-center lg:text-left">Book a dream, stay a luxury</p>

          <form className="flex flex-col items-center justify-center bg-[#FFBD71] p-4 sm:p-6 rounded-lg shadow-lg mt-6 sm:mt-10 w-full sm:max-w-[460px]">
            <p className="text-2xl sm:text-4xl font-bold text-[#82730E] mb-4">Reservation</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 gap-4 sm:gap-6 w-full">
              <div className="flex flex-col w-full">
                <label htmlFor="check-in" className="font-play text-xl">Check-in</label> <br />
                <input type="date" id="check-in" className="border p-2 rounded-lg w-full"/>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="check-out" className="font-play text-xl">Check-out</label> <br />
                <input type="date" id="check-out" className="border p-2 rounded-lg w-full"/>
              </div>
            </div>
            <Button text="Book" color="red" onClick={handleBook} />
          </form>
        </div>
        <img src={heroHome} alt="Hero Home" className="w-[240px] sm:w-[360px] lg:w-[500px] object-contain" />
      </div>

      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 sm:px-8 lg:px-20 xl:px-32 py-8 sm:py-12 gap-8">
        <div className="flex flex-col font-play font-bold w-full lg:w-auto">
          <div className="relative">
            <p className="text-2xl sm:text-4xl text-[#82730E] absolute top-[-38px] sm:top-[-50px] left-0 z-20">GOLDEN HOTEL</p>
            <p className="text-5xl sm:text-8xl opacity-25 text-[#EEE9E9] absolute top-[-58px] sm:top-[-80px] left-0 z-10">WELCOME</p>
          </div>
          <div className="flex gap-2 mt-10 text-lg sm:text-2xl">
            <p className="text-white">120K+</p>
            <p className="text-[#FF7A7B]">users have used our services</p>
          </div>
          <div className="flex gap-2 mt-6 sm:mt-10 text-lg sm:text-2xl">
            <p className="text-white">40+</p>
            <p className="text-[#FF7A7B]">domestic and foreign branches</p>
          </div>
          <div className="flex gap-2 mt-6 sm:mt-10 text-lg sm:text-2xl">
            <p className="text-white">60+</p>
            <p className="text-[#FF7A7B]">countries in the world</p>
          </div>
        </div>
        <img src={headquarter} alt="Headquarter" className="w-[220px] sm:w-[300px] object-contain" />
      </div>

      {/* Guideline Section */}
      <div className="flex flex-col bg-[#E5D4AA] w-[92%] lg:w-3/4 items-center justify-center shadow-lg p-4 sm:p-6 rounded-lg">
        <p className="text-2xl sm:text-4xl text-[#82730E] font-play font-bold mb-4">GUIDELINE</p>
        {/* Video guideline placeholder */}
        <div className="w-full h-40 sm:h-48 bg-gray-300 flex items-center justify-center rounded-lg">
          <p className="text-gray-600 text-sm sm:text-base">Video guideline coming soon...</p>
        </div>
      </div>

      {/* Collaborating Companies Section */}
      <div className="flex flex-col items-center justify-center mt-10 font-play font-bold my-4 w-full px-4">
        <p className="text-2xl sm:text-4xl text-[#82730E] mb-6 text-center">COLLABORATE COMPANIES</p>
        <div className="relative w-full sm:w-[90%] lg:w-1/2 overflow-hidden bg-white p-4 rounded-lg shadow-lg over-hidden">
          <div className="flex gap-4 items-center justify-start w-max animate-scroll">
            <img src={company1} alt="Company 1" width={120} className="sm:w-[150px]"/>
            <img src={company2} alt="Company 2" width={120} className="sm:w-[150px]"/>
            <img src={company3} alt="Company 3" width={120} className="sm:w-[150px]"/>
            <img src={company4} alt="Company 4" width={120} className="sm:w-[150px]"/>
            <img src={company5} alt="Company 5" className="opacity-20 sm:w-[150px]" width={120}/>
            {/* Duplicate Images for Smooth Loop */}
            <img src={company1} alt="Company 1" width={120} className="sm:w-[150px]"/>
            <img src={company2} alt="Company 2" width={120} className="sm:w-[150px]"/>
            <img src={company3} alt="Company 3" width={120} className="sm:w-[150px]"/>
            <img src={company4} alt="Company 4" width={120} className="sm:w-[150px]"/>
            <img src={company5} alt="Company 5" className="opacity-20 sm:w-[150px]" width={120}/>
          </div>
        </div>
        <style>{`
          .animate-scroll {
            display: flex;
            animation: scroll 10s linear infinite;
          }

          @keyframes scroll {
             0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Home;
