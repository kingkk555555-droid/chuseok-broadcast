"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const clips = [
  { title: "올해의 웃긴 순간", duration: "03:12", url: "#" },
  { title: "잉친이들이 뽑은 레전드", duration: "04:05", url: "#" },
  { title: "올해 가장 기억에 남은 방송", duration: "05:21", url: "#" },
  { title: "게임하다가 터진 순간", duration: "02:34", url: "#" },
  { title: "뜻밖의 명장면 모음", duration: "03:47", url: "#" },
  { title: "다시 봐도 웃긴 장면", duration: "04:16", url: "#" },
];

const links = [
  { icon: "▶", title: "유튜브", desc: "다시보기 & 영상 보러가기", href: "#" },
  { icon: "LIVE", title: "SOOP", desc: "방송 보러가기", href: "#" },
  { icon: "▣", title: "팬카페", desc: "잉친이들 이야기", href: "#" },
  { icon: "♡", title: "클립 모음", desc: "기억하고 싶은 순간들", href: "#" },
  { icon: "✦", title: "갤러리", desc: "사진 & 팬아트", href: "#" },
];

const anniversarySources = [
  { title: "방송 9주년", month: 10, day: 16, icon: "🎙️" },
  { title: "우정잉 생일", month: 12, day: 9, icon: "🎂" },
];

type Message = {
  id: number;
  name: string;
  text: string;
  createdAt: string;
};

const SITE_CLOSED = true;

function getNextDate(month: number, day: number) {
  const now = new Date();
  const year = now.getFullYear();
  const candidate = new Date(year, month - 1, day);
  if (candidate.getTime() < new Date(year, now.getMonth(), now.getDate()).getTime()) {
    return new Date(year + 1, month - 1, day);
  }
  return candidate;
}

