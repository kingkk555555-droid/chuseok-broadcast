
export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080d18] px-6 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[100px]" />

      <section className="relative flex w-full max-w-md flex-col items-center text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-sky-300/20 bg-sky-400/5 shadow-lg shadow-sky-500/5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-sky-300"
          >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <circle cx="12" cy="15" r="1" />
            <path d="M12 16v2" />
          </svg>
        </div>

        <p className="mb-4 text-xs font-semibold tracking-[0.35em] text-sky-300">
          TEMPORARILY CLOSED
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          사이트 임시 폐쇄
        </h1>

        <div className="mt-6 h-px w-12 bg-sky-400/50" />

        <p className="mt-7 text-sm leading-8 text-slate-300">
          사용성이 부족하다고 판단되어
          <br />
          사이트를 임시 폐쇄하였습니다.
        </p>

        <p className="mt-2 text-sm leading-7 text-slate-500">
          추후 개선하여 다시 사용할 수 있게 된다면
          <br />
          재개할 예정입니다.
        </p>

        <div className="mt-12 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
          <span className="text-xs tracking-widest text-slate-500">
            SERVICE UNAVAILABLE
          </span>
        </div>

        <p className="mt-10 text-[10px] tracking-[0.3em] text-slate-700">
          TEMPORARY SUSPENSION
        </p>
      </section>
    </main>
  );
}