import { useNavigate } from "react-router-dom";
import UpcomingWorks from "../components/upcoming-work/upcoming-worklist";
const UpcomingWorkPage = () => {
  const navigate = useNavigate();
  return (
    <div className="m-4 p-5 bg-gray-100 rounded-xl shadow-xl">
      <div className="flex items-center justify-between border-b-2 border-b-gray-300 mb-4">
        <header className="sm:text-md 2xl:text-lg font-semibold px-0 flex gap-2 items-center h-10 mt-2">
          <div className="bg-[var(--primary-gold)] px-[3px] py-[10px] max-h-5"></div>
          <h1 className="text-black/80 page-title text-[16px] xl:text-[18px] 2xl:text-[18px] font-semibold">
            UPCOMING WORKS MANAGEMENT
          </h1>
        </header>
      </div>
      <div>
        <UpcomingWorks/>
      </div>
    </div>
  );
};

export default UpcomingWorkPage;
