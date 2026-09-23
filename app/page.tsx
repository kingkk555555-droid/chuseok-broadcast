"use client";

import { useEffect, useRef, useState } from "react";

type Question = {
  id: number;
  emoji: string;
  question: string;
};

const questionTexts = [
  "플래티넘 찍을 수 있는 거 맞나요..?",
  "방송하면서 “아 오늘은 이거 하나 건졌다” 싶었던 순간이 있나요?",
  "방송을 켜기 전의 계획과 방송을 끈 뒤의 결과가 가장 크게 달랐던 날은 어떤 날이었나요?",
  "본인은 별거 아니라고 생각했는데 잉친이들이 유독 좋아했던 방송 장면이 있나요?",
  "방송 중에 본인이 한 말이 나중에 본인한테 돌아온 적이 있나요?",
  "방송을 오래 본 사람만 알아들을 수 있는 본인만의 신호가 있나요?",
  "방송 중에 잉친이들이 먼저 눈치채서 본인이 뒤늦게 알아챈 일이 있나요?",
  "방송을 하다 보니 어느 순간부터 자연스럽게 생긴 본인만의 규칙이 있나요?",
  "방송 중에는 아무렇지 않았는데 나중에 클립으로 보니까 웃겼던 순간이 있나요?",
  "방송을 하면서 “이래서 방송하는구나” 싶었던 순간이 있다면?",
  "방송하면서 “이래서 방송이 힘들구나” 싶었던 순간은?",
  "잉친이들이 본인보다 더 잘 알고 있는 본인의 특징이 있나요?",
  "본인 방송에서 사라지면 생각보다 많은 사람이 당황할 것 같은 요소는 뭔가요?",
  "방송하다가 본인도 모르게 “이건 이제 내 콘텐츠가 됐네” 싶어진 것이 있나요?",
  "지금까지 방송하면서 가장 황당하게 계획이 틀어진 날은 언제인가요?",
  "본인 영상 중 “이건 왜 사람들이 좋아했지?” 싶은 부분이 있나요?",
  "영상을 올리고 나면 본인도 모르게 제일 먼저 확인하는 게 뭔가요?",
  "유튜버가 되고 나서 평범한 하루를 보는 방식이 달라진 부분이 있나요?",
  "지금까지 찍은 영상 중 다시 찍는다면 가장 다르게 찍고 싶은 영상이 있나요?",
  "본인 채널을 처음 보는 사람에게 딱 하나만 보여줄 수 있다면 어떤 영상을 보여주고 싶나요?",
  "촬영할 때보다 편집할 때 “이걸 왜 찍었지?” 싶었던 적이 있나요?",
  "본인 영상에서 사람들이 잘 모르지만 본인은 은근히 마음에 드는 부분이 있나요?",
  "조회수와 상관없이 “이 영상은 남아 있어서 다행이다” 싶은 영상이 있나요?",
  "본인이 다른 사람의 유튜브를 운영한다면 본인 채널과 가장 다르게 해보고 싶은 부분은 뭔가요?",
  "유튜브를 안 했으면 지금도 전혀 몰랐을 것 같은 일이 있나요?",
  "본인이 영상을 만들면서 제일 많이 하는 “이거 할까 말까” 고민은 뭔가요?",
  "지금까지 방송한 모든 날 중 딱 하루만 다시 재생할 수 있다면, 어떤 날을 골라보고 싶으신가요?",
  "본인 방송을 처음 보는 사람이 3시간을 봤는데 질문을 딱 하나만 할 수 있다면 뭐라고 물어볼 것 같나요?",
  "방송하면서 한 말 중 본인은 기억도 안 나는데 잉친이들은 기억하고 있을 것 같은 말이 있나요?",
  "지금까지의 방송을 전부 알고 있는 사람이 본인에게만 물어볼 수 있는 질문은 뭐라고 생각하시나요?",
  "오늘 방송을 나중에 딱 한 장면으로 기억해야 한다면 어떤 장면을 남기고 싶으신가요?",
  "10년 뒤에 지금 방송을 다시 본다면 가장 먼저 머쓱할 것 같은 부분은 뭘까요?",
  "지금의 본인이 처음 방송하던 날로 돌아간다면 딱 한마디만 해줄 수 있다면 뭐라고 할 건가요?",
  "본인 방송을 처음부터 끝까지 본 사람만 받을 수 있는 가상의 자격증을 만든다면 이름이 뭘까요?",
  "방송에서 잉친이들이 은근히 기다리고 있는 순간을 하나 고른다면?",
  "본인 방송을 한 번도 안 본 사람에게 방송 내용을 설명했는데 절대 믿지 않을 것 같은 이야기가 있나요?",
  "지금까지 방송하면서 생긴 일 중 다시 생각해도 왜 그렇게 됐는지 이해가 안 되는 일이 있나요?",
  "방송 중 본인에게만 들리는 효과음이 하나 생긴다면 어떤 상황에 울렸으면 좋겠나요?",
  "본인 방송에 갑자기 해설자가 붙는다면 가장 자주 나올 멘트는 뭘까요?",
  "방송을 처음 보는 사람이 아무 설명 없이 한 시간 본다면 가장 먼저 “뭐지?” 할 장면은 뭘까요?",
  "본인도 모르게 방송에서만 나오는 이상한 행동이 하나 있다면?",
  "방송이 끝난 뒤에도 아직 방송 중인 것 같은 착각을 해본 적 있나요?",
  "본인의 방송에 자막 하나만 계속 띄울 수 있다면 어떤 자막을 고르실 건가요?",
  "본인 방송에서 하나의 장면만 무한 반복해서 보여준다면 가장 웃길 것 같은 장면은 뭘까요?",
  "방송 중 모든 소리가 갑자기 사라진다면 제일 먼저 뭘 하실 것 같나요?",
  "연애할 때 연락 잘 되는 사람 vs 만나면 재밌는 사람, 하나만 고른다면?",
  "친해지고 싶은 사람이 먼저 다가오는 것과 내가 먼저 다가가는 것 중 뭐가 더 편하신가요?",
  "친한 친구와 하루 종일 붙어있기 vs 일주일에 한 번 만나도 편한 사이, 어느 쪽이 더 좋나요?",
  "사람을 처음 만났을 때 은근히 가장 먼저 보는 부분은?",
  "친구랑 싸웠을 때 바로 풀기 vs 시간 좀 갖기, 어느 쪽인가요?",
  "친해진 사람에게만 나오는 본인의 특징이 있나요?",
  "오래 알고 지낸 친구와 새로운 사람을 만나는 것 중 하나만 골라야 한다면?",
  "누군가와 친해지는 데 “이 사람 재밌다”와 “이 사람 편하다” 중 어느 쪽이 더 중요한가요?",
  "본인과 성격이 완전히 반대인 사람과 친해질 수 있나요?",
  "나를 엄청 좋아하는 사람 vs 내가 엄청 좋아하는 사람",
  "나와 싸우면 바로 푸는 사람 vs 하루 정도 생각할 시간을 갖는 사람",
  "매일 보고 싶은 연애 vs 각자 시간을 많이 갖는 연애",
  "연애할 때 표현 많이 하는 사람 vs 표현은 적지만 행동으로 보여주는 사람",
  "내가 좋아하는 캐릭터가 죽는 명작 vs 결말은 별론데 최애가 살아있는 작품",
  "첫 화부터 재밌는 작품 vs 10화쯤부터 미친 듯이 재밌어지는 작품",
  "강철의 연금술사 vs 진격의 거인 — 하나만 남긴다면?",
  "완결난 명작 정주행 vs 아직 연재 중인 작품을 실시간으로 따라가기",
  "작화가 미친 애니 vs 스토리가 미친 애니, 하나만 고른다면?",
  "본인의 인생을 영화로 만든다면 본인이 직접 주인공 하기 vs 다른 배우에게 맡기기",
  "잉친이들이 우정잉님을 하루 동안 대신 운영할 수 있다면 가장 먼저 뭘 시킬 것 같나요?",
  "과거의 나와 지금의 내가 하루 동안 같이 지낸다면 누가 먼저 답답해할 것 같나요?",
  "갑자기 모든 사람이 본인의 속마음을 하루 동안 들을 수 있게 된다면 가장 먼저 할 행동은?",
  "갑자기 하루가 30시간이 된다면 늘어난 6시간 동안 제일 먼저 뭘 할 것 같나요?",
  "본인에게 “한 번만 과거로 돌아갈 수 있는 버튼”이 생긴다면 누를 것 같나요?",
  "하루 동안 본인의 생각이 자막으로 머리 위에 뜬다면 방송을 켤 수 있을까요?",
  "평생 하나의 계절만 살 수 있다면 봄·여름·가을·겨울 중 무엇",
  "지금 가진 기억을 그대로 가지고 10살로 돌아가기 vs 지금 나이 그대로 10년 뒤로 가기",
  "잉친이들이 본인에게 가상의 주민등록증을 만들어준다면 직업란에 뭐라고 적을 것 같나요?",
  "본인이 무인도에 떨어졌는데 휴대폰 배터리 1%가 남아 있다면 마지막으로 뭘 할 건가요",
  "평생 한 가지 물건만 무한 복제할 수 있다면 뭘 복제하시겠어요?",
  "본인이 게임 캐릭터라면 사람들이 가장 많이 찍을 것 같은 스킬은 뭔가요?",
  "본인의 이름을 처음 듣는 외국인이 있다면 어떤 사람이라고 상상할 것 같나요?",
  "오늘 하루를 누군가가 영화로 만든다면 본인도 모르게 들어갈 것 같은 장면은?",
  "본인의 성격을 처음 만난 사람이 오해할 가능성이 가장 높은 부분은 뭘까요?",
  "본인이 지금까지 한 말 중 하나가 100년 뒤 명언으로 남는다면 어떤 말일 것 같나요?",
  "내일부터 모든 사람이 본인을 처음 만난 것처럼 행동한다면 누구부터 다시 친해지고 싶나요?",
  "본인의 인생에서 '이 장면은 작가가 너무 억지로 썼는데?' 싶은 일이 있었나요?",
  "잉친이들이 본인보다 본인을 더 잘 안다고 느껴지는 순간이 있나요?",
  "잉친이들이 우정잉을 설명하는 단어를 딱 하나씩 적는다면 가장 많이 나올 것 같은 단어는?",
  "잉친이들이 우정잉의 하루를 대신 계획한다면 가장 먼저 집어넣을 것 같은 일정은?",
  "잉친이들이 우정잉에게 '이것만큼은 절대 바꾸지 마세요'라고 할 것 같은 건 뭘까요?",
  "잉친이들이 우정잉을 처음 만난 사람에게 소개한다면 어떤 식으로 소개할 것 같나요?",
  "잉친이들이 우정잉을 게임 캐릭터로 만든다면 능력치 중 가장 높을 것 같은 스탯은?",
  "잉친이들이 우정잉을 처음 봤을 때와 지금 가장 달라졌다고 느끼는 점은 뭘까요?",
  "잉친이들이 우정잉에게 가장 자주 하는 말 중 본인도 은근히 기억하고 있는 말이 있나요?",
  "잉친이들이 우정잉을 처음 만났을 때 예상했을 것과 실제 모습 중 가장 차이가 큰 부분은 뭘까요?",
  "잉친이들이 우정잉에게 하루 동안 하고 싶은 말을 전부 할 수 있다면 가장 많이 나올 것 같은 말은?",
  "잉친이들이 우정잉과 처음 만난 날의 기억을 영화로 만든다면 제목은 뭘까요?",
  "잉친이들이 우정잉을 10년 뒤에도 기억한다면 어떤 모습으로 기억할 것 같나요?",
  "잉친이들이 우정잉에게 사용설명서를 써준다면 가장 먼저 적을 주의사항은 뭘까요?",
  "내일 모든 사람이 본인을 처음 만난 것처럼 행동한다면 오히려 다시 친해져보고 싶은 사람이 있나요?",
  "본인의 인생에서 아무 의미 없어 보이지만 이상하게 계속 기억나는 장면이 있나요?",
  "갑자기 하루에 한 번만 시간을 1시간 되돌릴 수 있다면 보통 언제 사용할 것 같나요?",
  "본인의 하루에서 가장 쓸데없지만 없으면 은근히 허전할 것 같은 행동은 뭘까요?",
  "내일 갑자기 본인의 인생이 리셋되는데 기억 하나만 가지고 갈 수 있다면 어떤 기억을 가져갈 건가요?",
  "갑자기 1년 동안 말을 못 하게 된다면 주변 사람들이 가장 먼저 알아차릴 행동은 뭘까요?",
  "갑자기 모든 사람이 하루 동안 본인의 말투를 쓰게 된다면 제일 먼저 벌어질 일은 뭘까요?",
  "지금의 나에게 필요한 건 휴식일까요, 도파민일까요?",
  "지금 이 순간 가장 듣고 싶은 말은?",
  "최근에 생각이 조금 바뀐 게 있나요?",
  "요즘 하루 중 가장 기다려지는 시간은 언제인가요?",
  "최근에 아무 이유 없이 갑자기 하고 싶어진 게 있나요?",
  "요즘 본인에게 가장 필요한 한 가지를 고른다면?",
  "'내가 왜 이걸 하고 있지?' 싶었던 순간은?",
  "최근에 괜히 시작했다가 생각보다 오래 하고 있는 건?",
  "최근에 본인이 스스로에게 가장 많이 한 말은?",
  "최근에 본인도 모르게 반복하고 있는 행동이 있나요?",
  "하루 동안 모든 걱정이 사라진다면 가장 먼저 뭘 할 건가요?",
  "요즘 은근히 기대하고 있는 일이 있나요?",
  "하루를 버티게 해주는 소소한 것이 있다면?",
  "최근 상구 열풍을 보고 있으면 솔직히 질투 나나요?",
  "딱 하루 동안 과거의 나에게 연락할 수 있다면 무슨 말을 해주고 싶나요?",
  "하루 동안 아무도 알아보지 못하는 사람이 된다면 제일 먼저 어디를 가보고 싶나요?",
  "꾸꾸가 갑자기 사람처럼 말을 할 수 있게 된다면 제일 먼저 무슨 말을 할 것 같나요?",
  "꾸꾸가 우정잉님에게 하루 동안 잔소리를 할 수 있다면 뭐라고 할 것 같나요?",
  "꾸꾸에게 사람처럼 직업을 하나 정해준다면 무슨 직업이 어울릴까요?",
  "꾸꾸가 집에서 우정잉님 몰래 하는 일이 하나 있다면 뭐라고 생각하시나요?",
  "꾸꾸가 우정잉님에게 가장 불만인 게 하나 있다면 뭘 것 같나요?",
  "꾸꾸가 집에 새로운 고양이를 한 마리 데려온다면 잉은 환영할 수 있나요?",
  "꾸꾸가 사람이라면 친구가 많을 것 같나요, 혼자 있는 걸 좋아할 것 같나요?",
  "종겜동 멤버들이 무인도에 떨어진다면 본인은 어떤 역할을 맡을 것 같나요?",
  "종겜동 멤버들이 서로의 하루를 바꿔 산다면 가장 궁금한 사람은?",
  "종겜동 멤버 중 게임 말고 다른 분야로 진출하면 의외로 잘할 것 같은 사람은?",
  "종겜동 멤버들이 하루 동안 서로의 방송을 대신한다면 누구 방송을 해보고 싶나요?",
  "종겜동 멤버들이 현실에서 직업을 하나씩 다시 고른다면 어떤 직업이 어울릴 것 같나요?",
  "요즘 누가 추천해줘도 잘 안 끌리는 콘텐츠 장르는?",
  "요즘 갑자기 꽂힌 콘텐츠 장르는?",
  "아무도 뭐라고 안 하는데 본인이 혼자 신경 쓰는 사소한 게 있나요?",
  "1년 전의 나에게 지금 딱 한마디만 한다면?",
  "좋아하는 게임인데 실력 안 늘기 vs 별로 안 좋아하는 게임인데 실력 개잘하기",
  "게임 실력은 최상급인데 운이 최악 vs 게임 실력은 평범한데 운이 최상급",
  "말은 별로 없는데 같이 있으면 편한 사람 vs 말이 너무 잘 통해서 시간 가는 줄 모르는 사람",
  "과거의 나와 하루 동안 대화하기 vs 10년 뒤의 나와 하루 동안 대화하기",
  "내가 제일 좋아하는 게임으로 방송하기 vs 잉친이들이 제일 좋아하는 게임으로 방송하기",
  "방송 중 물 마실 때마다 효과음 나기 vs 하품할 때마다 화면 확대되기",
  "내가 생각한 것보다 방송이 2배 빨리 끝나기 vs 방송이 2배 길어지기",
  "사람을 친해지기 전과 친해진 후 가장 다르게 보는 부분은?",
  "본인이 누군가에게 친해지고 싶다는 신호를 보낼 때 하는 행동은?",
  "처음 만난 사람에게 은근히 가장 궁금한 건?",
  "내가 집을 비운 사이 집에 있는 물건 하나가 나에 대해 뒷담한다면 뭘 것 같나요?",
  "재미는 없었는데 이상하게 기억에 남는 영화는?",
  "영화 보고 할 말이 너무 많은 작품 vs 할 말은 없는데 재밌었던 작품",
  "영화 리뷰하다가 원래 생각보다 말이 길어진 작품은?",
  "처음에는 별 기대 없었는데 리뷰까지 하게 된 영화가 있나요?",
  "내가 별로라고 한 영화가 잉친이들 사이에서 대흥행하기 vs 내가 극찬한 영화가 아무도 안 봄",
  "최근 본 영화 중 “이건 내 취향이다” 싶었던 작품은?",
  "최근 본 영화 중 잉친이들과 같이 봤으면 더 재밌었을 것 같은 작품은?",
  "최근 본 영화 중 리뷰하기 가장 어려웠던 작품은?",
  "하루 동안 다른 사람의 직업을 체험할 수 있다면 어떤 직업?",
  "갑자기 일주일 동안 모든 약속이 사라진다면 오히려 좋음 vs 심심함",
  "결혼 후 모든 돈을 합쳐서 관리 vs 각자 돈은 각자 관리",
  "집은 엄청 좋은데 출퇴근이 힘듦 vs 집은 평범한데 생활권이 완벽함",
  "모든 일을 미리 계획하기 vs 그날그날 기분대로 살기",
  "휴대폰 없이 일주일 vs 인터넷 없이 한 달",
  "한 게임을 1,000시간 하기 vs 100개 게임을 10시간씩 하기",
  "갑자기 일주일 동안 아무도 나를 찾지 않는다면 뭘 하면서 보낼 것 같은지",
  "미래의 나에게 스포일러 하나만 받을 수 있다면 어떤 걸 물어볼 건가요?",
  "지금은 별거 아닌데 미래에 추억이 되어 있을 것 같은 일은?",
  "10년 뒤에도 지금과 똑같이 하고 있을 것 같은 일은?",
  "10년 뒤에도 절대 안 바뀔 것 같은 취향 하나는?",
  "내일 세상이 끝난다는 걸 알게 된다면 평소처럼 방송할 건가요, 쉬어갈 건가요?",
  "게임 중 한 번 실수할 때마다 잉친이들이 클립으로 박제 vs 캐리할 때마다 아무도 기억 못 함",
  "승리하면 10분 방송 연장 vs 패배하면 10분 방송 연장",
  "지금은 상상도 못 하지만 언젠가 한 번쯤 해보고 싶은 일은?",
];

