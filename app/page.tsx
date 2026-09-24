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
  "방송을 켰는데 시청자들이 전부 본인의 말에 반대로 반응한다면, 얼마나 버틸 수 있을까요?",
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
  "본인이 생각하는 '잘 살고 있다'는 느낌은 어떤 순간에 드나요?",
  "잉친이들이 우정잉을 10년 뒤에도 기억한다면 어떤 모습으로 기억할 것 같나요?",
  "잉친이들이 우정잉에게 사용설명서를 써준다면 가장 먼저 적을 주의사항은 뭘까요?",
  "만약 주식 시작하기 전으로 돌아간다면, 그때도 주식 투자를 시작하실 건가요?",
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
  "최근 부캉이 열풍을 보고 있으면 솔직히 질투 나나요?",
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
  "본인을 오래 본 시청자도 아직 모를 것 같은, 의외로 변하지 않는 습관이 있나요?",
  "내가 생각하는 '성공한 사람'의 기준이 과거와 지금 어떻게 달라졌나요?",
  "나를 설명하는 단어를 하나씩 지워나간다면, 마지막까지 남겨두고 싶은 단어는 무엇인가요?",
  "본인의 닉네임을 딱 한번 다른 사람에게 선물할 수 있다면, 누구에게 주고 싶으신가요?",
];

const schedules = [
  { date: "09.23", title: "휴방" },
  { date: "09.24", title: "추석연휴 기념방송 · 종겜동 합방" },
  { date: "09.25", title: "추석연휴 기념방송" },
  { date: "09.26", title: "추석연휴 기념방송 · 제이팝 라이브 월드컵" },
  { date: "09.27", title: "<템빨> 1~2화 같이보기" },
  { date: "09.28", title: "휴방" },
  { date: "09.29", title: "초대석" },
  { date: "09.30", title: "휴방" },
];

const questions: Question[] = questionTexts.map(
  (question, index) => ({
    id: index + 1,
    emoji: [
      "🐰",
      "🎙️",
      "💭",
      "🤣",
      "🧠",
      "🎮",
      "📺",
      "🧐",
    ][index % 8],
    question,
  })
);

function SongpyeonIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 90"
      className={className}
      aria-label="송편"
      role="img"
    >
      <defs>
        <linearGradient
          id="songpyeonPink"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#fff5f0" />
          <stop offset="100%" stopColor="#f7c5c0" />
        </linearGradient>

        <linearGradient
          id="songpyeonGreen"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#f4ffe9" />
          <stop offset="100%" stopColor="#b8dca8" />
        </linearGradient>
      </defs>

      <g transform="translate(8 8)">
        <path
          d="M13 48C17 27 32 15 52 15C72 15 88 27 92 48C78 59 27 59 13 48Z"
          fill="url(#songpyeonPink)"
          stroke="#fff8f5"
          strokeWidth="3"
        />

        <path
          d="M13 48C29 57 76 58 92 48"
          fill="none"
          stroke="#dfaaa4"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <ellipse
          cx="52"
          cy="29"
          rx="14"
          ry="5"
          fill="#ffffff"
          opacity="0.4"
        />
      </g>

      <g transform="translate(38 23) scale(.7)">
        <path
          d="M13 48C17 27 32 15 52 15C72 15 88 27 92 48C78 59 27 59 13 48Z"
          fill="url(#songpyeonGreen)"
          stroke="#f3ffe9"
          strokeWidth="3"
        />

        <path
          d="M13 48C29 57 76 58 92 48"
          fill="none"
          stroke="#98bf8b"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <ellipse
          cx="52"
          cy="29"
          rx="14"
          ry="5"
          fill="#ffffff"
          opacity="0.4"
        />
      </g>
    </svg>
  );
}

const PATCH_VERSION = "2026.09.23";

const PATCH_NOTES = [
  "배포 과정에서 코드가 엉켜 일부 질문이 섞여 나오는 문제 수정",
  "기존 룰렛 형식 제거",
  "질문 표시 방식 개선",
];

type RaceAnimal = "토끼" | "거북이" | "고양이";

type RacePositions = Record<RaceAnimal, number>;

type Card = {
  suit: "♠" | "♥" | "♦" | "♣";
  value: number;
  label: string;
};

const RACE_ANIMALS: RaceAnimal[] = [
  "토끼",
  "거북이",
  "고양이",
];

const RACE_EMOJIS: Record<RaceAnimal, string> = {
  토끼: "🐇",
  거북이: "🐢",
  고양이: "🐱",
};

const RACE_COLORS: Record<RaceAnimal, string> = {
  토끼: "bg-pink-300/20",
  거북이: "bg-green-300/20",
  고양이: "bg-yellow-300/20",
};

