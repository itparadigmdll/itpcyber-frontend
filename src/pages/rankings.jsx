export default function Rankings() {
  return (
    <div className="h-dvh w-dvw p-2">
      <header className="flex flex-row justify-between w-full">
        <button className="text-[1.15rem] text-bold bg-[#0F1729] text-white px-2 py-1 rounded-lg">
          ⟵ Back
        </button>
        <div>
          <span>Guess</span>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center h-full w-full gap-2">
        <h1 className="text-[2rem] font-bold">List of top scorers</h1>
        <div className="flex flex-col mt-2 shadow-md shadow-slate-400 rounded w-1/2 h-1/2 gap-2 p-2"></div>
      </div>
    </div>
  );
}