const questions: Question[] = questionTexts.map((question, index) => ({
  id: index + 1,
  emoji: ["🐰", "🎙️", "💭", "🤣", "🧠", "🎮", "📺", "🧐"][index % 8],
  question,
}));

export default function Home() {
  const [current, setCurrent] = useState<Question | null>(null);
  const [history, setHistory] = useState<Question[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState("");

  // 실제로 사용된 질문을 즉시 기억해서 빠른 연속 클릭에도 중복 방지
  const usedQuestionIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const drawQuestion = () => {
    if (questions.length === 0) return;

    let available = questions.filter(
      (question) => !usedQuestionIdsRef.current.has(question.id)
    );

    // 모든 질문을 한 번씩 뽑았다면 새로운 라운드 시작
    if (available.length === 0) {
      usedQuestionIdsRef.current.clear();
      setUsedQuestionIds([]);
      available = questions;
    }

    const target =
      available[Math.floor(Math.random() * available.length)];

    // 선택한 질문을 즉시 사용 처리
    usedQuestionIdsRef.current.add(target.id);
    setUsedQuestionIds(Array.from(usedQuestionIdsRef.current));

    // 질문 즉시 표시
    setCurrent(target);

    // 최근 질문 기록
    setHistory((prev) =>
      [target, ...prev.filter((q) => q.id !== target.id)].slice(0, 6)
    );
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favoriteId) => favoriteId !== id)
        : [...prev, id]
    );
  };

  const resetHistory = () => {
    setHistory([]);
    setUsedQuestionIds([]);
    usedQuestionIdsRef.current.clear();
    setCurrent(null);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#11152b] text-white">
      {/* 배경 별 */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[12%] text-xs text-white/50">
          ✦
        </div>
        <div className="absolute left-[20%] top-[25%] text-sm text-white/40">
          ✦
        </div>
        <div className="absolute right-[17%] top-[18%] text-xs text-white/50">
          ✦
        </div>
        <div className="absolute right-[8%] top-[38%] text-sm text-white/40">
          ✦
        </div>
        <div className="absolute left-[5%] top-[55%] text-xs text-white/30">
          ✦
        </div>

        {/* 달빛 */}
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#fff2bd]/10 blur-3xl" />

        {/* 구름 */}
        <div className="absolute -bottom-12 -left-10 h-32 w-96 rounded-full bg-[#252b50]/80 blur-sm" />
        <div className="absolute -bottom-16 right-[-80px] h-40 w-[500px] rounded-full bg-[#252b50]/70 blur-sm" />
      </div>

      <div className="relative mx-auto min-h-screen max-w-6xl px-5 py-8 sm:px-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-2 text-sm font-medium tracking-[0.25em] text-pink-200/80">
              2026 CHUSEOK SPECIAL
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
              😺 우정잉
              <span className="ml-2 text-pink-200">
                랜덤토크 질문 뽑기
              </span>
            </h1>

            <p className="mt-3 text-sm text-white/55 sm:text-base">
              방송하다 할 말이 없을 때, 송편 하나 뽑아보세요 🌕
            </p>
          </div>

          <div className="hidden text-right sm:block">
            <div className="text-6xl drop-shadow-[0_0_30px_rgba(255,230,170,0.25)]">
              🌕
            </div>

            <div className="mt-1 text-xs text-white/40">
              즐거운 한가위
            </div>

            <div className="mt-2 text-xs font-medium text-pink-200/50">
              {currentTime}
            </div>
          </div>
        </header>

        {/* 상단 정보 */}
        <section className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white/80">
              랜덤 토크 질문
            </h2>

            <div className="flex items-center gap-4">
              <span className="text-xs text-white/25">
                총 {questions.length}개
              </span>

              <button
                onClick={resetHistory}
                className="text-xs text-white/35 transition hover:text-white/70"
              >
                기록 초기화
              </button>
            </div>
          </div>
        </section>

        {/* Main card */}
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.055] p-4 shadow-2xl backdrop-blur-xl sm:p-7">
          {/* 카드 장식 */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pink-300/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-yellow-200/5 blur-3xl" />

          <div className="relative">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold tracking-[0.2em] text-pink-200/60">
                  TODAY'S TALK
                </div>

                <h2 className="mt-1 text-xl font-black sm:text-2xl">
                  오늘의 랜덤 토크
                </h2>
              </div>

              <div className="text-3xl">🥮</div>
            </div>

            {/* 질문 영역 */}
            <div className="relative flex min-h-[310px] items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-[#0c1022]/80 px-5 py-8 sm:min-h-[340px]">
              {/* 중앙 강조 영역 */}
              <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-10 h-[118px] -translate-y-1/2 border-y border-pink-200/15 bg-pink-200/[0.025]" />

              {/* 위/아래 fade */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-[#0c1022] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#0c1022] to-transparent" />

              <div className="relative z-30 flex w-full max-w-3xl items-center justify-center text-center">
                {current ? (
                  <div
                    key={current.id}
                    className="animate-[questionAppear_0.45s_ease-out]"
                  >
                    <div className="mb-5 flex items-center justify-center gap-2">
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-bold text-white/50">
                        {current.emoji} RANDOM TALK
                      </span>
                    </div>

                    <p className="text-2xl font-black leading-[1.45] tracking-tight text-white sm:text-4xl">
                      {current.question}
                    </p>

                    <button
                      onClick={() => toggleFavorite(current.id)}
                      className="mt-7 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white/50 transition hover:bg-white/[0.08] hover:text-white"
                    >
                      {favorites.includes(current.id)
                        ? "★ 저장됨"
                        : "☆ 이 주제 저장"}
                    </button>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="mb-5 text-6xl">🐇</div>

                    <p className="text-xl font-bold text-white/75 sm:text-2xl">
                      송편을 하나 뽑아볼까요?
                    </p>

                    <p className="mt-2 text-sm text-white/35">
                      버튼을 누르면 랜덤 토크 주제가 등장합니다.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Draw button */}
            <div className="mt-5 flex justify-center">
              <button
                onClick={drawQuestion}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-300 to-rose-200 px-9 py-4 font-black text-[#25162d] shadow-lg shadow-pink-300/10 transition-all hover:-translate-y-0.5 hover:shadow-pink-300/20 active:translate-y-0"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>🥮</span>
                  송편 하나 뽑기
                </span>

                <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </div>
          </div>
        </section>

        {/* 하단 정보 */}
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_340px]">
          {/* 최근 질문 */}
          <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-lg">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-black">📝 최근 뽑은 주제</h3>

                <p className="mt-1 text-xs text-white/35">
                  같은 주제가 연속으로 나오지 않아요.
                </p>
              </div>

              <div className="text-xs text-white/30">
                {history.length} / 6
              </div>
            </div>

            {history.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center text-sm text-white/25">
                아직 뽑은 주제가 없습니다.
              </div>
            ) : (
              <div className="space-y-2">
                {history.map((item, index) => (
                  <button
                    key={`${item.id}-${index}`}
                    onClick={() => setCurrent(item)}
                    className="group flex w-full items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3 text-left transition hover:bg-white/[0.07]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-sm">
                      {item.emoji}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white/60 group-hover:text-white">
                        {item.question}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* 저장한 주제 */}
          <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-lg">
            <h3 className="font-black">⭐ 저장한 주제</h3>

            <p className="mt-1 text-xs text-white/35">
              마음에 드는 질문을 저장해두세요.
            </p>

            <div className="mt-4">
              {favorites.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center text-sm text-white/25">
                  아직 저장한 주제가 없습니다.
                </div>
              ) : (
                <div className="space-y-2">
                  {questions
                    .filter((q) => favorites.includes(q.id))
                    .slice(0, 5)
                    .map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCurrent(item)}
                        className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3 text-left text-sm text-white/55 transition hover:bg-white/[0.07] hover:text-white"
                      >
                        <span className="mr-2">{item.emoji}</span>
                        {item.question}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="pb-5 pt-10 text-center">
          <div className="mb-2 text-2xl">🌕 🐇 🥮</div>

          <p className="text-xs text-white/25">
            우정잉 랜덤토크 질문 뽑기 · 즐거운 한가위 보내세요
          </p>
        </footer>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes questionAppear {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
            filter: blur(5px);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .scrollbar-none {
          scrollbar-width: none;
        }

        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}