function formatDate(date: Date) {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function getDDay(date: Date) {
  const today = new Date();
  const a = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const b = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const days = Math.ceil((b - a) / 86400000);
  return days === 0 ? "D-DAY" : `D-${days}`;
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [showAllMessages, setShowAllMessages] = useState(false);

  const anniversaries = useMemo(
    () =>
      anniversarySources
        .map((item) => ({ ...item, date: getNextDate(item.month, item.day) }))
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    [],
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ujing-9th-messages");
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      // localStorage를 사용할 수 없는 환경에서는 빈 목록으로 시작합니다.
    }
  }, []);

  const saveMessages = (next: Message[]) => {
    setMessages(next);
    try {
      localStorage.setItem("ujing-9th-messages", JSON.stringify(next));
    } catch {
      // 저장이 불가능한 환경에서도 현재 화면에서는 계속 사용할 수 있습니다.
    }
  };

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanText = text.trim();
    if (!cleanName || !cleanText) return;

    const next: Message = {
      id: Date.now(),
      name: cleanName.slice(0, 20),
      text: cleanText.slice(0, 200),
      createdAt: new Date().toISOString(),
    };

    saveMessages([next, ...messages]);
    setName("");
    setText("");
  };

  const visibleMessages = showAllMessages ? messages : messages.slice(0, 6);

  if (SITE_CLOSED) {
    return (
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#faf7fb] px-6 text-[#302934]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(205,164,220,0.18),transparent_42%)]" />

        <section className="relative z-10 flex w-full max-w-md flex-col items-center rounded-[32px] border border-[#eadfea] bg-white/90 px-8 py-12 text-center shadow-[0_24px_80px_rgba(95,65,105,0.10)] backdrop-blur">
          <div className="relative mb-7 flex h-28 w-28 items-end justify-center">
            <div className="absolute top-1 h-16 w-14 rounded-t-full border-[9px] border-b-0 border-[#8f6a98]" />
            <div className="relative z-10 flex h-20 w-24 items-center justify-center rounded-[22px] bg-[#9d75a6] shadow-lg">
              <div className="h-7 w-5 rounded-full bg-[#f7eff9]" />
              <div className="absolute bottom-4 h-3 w-3 rounded-full bg-[#9d75a6]" />
            </div>
          </div>

          <p className="mb-3 text-xs font-bold tracking-[0.28em] text-[#a781ad]">TEMPORARILY CLOSED</p>
          <h1 className="text-3xl font-black tracking-tight">사이트 임시 폐쇄</h1>
          <p className="mt-4 text-sm leading-7 text-[#837985]">
            사용하지않아 닫아두었습니다.
            <br />
            필요할 때 다시 열어둘게요.
          </p>

          <div className="mt-7 rounded-full bg-[#f6edf8] px-4 py-2 text-xs font-semibold text-[#98729f]">
            (사용성없음)
          </div>

          <p className="mt-8 text-[11px] text-[#b0a5b2]">
            우정잉 랜덤토크추천기
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcf9ff] text-[#27232d]">
      <header className="sticky top-0 z-40 border-b border-[#eee4f5]/90 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3 font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5e7fb] text-lg">🐰</span>
            <span>우정잉 9주년 팬페이지</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#6c6475] sm:flex">
            <a href="#clips" className="transition hover:text-[#a24bbf]">클립 모음</a>
            <a href="#messages" className="transition hover:text-[#a24bbf]">축하 메시지</a>
            <a href="#anniversary" className="transition hover:text-[#a24bbf]">기념일</a>
            <a href="#links" className="transition hover:text-[#a24bbf]">주요 링크</a>
          </nav>
          <span className="text-xl text-[#a24bbf]">♡</span>
        </div>
      </header>

      <section id="top" className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[30px] border border-white bg-white shadow-[0_18px_60px_rgba(119,76,145,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center bg-gradient-to-br from-[#fff8ff] via-white to-[#f4edff] p-7 sm:p-10 lg:p-12">
            <div className="mb-4 inline-flex w-fit rounded-full bg-[#f0dff7] px-4 py-2 text-xs font-bold text-[#73417e]">
              2017.10.16 — NOW
            </div>
            <h1 className="text-4xl font-black tracking-tight text-[#33243a] sm:text-5xl">
              우정잉 9주년
              <br />
              <span className="text-[#a24bbf]">팬페이지</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#75657c] sm:text-base">
              지금까지 함께 웃었던 순간들을 모아두는 작은 공간.
              <br />
              올해의 클립과 잉친이들의 이야기를 남겨보세요.
            </p>
          </div>

          <div className="relative flex items-center justify-center bg-[#17131b] p-3 sm:p-5 lg:p-6">
            <img
              src="/9th-title.png"
              alt="시네트 같이보기 분위기의 우정잉 9주년 팬페이지 이미지"
              className="block h-auto w-full max-w-[667px] rounded-[22px] object-contain"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside id="anniversary" className="rounded-[26px] border border-[#eadcf1] bg-gradient-to-b from-[#fff8ff] to-[#f8f1ff] p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <span className="text-xl">🎂</span>
            <h2 className="text-lg font-extrabold">다가오는 기념일</h2>
          </div>
          <div className="space-y-3">
            {anniversaries.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#ead8f2] bg-white/80 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold">{item.icon} {item.title}</div>
                    <div className="mt-1 text-xs text-[#81788a]">{formatDate(item.date)}</div>
                  </div>
                  <span className="rounded-full bg-[#f0d9f6] px-3 py-1 text-xs font-black text-[#9346aa]">
                    {getDDay(item.date)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-white/60 p-4 text-center text-sm leading-6 text-[#81788a]">
            지금까지의 시간도,<br />앞으로의 시간도 천천히 기록해두기
          </div>
        </aside>

        <section id="clips" className="rounded-[26px] border border-[#e9e2ed] bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f1e2f7] text-[#9346aa]">▶</span>
                <h2 className="text-xl font-extrabold">올해의 클립 모음</h2>
              </div>
              <p className="mt-2 text-sm text-[#8a8290]">올 한 해 잉친이들이 기억하고 싶은 순간들</p>
            </div>
            <span className="hidden text-sm font-semibold text-[#9b61ad] sm:block">전체보기 →</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {clips.map((clip, index) => (
              <a
                key={clip.title}
                href={clip.url}
                className="group overflow-hidden rounded-2xl border border-[#eee7f1] bg-[#faf8fb] transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#ead7f1] via-[#f6edf9] to-[#ddd1e8]">
                  <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-30 transition group-hover:scale-110">
                    {index % 2 === 0 ? "🐰" : "♡"}
                  </div>
                  <span className="absolute bottom-2 right-2 rounded-md bg-black/75 px-2 py-1 text-[11px] font-bold text-white">
                    {clip.duration}
                  </span>
                  <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold text-[#754583]">
                    올해의 클립
                  </span>
                </div>
                <div className="p-3.5">
                  <h3 className="line-clamp-1 text-sm font-bold">{clip.title}</h3>
                  <p className="mt-1 text-xs text-[#99919f]">영상 링크를 나중에 넣어주세요</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </section>

      <section id="messages" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-[#eadff0] bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💌</span>
                <h2 className="text-xl font-extrabold">9주년 축하 메시지</h2>
              </div>
              <p className="mt-2 text-sm text-[#8a8290]">잉친이들이 남기는 한마디를 기록해보세요.</p>
            </div>
            <span className="text-xs text-[#a096a8]">현재 {messages.length}개의 메시지</span>
          </div>

          <form onSubmit={submitMessage} className="rounded-2xl bg-[#faf6fc] p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-[180px_1fr_auto]">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                placeholder="닉네임"
                className="h-12 rounded-xl border border-[#e7dceb] bg-white px-4 text-sm outline-none transition focus:border-[#b766c9] focus:ring-4 focus:ring-[#b766c9]/10"
              />
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={200}
                placeholder="우정잉에게 전하고 싶은 말을 남겨주세요"
                className="h-12 rounded-xl border border-[#e7dceb] bg-white px-4 text-sm outline-none transition focus:border-[#b766c9] focus:ring-4 focus:ring-[#b766c9]/10"
              />
              <button
                type="submit"
                className="h-12 rounded-xl bg-[#9d55b1] px-6 text-sm font-bold text-white transition hover:bg-[#88469b] active:scale-[0.98]"
              >
                메시지 남기기
              </button>
            </div>
          </form>

          {messages.length > 0 ? (
            <>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {visibleMessages.map((message) => (
                  <article key={message.id} className="rounded-2xl border border-[#eee5f1] bg-[#fffafd] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <strong className="text-sm">💜 {message.name}</strong>
                      <time className="text-[10px] text-[#aaa1ae]">
                        {new Date(message.createdAt).toLocaleDateString("ko-KR")}
                      </time>
                    </div>
                    <p className="mt-2 break-words text-sm leading-6 text-[#625968]">{message.text}</p>
                  </article>
                ))}
              </div>
              {messages.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowAllMessages((value) => !value)}
                  className="mx-auto mt-5 block rounded-full border border-[#decce5] px-5 py-2 text-xs font-bold text-[#8c559c] transition hover:bg-[#faf2fd]"
                >
                  {showAllMessages ? "접기" : `메시지 ${messages.length - 6}개 더 보기`}
                </button>
              )}
            </>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-[#dfd2e4] py-12 text-center text-sm text-[#9a919e]">
              첫 번째 축하 메시지를 남겨주세요 💜
            </div>
          )}
        </div>
      </section>

      <section id="links" className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xl">✦</span>
          <h2 className="text-lg font-extrabold">주요 링크</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="group rounded-2xl border border-[#e9e2ed] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#f5e7fa] px-2 text-xs font-black text-[#984dae]">
                  {link.icon}
                </span>
                <span className="text-[#b98ac4] transition group-hover:translate-x-1">→</span>
              </div>
              <h3 className="mt-4 font-extrabold">{link.title}</h3>
              <p className="mt-1 text-xs text-[#918893]">{link.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#eee5f1] bg-white py-8 text-center text-xs text-[#9a919e]">
        ♥ 우정잉과 함께한 시간들을 천천히 기록하는 팬페이지
      </footer>
    </main>
  );
}