const createDeck = (): Card[] => {
  const suits: Card["suit"][] = [
    "♠",
    "♥",
    "♦",
    "♣",
  ];

  const deck: Card[] = [];

  suits.forEach((suit) => {
    for (let value = 2; value <= 14; value += 1) {
      const label =
        value === 14
          ? "A"
          : value === 13
            ? "K"
            : value === 12
              ? "Q"
              : value === 11
                ? "J"
                : String(value);

      deck.push({
        suit,
        value,
        label,
      });
    }
  });

  return deck;
};

export default function Home() {
  const [current, setCurrent] =
    useState<Question | null>(null);

  const [history, setHistory] =
    useState<Question[]>([]);

  const [currentTime, setCurrentTime] =
    useState("");

  const [currentDate, setCurrentDate] =
    useState("");

  const [timePeriod, setTimePeriod] = useState<
    "dawn" | "day" | "evening" | "night"
  >("night");

  const [showPatchNotice, setShowPatchNotice] =
    useState(false);

  const [selectedAnimal, setSelectedAnimal] =
    useState<RaceAnimal>("토끼");

  const [racePositions, setRacePositions] =
    useState<RacePositions>({
      토끼: 0,
      거북이: 0,
      고양이: 0,
    });

  const [raceWinner, setRaceWinner] =
    useState<RaceAnimal | null>(null);

  const [isRacing, setIsRacing] =
    useState(false);

  const [currentCard, setCurrentCard] =
    useState<Card | null>(null);

  const [remainingDeck, setRemainingDeck] =
    useState<Card[]>([]);

  const [highLowResult, setHighLowResult] =
    useState<string | null>(null);

  const [isHighLowStarted, setIsHighLowStarted] =
    useState(false);

  const [highLowWinStreak, setHighLowWinStreak] =
    useState(0);

  const [highLowLoseStreak, setHighLowLoseStreak] =
    useState(0);

  const usedQuestionIdsRef =
    useRef<Set<number>>(new Set());

  const raceTimerRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const viewedPatchVersion =
      window.localStorage.getItem(
        "random-talk-patch-version"
      );

    if (viewedPatchVersion !== PATCH_VERSION) {
      setShowPatchNotice(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (raceTimerRef.current) {
        clearInterval(raceTimerRef.current);
      }
    };
  }, []);

  const closePatchNotice = () => {
    window.localStorage.setItem(
      "random-talk-patch-version",
      PATCH_VERSION
    );

    setShowPatchNotice(false);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();

      setCurrentTime(
        now.toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      setCurrentDate(
        `${String(now.getMonth() + 1).padStart(
          2,
          "0"
        )}.${String(now.getDate()).padStart(2, "0")}`
      );

      if (hour >= 6 && hour < 9) {
        setTimePeriod("dawn");
      } else if (hour >= 9 && hour < 18) {
        setTimePeriod("day");
      } else if (hour >= 18 && hour < 21) {
        setTimePeriod("evening");
      } else {
        setTimePeriod("night");
      }
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const drawQuestion = () => {
    if (questions.length === 0) return;

    let available = questions.filter(
      (question) =>
        !usedQuestionIdsRef.current.has(question.id)
    );

    if (available.length === 0) {
      usedQuestionIdsRef.current.clear();
      available = questions;
    }

    const target =
      available[
        Math.floor(Math.random() * available.length)
      ];

    usedQuestionIdsRef.current.add(target.id);

    setCurrent(target);

    setHistory((prev) =>
      [
        target,
        ...prev.filter((q) => q.id !== target.id),
      ].slice(0, 6)
    );
  };

  const resetHistory = () => {
    setHistory([]);
    usedQuestionIdsRef.current.clear();
    setCurrent(null);
  };

  const startRace = () => {
    if (raceTimerRef.current) {
      clearInterval(raceTimerRef.current);
    }

    const startPositions: RacePositions = {
      토끼: 0,
      거북이: 0,
      고양이: 0,
    };

    setRacePositions(startPositions);
    setRaceWinner(null);
    setIsRacing(true);

    raceTimerRef.current = setInterval(() => {
      setRacePositions((prev) => {
        const next: RacePositions = {
          토끼:
            prev.토끼 +
            Math.floor(Math.random() * 6) +
            1,

          거북이:
            prev.거북이 +
            Math.floor(Math.random() * 6) +
            1,

          고양이:
            prev.고양이 +
            Math.floor(Math.random() * 6) +
            1,
        };

        const finishedAnimals =
          RACE_ANIMALS.filter(
            (animal) => next[animal] >= 100
          );

        if (finishedAnimals.length > 0) {
          const winner =
            finishedAnimals[
              Math.floor(
                Math.random() *
                  finishedAnimals.length
              )
            ];

          next[winner] = 100;

          if (raceTimerRef.current) {
            clearInterval(raceTimerRef.current);
            raceTimerRef.current = null;
          }

          setRaceWinner(winner);
          setIsRacing(false);
        }

        return next;
      });
    }, 180);
  };

  const startHighLow = () => {
    const deck = createDeck();

    const firstIndex = Math.floor(
      Math.random() * deck.length
    );

    const firstCard = deck[firstIndex];

    const remaining = deck.filter(
      (_, index) => index !== firstIndex
    );

    setCurrentCard(firstCard);
    setRemainingDeck(remaining);
    setHighLowResult(null);
    setIsHighLowStarted(true);

    setHighLowWinStreak(0);
    setHighLowLoseStreak(0);
  };

  const calculateHighLowProbability = () => {
    if (
      !currentCard ||
      remainingDeck.length === 0
    ) {
      return {
        high: 0,
        low: 0,
        same: 0,
      };
    }

    const higher = remainingDeck.filter(
      (card) =>
        card.value > currentCard.value
    ).length;

    const lower = remainingDeck.filter(
      (card) =>
        card.value < currentCard.value
    ).length;

    const same = remainingDeck.filter(
      (card) =>
        card.value === currentCard.value
    ).length;

    return {
      high:
        (higher / remainingDeck.length) *
        100,

      low:
        (lower / remainingDeck.length) *
        100,

      same:
        (same / remainingDeck.length) *
        100,
    };
  };

  const playHighLow = (
    choice: "high" | "low" | "same"
  ) => {
    if (
      !currentCard ||
      remainingDeck.length === 0
    ) {
      return;
    }

    const drawIndex = Math.floor(
      Math.random() * remainingDeck.length
    );

    const nextCard =
      remainingDeck[drawIndex];

    const nextRemainingDeck =
      remainingDeck.filter(
        (_, index) => index !== drawIndex
      );

    const isCorrect =
      (choice === "same" &&
        nextCard.value === currentCard.value) ||
      (choice === "high" &&
        nextCard.value > currentCard.value) ||
      (choice === "low" &&
        nextCard.value < currentCard.value);

    let result = "";

    if (
      choice === "same" &&
      nextCard.value === currentCard.value
    ) {
      result =
        "🎉 적중! 같은 숫자가 나왔습니다.";
    } else if (
      choice === "high" &&
      nextCard.value > currentCard.value
    ) {
      result =
        "🎉 적중! 더 높은 카드가 나왔습니다.";
    } else if (
      choice === "low" &&
      nextCard.value < currentCard.value
    ) {
      result =
        "🎉 적중! 더 낮은 카드가 나왔습니다.";
    } else if (
      nextCard.value === currentCard.value
    ) {
      result =
        "🟰 무승부! 같은 숫자가 나왔습니다.";
    } else {
      result =
        choice === "same"
          ? "💥 실패! 같은 숫자가 아니었습니다."
          : "💥 실패! 반대쪽이 나왔습니다.";
    }

    if (isCorrect) {
      setHighLowWinStreak(
        (prev) => prev + 1
      );

      setHighLowLoseStreak(0);
    } else {
      setHighLowLoseStreak(
        (prev) => prev + 1
      );

      setHighLowWinStreak(0);
    }

    setCurrentCard(nextCard);
    setRemainingDeck(nextRemainingDeck);
    setHighLowResult(result);

    if (
      nextRemainingDeck.length === 0
    ) {
      setIsHighLowStarted(false);
    }
  };

  const probability =
    calculateHighLowProbability();

  const theme =
    timePeriod === "dawn"
      ? {
          page:
            "bg-[linear-gradient(135deg,#554c72_0%,#8d7891_42%,#d6aa96_100%)]",
          overlay:
            "bg-[radial-gradient(circle_at_50%_0%,rgba(255,239,202,0.38),transparent_45%)]",
          cloud:
            "bg-[#f1d9d0]/30",
          cloud2:
            "bg-[#ead2d5]/25",
          panel:
            "bg-[#5b526f]/35",
          card:
            "bg-[#4b4562]/45",
          inner:
            "bg-[#343149]/65",
          text:
            "text-[#fff8ef]",
          muted:
            "text-[#fff2e5]/60",
          soft:
            "text-[#ffe9d9]/70",
          accent:
            "text-[#ffe0c9]",
          border:
            "border-[#ffe9d9]/20",
          button:
            "from-[#ffd6b8] to-[#f6b9ad] text-[#3b2630] shadow-[#ffd6b8]/20",
          moon: "🌅",
        }
      : timePeriod === "day"
        ? {
            page:
              "bg-[linear-gradient(135deg,#a8d8e8_0%,#d8e9d1_48%,#f5d9ad_100%)]",
            overlay:
              "bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,225,0.55),transparent_46%)]",
            cloud:
              "bg-white/45",
            cloud2:
              "bg-white/35",
            panel:
              "bg-white/25",
            card:
              "bg-white/30",
            inner:
              "bg-[#456273]/35",
            text:
              "text-[#25303a]",
            muted:
              "text-[#314552]/65",
            soft:
              "text-[#455c68]/75",
            accent:
              "text-[#8a5260]",
            border:
              "border-white/40",
            button:
              "from-[#f7c7a6] to-[#f4aeb3] text-[#3c2830] shadow-[#f3b6aa]/20",
            moon: "☀️",
          }
        : timePeriod === "evening"
          ? {
              page:
                "bg-[linear-gradient(135deg,#705c87_0%,#a16e83_45%,#e4a47d_100%)]",
              overlay:
                "bg-[radial-gradient(circle_at_70%_5%,rgba(255,220,170,0.38),transparent_42%)]",
              cloud:
                "bg-[#443b60]/45",
              cloud2:
                "bg-[#503c59]/40",
              panel:
                "bg-[#403751]/35",
              card:
                "bg-[#3f354d]/45",
              inner:
                "bg-[#29253b]/70",
              text:
                "text-[#fff5ed]",
              muted:
                "text-[#ffece0]/60",
              soft:
                "text-[#ffe4d2]/75",
              accent:
                "text-[#ffd3c0]",
              border:
                "border-[#ffe5d8]/20",
              button:
                "from-[#f6c3ad] to-[#eaa5a7] text-[#3b2730] shadow-[#f2b2a8]/20",
              moon: "🌇",
            }
          : {
              page:
                "bg-[#11152b]",
              overlay:
                "bg-[radial-gradient(circle_at_50%_0%,rgba(255,242,189,0.12),transparent_42%)]",
              cloud:
                "bg-[#252b50]/80",
              cloud2:
                "bg-[#252b50]/70",
              panel:
                "bg-[#191d38]/90",
              card:
                "bg-white/[0.055]",
              inner:
                "bg-[#0c1022]/80",
              text:
                "text-white",
              muted:
                "text-white/55",
              soft:
                "text-white/75",
              accent:
                "text-pink-200",
              border:
                "border-white/10",
              button:
                "from-pink-300 to-rose-200 text-[#25162d] shadow-pink-300/10",
              moon: "🌕",
            };

  return (
    <main
      className={`min-h-screen overflow-hidden ${theme.page} ${theme.text} transition-colors duration-[1800ms]`}
    >
      {showPatchNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 px-5 backdrop-blur-sm">
          <div
            className={`relative w-full max-w-sm rounded-[28px] border p-5 shadow-2xl backdrop-blur-2xl ${theme.border} ${theme.panel}`}
          >
            <button
              type="button"
              onClick={closePatchNotice}
              aria-label="패치 내역 닫기"
              className={`absolute right-4 top-4 text-lg transition-opacity hover:opacity-70 ${theme.muted}`}
            >
              ×
            </button>

            <div
              className={`mb-2 text-xs font-bold tracking-[0.18em] ${theme.accent}`}
            >
              PATCH NOTE
            </div>

            <h2 className="pr-8 text-xl font-black">
              업데이트 안내
            </h2>

            <p
              className={`mt-1 text-xs ${theme.muted}`}
            >
              {PATCH_VERSION} 업데이트
            </p>

            <div
              className={`mt-5 rounded-2xl border p-4 ${theme.border} ${theme.card}`}
            >
              <ul className="space-y-3">
                {PATCH_NOTES.map((note) => (
                  <li
                    key={note}
                    className="flex items-start gap-2 text-sm leading-relaxed"
                  >
                    <span
                      className={`mt-0.5 ${theme.accent}`}
                    >
                      ✓
                    </span>

                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={closePatchNotice}
              className={`mt-5 w-full rounded-2xl bg-gradient-to-r px-4 py-3 text-sm font-black shadow-lg ${theme.button}`}
            >
              확인
            </button>
          </div>
        </div>
      )}

      <div
        className={`pointer-events-none fixed inset-0 overflow-hidden transition-all duration-[1800ms] ${theme.overlay}`}
      >
        {timePeriod === "night" ? (
          <>
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

            <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#fff2bd]/10 blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute left-[10%] top-[10%] text-2xl opacity-40">
              ☁️
            </div>

            <div className="absolute right-[15%] top-[18%] text-3xl opacity-35">
              ☁️
            </div>

            <div className="absolute left-[42%] top-[7%] text-xl opacity-30">
              ✨
            </div>
          </>
        )}

        <div
          className={`absolute -bottom-12 -left-10 h-32 w-96 rounded-full blur-sm transition-colors duration-[1800ms] ${theme.cloud}`}
        />

        <div
          className={`absolute -bottom-16 right-[-80px] h-40 w-[500px] rounded-full blur-sm transition-colors duration-[1800ms] ${theme.cloud2}`}
        />

        <div className="absolute right-[5%] top-[8%] hidden text-7xl opacity-20 sm:block">
          {theme.moon}
        </div>
      </div>

      <div className="relative mx-auto min-h-screen max-w-6xl px-5 py-8 sm:px-8">
        <header className="mb-8 flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <div
              className={`mb-2 text-sm font-medium tracking-[0.25em] transition-colors duration-[1800ms] ${theme.accent}`}
            >
              2026 CHUSEOK SPECIAL
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
              😺 우정잉
              <span
                className={`ml-2 transition-colors duration-[1800ms] ${theme.accent}`}
              >
                랜덤토크 질문 뽑기
              </span>
            </h1>

            <p
              className={`mt-3 text-sm transition-colors duration-[1800ms] sm:text-base ${theme.muted}`}
            >
              방송하다 할 말이 없을 때, 송편 하나 뽑아보세요 🌕
            </p>

            <section
              className={`mt-5 rounded-[28px] border p-5 backdrop-blur-lg transition-all duration-[1800ms] ${theme.border} ${theme.panel}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-black">
                    📝 최근 뽑은 주제
                  </h3>

                  <p
                    className={`mt-1 text-xs transition-colors duration-[1800ms] ${theme.muted}`}
                  >
                    같은 주제가 연속으로 나오지 않아요.
                  </p>
                </div>

                <div
                  className={`text-xs transition-colors duration-[1800ms] ${theme.muted}`}
                >
                  {history.length} / 6
                </div>
              </div>

              {history.length === 0 ? (
                <div
                  className={`rounded-2xl border border-dashed py-8 text-center text-sm transition-colors duration-[1800ms] ${theme.border} ${theme.muted}`}
                >
                  아직 뽑은 주제가 없습니다.
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((item, index) => (
                    <button
                      key={`${item.id}-${index}`}
                      onClick={() =>
                        setCurrent(item)
                      }
                      className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-[1800ms] ${theme.border} ${theme.card}`}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.10] text-sm">
                        {item.emoji}
                      </span>

                      <div className="min-w-0">
                        <p
                          className={`truncate text-sm font-medium transition-colors duration-[1800ms] ${theme.soft}`}
                        >
                          {item.question}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="hidden w-[300px] shrink-0 text-right sm:block">
            <div
              className={`text-6xl transition-all duration-[1800ms] ${
                timePeriod === "night"
                  ? "drop-shadow-[0_0_30px_rgba(255,230,170,0.25)]"
                  : "drop-shadow-[0_0_30px_rgba(255,220,170,0.35)]"
              }`}
            >
              {timePeriod === "night"
                ? "🌕"
                : theme.moon}
            </div>

            <div
              className={`mt-1 text-xs transition-colors duration-[1800ms] ${theme.muted}`}
            >
              {timePeriod === "day"
                ? "따뜻한 한가위 낮"
                : timePeriod === "evening"
                  ? "노을빛 한가위"
                  : timePeriod === "dawn"
                    ? "한가위 아침"
                    : "즐거운 한가위"}
            </div>

            <div
              className={`mt-2 text-xs font-medium transition-colors duration-[1800ms] ${theme.accent}`}
            >
              {currentTime}
            </div>

            <div
              className={`mt-4 overflow-hidden rounded-2xl border text-left shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-[1800ms] ${theme.border} ${theme.panel}`}
            >
              <div className="border-b border-white/10 bg-white/[0.08] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    📅
                  </span>

                  <span className="text-sm font-black">
                    방송 일정
                  </span>
                </div>

                <div
                  className={`mt-1 text-[10px] font-medium tracking-[0.08em] transition-colors duration-[1800ms] ${theme.accent}`}
                >
                  2026.09.23 — 09.30
                </div>
              </div>

              <div className="divide-y divide-white/[0.08]">
                {schedules.map((schedule) => (
                  <div
                    key={schedule.date}
                    className={`flex items-start gap-3 rounded-xl px-4 py-2.5 transition-all duration-[1800ms] ${
                      currentDate === schedule.date
                        ? "bg-gradient-to-r from-pink-400/25 via-purple-400/15 to-transparent ring-1 ring-pink-300/20"
                        : ""
                    }`}
                  >
                    <span
                      className={`w-[42px] shrink-0 pt-0.5 text-xs font-black transition-colors duration-[1800ms] ${theme.accent}`}
                    >
                      {schedule.date}
                    </span>

                    <span
                      className={`text-xs font-bold leading-relaxed ${
                        schedule.title ===
                        "휴방"
                          ? theme.muted
                          : theme.soft
                      }`}
                    >
                      {schedule.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section className="mb-6">
          <div className="flex items-center justify-between">
            <h2
              className={`text-sm font-bold transition-colors duration-[1800ms] ${theme.soft}`}
            >
              랜덤 토크 질문
            </h2>

            <div className="flex items-center gap-4">
              <span
                className={`text-xs transition-colors duration-[1800ms] ${theme.muted}`}
              >
                총 {questions.length}개
              </span>

              <button
                onClick={resetHistory}
                className={`text-xs transition-colors duration-[1800ms] ${theme.muted}`}
              >
                기록 초기화
              </button>
            </div>
          </div>
        </section>

        <section
          className={`relative overflow-hidden rounded-[32px] border p-4 shadow-2xl backdrop-blur-xl transition-all duration-[1800ms] sm:p-7 ${theme.border} ${theme.card}`}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pink-300/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-yellow-200/10 blur-3xl" />

          <div className="relative">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div
                  className={`text-xs font-bold tracking-[0.2em] transition-colors duration-[1800ms] ${theme.accent}`}
                >
                  TODAY'S TALK
                </div>

                <h2 className="mt-1 text-xl font-black sm:text-2xl">
                  오늘의 랜덤 토크
                </h2>
              </div>

              <SongpyeonIcon className="h-14 w-20 drop-shadow-[0_4px_12px_rgba(255,210,210,0.18)]" />
            </div>

            <div
              className={`relative flex min-h-[310px] items-center justify-center overflow-hidden rounded-[24px] border px-5 py-8 transition-all duration-[1800ms] sm:min-h-[340px] ${theme.border} ${theme.inner}`}
            >
              <div
                className={`pointer-events-none absolute left-0 right-0 top-1/2 z-10 h-[118px] -translate-y-1/2 border-y bg-pink-200/[0.025] transition-colors duration-[1800ms] ${theme.border}`}
              />

              <div
                className={`pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-transparent to-transparent transition-all duration-[1800ms] ${
                  timePeriod === "night"
                    ? "from-[#0c1022]"
                    : "from-black/10"
                }`}
              />

              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-transparent to-transparent transition-all duration-[1800ms] ${
                  timePeriod === "night"
                    ? "from-[#0c1022]"
                    : "from-black/10"
                }`}
              />

              <div className="relative z-30 flex w-full max-w-3xl -translate-y-3 items-center justify-center text-center">
                {current ? (
                  <div
                    key={current.id}
                    className="animate-[questionAppear_0.45s_ease-out]"
                  >
                    <div className="mb-5 flex items-center justify-center">
                      <span className="inline-flex h-7 items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.08] px-2.5 leading-none">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center text-[11px] leading-none">
                          {current.emoji}
                        </span>

                        <span className="flex h-4 items-center whitespace-nowrap text-[10px] font-bold leading-none">
                          RANDOM TALK
                        </span>
                      </span>
                    </div>

                    <p className="text-2xl font-black leading-[1.45] tracking-tight sm:text-4xl">
                      {current.question}
                    </p>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <SongpyeonIcon className="mx-auto mb-4 h-24 w-32 drop-shadow-[0_8px_18px_rgba(255,210,210,0.16)]" />

                    <p className="text-xl font-bold sm:text-2xl">
                      송편을 하나 뽑아볼까요?
                    </p>

                    <p
                      className={`mt-2 text-sm transition-colors duration-[1800ms] ${theme.muted}`}
                    >
                      버튼을 누르면 랜덤 토크 주제가 등장합니다.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <button
                onClick={drawQuestion}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r px-9 py-4 font-black shadow-lg transition-all duration-[1800ms] hover:-translate-y-0.5 active:translate-y-0 ${theme.button}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <SongpyeonIcon className="h-7 w-8" />
                  송편 하나 뽑기
                </span>

                <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </div>
          </div>
        </section>

        {/* 미니게임 2종 */}
        <section className="mt-6 grid gap-5 sm:grid-cols-2">
          {/* 미니잉마 */}
          <div
            className={`rounded-[28px] border p-5 backdrop-blur-xl transition-all duration-[1800ms] ${theme.border} ${theme.card}`}
          >
            <div className="mb-4">
              <div
                className={`text-xs font-bold tracking-[0.2em] ${theme.accent}`}
              >
                MINI RACE
              </div>

              <h3 className="mt-1 text-xl font-black">
                🏇 미니잉마
              </h3>

              <p
                className={`mt-1 text-xs leading-relaxed ${theme.muted}`}
              >
                토끼, 거북이, 고양이 중 하나를 선택하세요.
                <br />
                세 동물은 같은 조건에서 매 순간 랜덤으로 달립니다.
              </p>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-2">
              {RACE_ANIMALS.map((animal) => {
                const isSelected =
                  selectedAnimal === animal;

                return (
                  <button
                    key={animal}
                    type="button"
                    onClick={() => {
                      if (!isRacing) {
                        setSelectedAnimal(animal);
                      }
                    }}
                    disabled={isRacing}
                    className={`group relative overflow-hidden rounded-2xl border px-2 py-3 text-center transition-all duration-300 ${
                      isSelected
                        ? "scale-[1.04] border-pink-200/90 bg-pink-300/15 shadow-[0_0_8px_rgba(255,182,193,0.95),0_0_18px_rgba(255,105,180,0.65),0_0_34px_rgba(255,105,180,0.28),inset_0_0_16px_rgba(255,182,193,0.15)] animate-[raceNeon_1.5s_ease-in-out_infinite]"
                        : `${theme.border} bg-white/[0.04] opacity-55 hover:bg-white/[0.09] hover:opacity-90`
                    } ${
                      isRacing
                        ? "cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isSelected && (
                      <>
                        <span className="pointer-events-none absolute inset-0 rounded-2xl border border-pink-100/70" />

                        <span className="pointer-events-none absolute -inset-3 rounded-full bg-pink-300/10 blur-xl" />

                        <span className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-pink-100/90 shadow-[0_0_8px_rgba(255,255,255,1),0_0_16px_rgba(255,105,180,0.9)]" />
                      </>
                    )}

                    <div
                      className={`relative z-10 text-3xl transition-all duration-300 ${
                        isSelected
                          ? "scale-110 drop-shadow-[0_0_7px_rgba(255,230,240,1)] drop-shadow-[0_0_18px_rgba(255,105,180,0.9)]"
                          : ""
                      }`}
                    >
                      {RACE_EMOJIS[animal]}
                    </div>

                    <div
                      className={`relative z-10 mt-1 text-xs font-black ${
                        isSelected
                          ? "text-pink-100 drop-shadow-[0_0_7px_rgba(255,105,180,0.9)]"
                          : theme.muted
                      }`}
                    >
                      {animal}
                    </div>

                    {isSelected && (
                      <div className="relative z-10 mt-1 text-[9px] font-black tracking-[0.18em] text-pink-100 drop-shadow-[0_0_6px_rgba(255,105,180,0.9)]">
                        SELECTED
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div
              className={`rounded-2xl border p-4 ${theme.border} ${theme.inner}`}
            >
              <div className="space-y-3">
                {RACE_ANIMALS.map((animal) => (
                  <div key={animal}>
                    <div className="mb-1 flex items-center justify-between text-xs font-bold">
                      <span>
                        {RACE_EMOJIS[animal]} {animal}
                      </span>

                      <span className={theme.muted}>
                        {Math.min(
                          racePositions[animal],
                          100
                        )}
                        %
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className={`h-full rounded-full transition-all duration-150 ${RACE_COLORS[animal]}`}
                        style={{
                          width: `${Math.min(
                            racePositions[animal],
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {raceWinner && (
                <div
                  className={`mt-4 rounded-2xl border p-3 text-center ${theme.border} bg-white/[0.06]`}
                >
                  <div className="text-sm font-black">
                    🏆 {RACE_EMOJIS[raceWinner]}{" "}
                    {raceWinner} 승리!
                  </div>

                  <div
                    className={`mt-1 text-xs ${theme.muted}`}
                  >
                    {selectedAnimal === raceWinner
                      ? "선택한 동물이 1등했습니다!"
                      : `선택한 ${RACE_EMOJIS[selectedAnimal]} ${selectedAnimal}은(는) 아쉽게도 패배했습니다.`}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={startRace}
              disabled={isRacing}
              className={`mt-4 w-full rounded-2xl bg-gradient-to-r px-5 py-3 font-black shadow-lg transition-all duration-[1800ms] hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 ${theme.button}`}
            >
              {isRacing
                ? "🏇 경주 진행 중..."
                : "🏇 경주 시작"}
            </button>
          </div>

          {/* 하잉로우 */}
          <div
            className={`rounded-[28px] border p-5 backdrop-blur-xl transition-all duration-[1800ms] ${theme.border} ${theme.card}`}
          >
            <div className="mb-4">
              <div
                className={`text-xs font-bold tracking-[0.2em] ${theme.accent}`}
              >
                HIGH & LOW
              </div>

              <h3 className="mt-1 text-xl font-black">
                🃏 하잉로우
              </h3>

              <p
                className={`mt-1 text-xs leading-relaxed ${theme.muted}`}
              >
                공개된 카드보다 다음 카드가 높을지 낮을지 맞혀보세요.
                <br />
                실제 52장 카드 덱을 사용하며, 사용한 카드는 다시 나오지 않습니다.
              </p>
            </div>

            <div
              className={`flex min-h-[150px] flex-col items-center justify-center rounded-2xl border ${theme.border} ${theme.inner}`}
            >
              {currentCard ? (
                <>
                  <div
                    className={`text-5xl font-black ${
                      currentCard.suit === "♥" ||
                      currentCard.suit === "♦"
                        ? "text-red-300"
                        : ""
                    }`}
                  >
                    {currentCard.label}
                    {currentCard.suit}
                  </div>

                  <div
                    className={`mt-2 text-xs ${theme.muted}`}
                  >
                    남은 카드 {remainingDeck.length}장
                  </div>
                </>
              ) : (
                <span
                  className={`text-sm ${theme.muted}`}
                >
                  카드를 뽑아 게임을 시작하세요
                </span>
              )}
            </div>

            {currentCard &&
              remainingDeck.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div
                    className={`rounded-xl border p-2 text-center ${theme.border} bg-white/[0.04]`}
                  >
                    <div className="text-[10px] font-bold">
                      높음
                    </div>

                    <div className="mt-1 text-sm font-black">
                      {probability.high.toFixed(1)}%
                    </div>
                  </div>

                  <div
                    className={`rounded-xl border p-2 text-center ${theme.border} bg-white/[0.04]`}
                  >
                    <div className="text-[10px] font-bold">
                      같음
                    </div>

                    <div className="mt-1 text-sm font-black">
                      {probability.same.toFixed(1)}%
                    </div>
                  </div>

                  <div
                    className={`rounded-xl border p-2 text-center ${theme.border} bg-white/[0.04]`}
                  >
                    <div className="text-[10px] font-bold">
                      낮음
                    </div>

                    <div className="mt-1 text-sm font-black">
                      {probability.low.toFixed(1)}%
                    </div>
                  </div>
                </div>
              )}

            {highLowResult && (
              <div
                className={`mt-4 rounded-2xl border p-3 text-center ${theme.border} bg-white/[0.06]`}
              >
                <div className="text-sm font-black">
                  {highLowResult}
                </div>
              </div>
            )}

            {currentCard &&
              remainingDeck.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      playHighLow("high")
                    }
                    className={`rounded-2xl bg-gradient-to-r px-3 py-3 text-sm font-black shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 ${theme.button}`}
                  >
                    ⬆️ 높음
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      playHighLow("same")
                    }
                    className={`rounded-2xl bg-gradient-to-r px-3 py-3 text-sm font-black shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 ${theme.button}`}
                  >
                    🟰 같음
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      playHighLow("low")
                    }
                    className={`rounded-2xl bg-gradient-to-r px-3 py-3 text-sm font-black shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 ${theme.button}`}
                  >
                    ⬇️ 낮음
                  </button>
                </div>
              )}

            {(currentCard ||
              highLowWinStreak > 0 ||
              highLowLoseStreak > 0) && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div
                  className={`rounded-xl border p-2 text-center ${theme.border} bg-white/[0.04]`}
                >
                  <div className="text-[10px] font-bold">
                    🔥 연승
                  </div>

                  <div className="mt-1 text-sm font-black">
                    {highLowWinStreak}연승
                  </div>
                </div>

                <div
                  className={`rounded-xl border p-2 text-center ${theme.border} bg-white/[0.04]`}
                >
                  <div className="text-[10px] font-bold">
                    💥 연패
                  </div>

                  <div className="mt-1 text-sm font-black">
                    {highLowLoseStreak}연패
                  </div>
                </div>
              </div>
            )}

            {!currentCard ||
            remainingDeck.length === 0 ? (
              <button
                type="button"
                onClick={startHighLow}
                className={`mt-4 w-full rounded-2xl bg-gradient-to-r px-5 py-3 font-black shadow-lg transition-all duration-[1800ms] hover:-translate-y-0.5 active:translate-y-0 ${theme.button}`}
              >
                🃏{" "}
                {currentCard
                  ? "새 게임 시작"
                  : "카드 뽑기"}
              </button>
            ) : null}
          </div>
        </section>

        <footer className="pb-5 pt-10 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="text-2xl">
              {timePeriod === "night"
                ? "🌕"
                : theme.moon}
            </span>

            <SongpyeonIcon className="h-10 w-14" />

            <span className="text-2xl">
              🐇
            </span>
          </div>

          <p
            className={`text-xs transition-colors duration-[1800ms] ${theme.muted}`}
          >
            우정잉 랜덤토크 질문 뽑기 · 즐거운 한가위 보내세요
          </p>
        </footer>
      </div>

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

        @keyframes raceNeon {
          0%,
          100% {
            box-shadow:
              0 0 7px rgba(255, 182, 193, 0.85),
              0 0 18px rgba(255, 105, 180, 0.55),
              0 0 30px rgba(255, 105, 180, 0.2),
              inset 0 0 12px rgba(255, 182, 193, 0.1);
          }

          50% {
            box-shadow:
              0 0 10px rgba(255, 210, 220, 1),
              0 0 26px rgba(255, 105, 180, 0.85),
              0 0 44px rgba(255, 105, 180, 0.38),
              inset 0 0 20px rgba(255, 182, 193, 0.2);
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