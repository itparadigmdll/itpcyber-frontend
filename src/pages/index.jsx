import { Link } from "react-router";
import LayoutFull from "../layout/base";

export default function Index() {
  return (
    <LayoutFull>
      <header className="flex flex-row justify-end w-full">
        <div>
          <span>Guess</span>
        </div>
      </header>
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div className="flex flex-col ">
          <h1 className="text-[2rem] text-center font-bold text-[#0F1729]">
            iTP CyberSec Team
          </h1>
          <h3 className="text-[1.25rem] text-center text-[#0F1729]">
            Scores: 0
          </h3>

          <div className="flex flex-col mt-2 shadow-md shadow-slate-400 w-full rounded p-6 gap-4">
            <Link
              to="achievements"
              className="text-[1.15rem] text-bold bg-[#0F1729] text-white px-2 py-1 rounded-md text-center"
            >
              Achievements
            </Link>
            <Link
              to="rankings"
              className="text-[1.15rem] text-bold bg-[#0F1729] text-white px-2 py-1 rounded-md text-center"
            >
              Rankings
            </Link>
          </div>
        </div>
      </div>
    </LayoutFull>
  );
}
