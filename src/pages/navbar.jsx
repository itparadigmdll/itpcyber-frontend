      <header className="w-full px-8 py-4 flex items-center justify-between bg-slate-900 shadow-md">
        <h2 className="text-lg font-semibold text-white">
          iTP CyberSec
        </h2>

        <div
          onClick={() => setShowLogin(true)}
          className="flex items-center gap-3 cursor-pointer hover:bg-slate-800 hover:scale-105 transform px-3 py-2 rounded-full transition"
        >
          <User size={20} className="text-white" />
          <span className="text-sm font-medium text-white">Guest</span>
        </div>
      </header>