/*
 * Dreaming Cradle 위키 — 콘텐츠 데이터
 *
 * 텍스트는 전부 이 파일에서 관리합니다. 값이 null 이면 화면에 "입력 예정" 자리표시가 나옵니다.
 *
 * 글 쓰는 법
 *   - 문단 나누기: 빈 줄 한 줄 ("\n\n")
 *   - 목록: 줄 맨 앞에 "* "
 *   - 다른 문서로 링크: [[ian]] 또는 [[ian|이안]]
 *     (캐릭터 id 또는 문서 id: story, world, endings, items, notes, characters)
 *   - 굵게: **텍스트**
 */
window.WIKI = {
  site: {
    title: "Dreaming Cradle",
    wikiName: "Dreaming Cradle 위키",
    author: "심혜진",
    year: 2026,
    logo: "assets/img/logo.png",
    header: "assets/img/header.png",
    // 아래 두 전시용 기능은 전시 PC에서 "전시용 실행.bat"으로 열었을 때만 동작합니다. (웹 주소로 들어오면 꺼짐)
    // 관람객이 이 시간(초) 동안 아무것도 안 만지면 대문으로 돌아갑니다. 0 이면 끔.
    idleSeconds: 120,
    // true 면 우클릭 메뉴, 이미지 드래그, 텍스트 선택을 막습니다 (전시용).
    kiosk: true,
  },

  home: {
    // 대문 슬라이드 (순서대로, 몇 초마다 자동으로 넘어갑니다)
    slideSeconds: 7,
    // caption = 아래 바의 굵은 제목, desc = 그 아래 작은 설명 (선택)
    slides: [
      { src: "assets/img/slide/slide-01.png", caption: "Dreaming Cradle 타이틀 화면" },
      { src: "assets/img/slide/slide-02.png", caption: "꿈속에서 만난 친구들" },
      { src: "assets/img/slide/slide-03.png", caption: "캐릭터 스탠딩" },
      { src: "assets/img/slide/slide-04.png", caption: "LOADING . . ." },
    ],
    // 사이드바·푸터에 들어가는 한 줄 소개
    tagline: "꿈속 세계, 그리고 그곳에 숨겨진 감정들의 기록.",
    notice:
      "본 위키에는 **《Dreaming Cradle》의 스토리, 캐릭터 설정 및 엔딩에 관한 스포일러**가 포함되어 있습니다. 작품을 처음 접하는 경우 열람에 주의해 주세요.",
    welcome:
      "꿈속 세계, 그리고 그곳에 숨겨진 감정들의 기록.\n《Dreaming Cradle》의 캐릭터와 세계관, 스토리를 기록하는 아카이브에 오신 것을 환영합니다.",
    about:
      "**《Dreaming Cradle(꿈꾸는 요람)》**은 꿈속 세계를 배경으로 한 스토리 중심의 2D 어드벤처 게임 브랜드입니다. 주인공 [[ian|이안]]은 낯선 꿈속에서 서로 다른 감정을 상징하는 다섯 캐릭터를 만나 그들의 기억과 이야기를 탐색합니다.\n\n희망, 고립, 욕망, 부정, 우울을 상징하는 캐릭터들을 통해 자신의 내면을 이해하고 감정을 마주하는 과정을 담았습니다. 아기자기한 캐릭터 디자인과 몽환적인 분위기에 호러 요소를 결합해 귀여움과 불안함이 공존하는 세계를 표현합니다.",
  },

  // 순서 = 위키에 나오는 순서
  characters: [
    {
      id: "ian",
      name: "이안",
      en: "IAN",
      emotion: "주인공",
      color: "#8E3B5E",
      swatches: ["#5E2236", "#8E3B5E", "#C9B8C8"],
      images: { ld: "assets/img/char/ian-ld.png", sd: "assets/img/char/ian-sd.png" },
      infobox: [
        { label: "이름", value: "이안 (IAN)" },
        { label: "역할", value: "주인공" },
        { label: "성별", value: "여성" },
        { label: "나이", value: "23세" },
        { label: "등장", value: "전체" },
        { label: "키워드", value: "자기 탐색, 기억, 성장" },
      ],
      quote: "여기가 어디든, 일단 나가야겠어.",
      summary:
        "낯선 꿈속 세계에 들어오게 된 23세의 학생. 꿈속에서 다섯 감정 캐릭터를 만나며 자신이 외면해 왔던 감정과 기억을 마주하게 됩니다. 이안의 여정은 자기 자신을 이해하고 성장해 나가는 과정입니다.",
      sections: {
        appearance: "아트북의 이안 캐릭터 원화 참고.",
        personality: "신중하고 사려 깊은 성격. 낯선 상황에서도 주변을 살피며 상황을 파악하려 합니다.",
        story:
          "평범한 일상을 보내던 이안은 알 수 없는 이유로 꿈속 세계에 들어갑니다. 그곳에서 서로 다른 감정을 상징하는 인물들을 만나고, 그들의 기억을 탐색하며 자신의 내면을 알아갑니다.",
        trivia: "* DREAM ARCHIVE / 001\n* SUBJECT : IAN\n* LOCATION : UNKNOWN DREAM\n* STATUS : SELF-DISCOVERY\n* 상징 키워드: 자기 탐색, 기억, 성장",
      },
    },
    {
      id: "lumi",
      name: "루미",
      en: "LUMI",
      emotion: "긍정",
      color: "#F08A6E",
      swatches: ["#F2A07E", "#4E86C4", "#E86E98"],
      images: { ld: "assets/img/char/lumi-ld.png", sd: "assets/img/char/lumi-sd.png" },
      infobox: [
        { label: "이름", value: "루미 (LUMI)" },
        { label: "상징 감정", value: "희망, 긍정" },
        { label: "성별", value: "여성" },
        { label: "나이", value: "불명" },
        { label: "등장", value: "챕터 1 「희망의 날개」" },
        { label: "관련 공간", value: "희망의 날개" },
        { label: "키워드", value: "희망, 용기, 긍정" },
      ],
      quote: "괜찮아! 아직 해볼 수 있는 게 많잖아.",
      summary:
        "희망과 긍정을 상징하는 밝고 활동적인 캐릭터. 두려움에 잠긴 꿈에 빛을 가져오는 존재지만, 꿈의 경계가 무너지면서 자신의 힘을 잃어가고 있습니다.",
      sections: {
        appearance: "아트북의 루미 캐릭터 원화 참고.",
        personality: "밝고 적극적이며, 어려운 상황에서도 긍정적인 가능성을 찾으려 합니다.",
        story:
          "꿈의 경계가 무너지면서 루미는 자신의 힘과 날개를 잃어갑니다. [[ian|이안]]은 루미와 함께 긍정적인 기억을 모으며 그녀의 힘을 되찾으려 합니다. 이 과정에서 희망은 단순히 밝은 감정이 아니라 다시 시도할 수 있게 하는 힘이라는 점을 보여줍니다.",
        trivia: "* DREAM ARCHIVE / 002\n* SUBJECT : LUMI\n* LOCATION : DREAM WORLD\n* STATUS : HOPE ACTIVATED\n* 관련 공간: 희망의 날개\n* 상징 키워드: 희망, 용기, 긍정",
      },
    },
    {
      id: "nemo",
      name: "네모",
      en: "NEMO",
      emotion: "고립",
      color: "#7D6FB0",
      swatches: ["#3A3F86", "#7D7790", "#8E6FB8"],
      images: { ld: "assets/img/char/nemo-ld.png", sd: "assets/img/char/nemo-sd.png" },
      infobox: [
        { label: "이름", value: "네모 (NEMO)" },
        { label: "상징 감정", value: "고립, 단절" },
        { label: "성별", value: "여성" },
        { label: "나이", value: "불명" },
        { label: "등장", value: "챕터 2 「혼자만의 방」" },
        { label: "관련 공간", value: "혼자만의 방" },
        { label: "키워드", value: "고립, 외로움, 관계와 거리" },
      ],
      quote: "혼자 있는 게 편해. 그냥, 익숙해서 그래.",
      summary:
        "고립과 단절을 상징하는 내향적인 캐릭터. 타인과의 관계를 끊고 자신만의 세계에 머물지만, 그 안에는 혼자 있고 싶은 마음과 누군가에게 다가가고 싶은 마음이 함께 존재합니다.",
      sections: {
        appearance: "아트북의 네모 캐릭터 원화 참고.",
        personality: "소극적이고 내향적이며, 다른 사람과 거리를 두려는 경향이 있습니다.",
        story:
          "네모는 타인과의 관계를 끊고 자신만의 공간에 머뭅니다. [[ian|이안]]은 네모의 기억을 탐색하며 네모가 관계에서 멀어진 이유를 알아갑니다. 네모 역시 혼자 있는 것과 외로움을 느끼는 것이 반드시 같은 의미는 아니라는 사실을 마주하게 됩니다.",
        trivia: "* DREAM ARCHIVE / 003\n* SUBJECT : NEMO\n* LOCATION : DREAM WORLD\n* STATUS : SOCIAL WITHDRAWAL\n* 관련 공간: 혼자만의 방\n* 상징 키워드: 고립, 외로움, 관계와 거리",
      },
    },
    {
      id: "velvet",
      name: "벨벳",
      en: "VELVET",
      emotion: "욕망",
      color: "#E2649B",
      swatches: ["#F08BB0", "#F7C3D3", "#3F5AA8"],
      images: { ld: "assets/img/char/velvet-ld.png", sd: "assets/img/char/velvet-sd.png" },
      infobox: [
        { label: "이름", value: "벨벳 (VELVET)" },
        { label: "상징 감정", value: "욕망, 집착" },
        { label: "성별", value: "여성" },
        { label: "나이", value: "불명" },
        { label: "등장", value: "챕터 3 「거울정원」" },
        { label: "관련 공간", value: "거울정원" },
        { label: "키워드", value: "욕망, 집착, 선택" },
      ],
      quote: "원하는 걸 얻으려면, 그만큼 감수해야 하는 법이야.",
      summary:
        "욕망과 집착을 상징하는 매력적이고 자기표현이 강한 캐릭터. 사람들의 소망과 욕구를 비추는 존재로, [[ian|이안]]이 자신이 진정으로 원하는 것이 무엇인지 생각하도록 만듭니다.",
      sections: {
        appearance: "아트북의 벨벳 캐릭터 원화 참고.",
        personality: "자신감 있고 매력적이며, 자신의 생각과 욕구를 분명하게 표현합니다.",
        story:
          "벨벳은 사람들이 마음속에 품은 소망과 욕망을 비춥니다. [[ian|이안]]은 벨벳과의 만남을 통해 자신이 진정으로 원하는 것이 무엇인지 고민하고 선택의 결과를 마주합니다. 벨벳 또한 욕망 자체가 잘못된 것이 아니라, 그것을 어떤 방향으로 이끄는지가 중요하다는 사실을 알아갑니다.",
        trivia: "* DREAM ARCHIVE / 004\n* SUBJECT : VELVET\n* LOCATION : LAYER OF DESIRE\n* STATUS : DESIRE INTENSIFICATION\n* 관련 공간: 거울정원\n* 상징 키워드: 욕망, 집착, 선택",
      },
    },
    {
      id: "nox",
      name: "녹스",
      en: "NOX",
      emotion: "부정",
      color: "#4F9A6A",
      swatches: ["#D9435A", "#7DBB8A", "#E87FA6"],
      images: { ld: "assets/img/char/nox-ld.png", sd: "assets/img/char/nox-sd.png" },
      infobox: [
        { label: "이름", value: "녹스 (NOX)" },
        { label: "상징 감정", value: "부정, 자기방어" },
        { label: "성별", value: "여성" },
        { label: "나이", value: "불명" },
        { label: "등장", value: "챕터 4 「그림자 축제」" },
        { label: "관련 공간", value: "그림자 축제" },
        { label: "키워드", value: "부정, 방어, 불안" },
      ],
      quote: "됐어. 어차피 네가 뭘 안다고.",
      summary:
        "부정과 자기방어를 상징하는 날카롭고 반항적인 캐릭터. 공격적인 태도와 부정적인 말로 자신의 감정을 숨기며, 그 이면에는 불안과 불만, 상처가 자리하고 있습니다.",
      sections: {
        appearance: "아트북의 녹스 캐릭터 원화 참고.",
        personality: "까칠하고 반항적이며, 타인에게 자신의 약한 모습을 드러내는 것을 꺼립니다.",
        story:
          "녹스는 부정적인 생각과 감정을 날카로운 태도 뒤에 숨깁니다. [[ian|이안]]은 녹스의 과거를 이해하기 위해 그의 기억을 탐색하고, 녹스가 왜 그런 방식으로 자신을 방어하게 되었는지 알아갑니다. 녹스는 자신의 감정을 무조건 억누르거나 타인에게 공격적으로 드러내는 대신, 감정을 다루는 방법을 배워갑니다.",
        trivia: "* DREAM ARCHIVE / 005\n* SUBJECT : NOX\n* LOCATION : LAYER OF NEGATION\n* STATUS : NEGATIVITY\n* 관련 공간: 그림자 축제\n* 상징 키워드: 부정, 방어, 불안",
      },
    },
    {
      id: "pluvia",
      name: "플루비아",
      en: "PLUVIA",
      emotion: "우울",
      color: "#6E78BE",
      swatches: ["#8591C8", "#2F3570", "#F4F4F8"],
      images: { ld: "assets/img/char/pluvia-ld.png", sd: "assets/img/char/pluvia-sd.png" },
      infobox: [
        { label: "이름", value: "플루비아 (PLUVIA)" },
        { label: "상징 감정", value: "우울, 무기력" },
        { label: "성별", value: "여성" },
        { label: "나이", value: "불명" },
        { label: "등장", value: "챕터 5 「우울의 영역」" },
        { label: "관련 공간", value: "우울의 영역" },
        { label: "키워드", value: "우울, 무기력, 상실" },
      ],
      quote: "오늘은 아무것도 하고 싶지 않아.",
      summary:
        "우울과 무기력을 상징하는 조용하고 내향적인 캐릭터. 깊은 슬픔에 잠긴 기억을 간직하고 있으며, [[ian|이안]]은 플루비아의 이야기를 통해 상실과 아픔을 마주하게 됩니다.",
      sections: {
        appearance: "아트북의 플루비아 캐릭터 원화 참고.",
        personality: "조용하고 내향적이며, 감정을 적극적으로 표현하기보다 안으로 가라앉히는 편입니다.",
        story:
          "플루비아의 깊은 절망은 주변의 꿈을 슬픔으로 물들입니다. [[ian|이안]]은 플루비아의 기억 속에서 상실과 고통을 경험하고, 슬픔을 외면하거나 억지로 없애기보다 자신의 감정으로 인정하는 법을 배워갑니다.",
        trivia: "* DREAM ARCHIVE / 006\n* SUBJECT : PLUVIA\n* LOCATION : LAYER OF DEPRESSION\n* 관련 공간: 우울의 영역\n* 상징 키워드: 우울, 무기력, 상실",
      },
    },
  ],

  story: {
    summary:
      "평범한 학생 [[ian|이안]]은 어느 날 알 수 없는 꿈속 세계에 들어오게 됩니다. 그곳에서 이안은 희망, 고립, 욕망, 부정, 우울을 상징하는 다섯 캐릭터를 만나고, 각 인물의 기억과 감정이 남아 있는 공간을 탐색합니다.\n\n이안은 그들의 이야기를 통해 자신이 외면했던 감정과 마주하며, 꿈속 세계에 숨겨진 단서를 하나씩 발견합니다. [[world|꿈의 조각]]을 모으는 과정은 이안이 자신의 내면을 이해하고 성장하는 여정으로 이어집니다.",
    // character: 해당 챕터의 중심 캐릭터 id
    chapters: [
      {
        no: 1, title: "희망의 날개", character: "lumi", map: "assets/img/map/chapter-1.jpg",
        text: "이안은 꿈속 세계에서 [[lumi|루미]]를 만나게 됩니다. 힘을 잃어가는 루미를 돕기 위해 긍정적인 기억의 조각을 모으고, 희망이 사라진 공간에 다시 빛을 되찾으려 합니다. 이 과정에서 이안은 어려운 상황에서도 다시 시도할 수 있게 하는 희망의 의미를 알아갑니다.",
      },
      {
        no: 2, title: "혼자만의 방", character: "nemo", map: "assets/img/map/chapter-2.jpg",
        text: "이안은 자신만의 방에 머물며 타인과 거리를 두는 [[nemo|네모]]를 만납니다. 네모의 기억을 조사하며 관계가 끊어진 이유와 외로움의 흔적을 발견합니다. 이안과 네모는 혼자 있는 것과 외로움을 느끼는 것이 다를 수 있다는 사실을 마주합니다.",
      },
      {
        no: 3, title: "거울정원", character: "velvet", map: "assets/img/map/chapter-3.jpg",
        text: "거울이 가득한 정원에서 이안은 욕망을 비추는 [[velvet|벨벳]]을 만납니다. 거울 속에는 인물들이 원하는 모습과 감춰둔 욕구가 나타납니다. 이안은 자신이 진정으로 원하는 것이 무엇인지 고민하고, 욕망에 따른 선택과 책임을 생각하게 됩니다.",
      },
      {
        no: 4, title: "그림자 축제", character: "nox", map: "assets/img/map/chapter-4.jpg",
        text: "이안은 부정적인 감정과 자기방어를 상징하는 [[nox|녹스]]를 만납니다. 축제의 화려한 모습 뒤에는 불안과 분노, 감추어진 기억이 남아 있습니다. 이안은 녹스의 행동만을 판단하기보다 그 이면의 이유를 이해하려 하고, 녹스는 자신의 감정을 다른 방식으로 표현하는 법을 배웁니다.",
      },
      {
        no: 5, title: "우울의 영역", character: "pluvia", map: "assets/img/map/chapter-5.jpg",
        text: "깊은 슬픔이 퍼져 있는 공간에서 이안은 [[pluvia|플루비아]]의 기억을 마주합니다. 상실과 무기력으로 가득한 기억을 따라가며 이안은 슬픔을 피하거나 부정하는 것만으로는 해결할 수 없다는 사실을 깨닫습니다. 마지막으로 자신의 기억과 감정을 돌아보며 꿈속 여정의 의미를 이해하게 됩니다.",
      },
    ],
  },

  world: {
    summary: null,
    sections: [
      {
        title: "세계관 개요",
        text: "《Dreaming Cradle》의 세계는 꿈과 기억, 감정이 서로 연결된 공간입니다. 이곳에는 서로 다른 감정을 상징하는 [[characters|캐릭터]]들이 존재하며, 각자의 기억과 감정은 특정 공간의 모습과 분위기에 영향을 미칩니다. [[ian|이안]]은 꿈속 장소를 탐색하고 인물들의 이야기를 알아가며 세계에 숨겨진 단서를 발견합니다.",
      },
      {
        title: "꿈속 세계",
        text: "꿈속 세계는 현실과 닮아 있으면서도 논리적으로 설명하기 어려운 공간입니다. 각 장소는 그곳에 머무는 캐릭터의 감정과 기억을 반영합니다.\n\n* **희망의 날개** — [[lumi|루미]]\n* **혼자만의 방** — [[nemo|네모]]\n* **거울정원** — [[velvet|벨벳]]\n* **그림자 축제** — [[nox|녹스]]\n* **우울의 영역** — [[pluvia|플루비아]]\n\n위 다섯 공간은 각 감정의 특성을 시각적으로 표현하는 주요 공간입니다.",
      },
      {
        title: "꿈의 조각",
        text: "꿈의 조각은 꿈속 공간에 흩어진 기억과 감정의 흔적입니다. 이안은 조각을 발견하면서 캐릭터의 과거와 감정에 대한 정보를 얻고, 꿈속 세계에 숨겨진 이야기를 조금씩 이해하게 됩니다.\n\n* **희망의 조각** — [[lumi|루미]]와 연결된 기억\n* **고립의 조각** — [[nemo|네모]]와 연결된 기억\n* **욕망의 조각** — [[velvet|벨벳]]과 연결된 기억\n* **부정의 조각** — [[nox|녹스]]와 연결된 기억\n* **우울의 조각** — [[pluvia|플루비아]]와 연결된 기억\n* **기억의 조각** — [[ian|이안]]의 과거와 꿈의 정체에 관한 단서",
      },
    ],
  },

  endings: {
    summary: "엔딩은 [[ian|이안]]이 꿈속에서 어떤 선택을 하고, 감정과 기억을 얼마나 마주했는지에 따라 달라집니다.",
    list: [
      { type: "TRUE ENDING", title: "꿈의 끝에서", text: "다섯 감정의 기억을 모두 마주하고 자신의 감정을 인정한 뒤 꿈에서 깨어나는 결말." },
      { type: "NORMAL ENDING", title: "불완전한 깨어남", text: "꿈에서 탈출하지만 일부 기억과 단서를 이해하지 못한 채 현실로 돌아가는 결말." },
      { type: "BAD ENDING", title: "잠들어 버린 마음", text: "중요한 감정을 반복해서 외면하다 꿈속에 남게 되는 결말." },
      { type: "SECRET ENDING", title: "요람의 주인", text: "숨겨진 기록과 특별한 아이템을 모아 꿈의 정체에 관한 추가 단서를 발견하는 결말." },
    ],
  },

  items: {
    summary: "꿈속에서 발견하는 아이템은 탐색, 기억 확인, 공간 해금 등 다양한 역할을 합니다. 아래 인벤토리에서 칸을 눌러 아이템을 살펴보세요.",
    inventoryTitle: "이안의 아이템 인벤토리",
    // 인벤토리 탭. group 이 같은 오브젝트끼리 묶입니다. ("key" = 아래 list 의 주요 아이템)
    tabs: [
      { id: "all", label: "전체" },
      { id: "lumi", label: "긍정 상점" },
      { id: "nemo", label: "고립 상점" },
      { id: "velvet", label: "욕망 상점" },
      { id: "nox", label: "부정 상점" },
      { id: "pluvia", label: "우울 상점" },
      { id: "key", label: "주요 아이템" },
    ],
    groups: {
      lumi: "루미의 긍정 상점",
      nemo: "네모의 고립 상점",
      velvet: "벨벳의 욕망 상점",
      nox: "녹스의 부정 상점",
      pluvia: "플루비아의 우울 상점",
    },
    // 인벤토리 칸에 들어가는 아이템 (순서대로). text 를 채우면 정보창에 설명이 나옵니다.
    objects: [
      { name: "곰인형", icon: "assets/img/item/bear.png", group: "pluvia", text: null },
      { name: "파란 물약", icon: "assets/img/item/potion.png", group: "pluvia", text: null },
      { name: "날개 달린 우유", icon: "assets/img/item/milk.png", group: "lumi", text: null },
      { name: "화분", icon: "assets/img/item/plant.png", group: "lumi", text: null },
      { name: "카메라", icon: "assets/img/item/camera.png", group: "lumi", text: null },
      { name: "메모장", icon: "assets/img/item/memo.png", group: "pluvia", text: null },
      { name: "아이스크림", icon: "assets/img/item/icecream.png", group: "pluvia", text: null },
      { name: "종이비행기", icon: "assets/img/item/plane.png", group: "lumi", text: null },
      { name: "하트 편지", icon: "assets/img/item/letter.png", group: "pluvia", text: null },
      { name: "파란 버섯", icon: "assets/img/item/mushroom.png", group: "pluvia", text: null },
      { name: "날개 달린 편지", icon: "assets/img/item/wingletter.png", group: "lumi", text: null },
      { name: "물고기", icon: "assets/img/item/fish.png", group: "lumi", text: null },
      { name: "모니터", icon: "assets/img/item/monitor.png", group: "nox", text: null },
      { name: "폴더", icon: "assets/img/item/folder.png", group: "nox", text: null },
      { name: "메모리 카드", icon: "assets/img/item/memorycard.png", group: "nox", text: null },
      { name: "게임기", icon: "assets/img/item/console.png", group: "nemo", text: null },
      { name: "음표", icon: "assets/img/item/note.png", group: "nemo", text: null },
      { name: "휴대용 게임기", icon: "assets/img/item/gameboy.png", group: "nemo", text: null },
      { name: "마카롱", icon: "assets/img/item/macaron.png", group: "velvet", text: null },
      { name: "하트 상자", icon: "assets/img/item/heartbox.png", group: "velvet", text: null },
      { name: "찻잔", icon: "assets/img/item/teacup.png", group: "velvet", text: null },
    ],
    shops: [
      { title: "루미의 긍정 상점", image: "assets/img/shop-lumi.png", character: "lumi" },
      { title: "플루비아의 우울 상점", image: "assets/img/shop-pluvia.png", character: "pluvia" },
    ],
    // 주요 아이템 (기획). icon 이 없으면 인벤토리에 "?" 칸으로 나옵니다.
    list: [
      { name: "낡은 열쇠", type: "진행", text: "잠긴 문을 여는 진행 아이템" },
      { name: "꿈의 물약", type: "회복", text: "꿈속에서 소모된 상태를 회복하는 아이템" },
      { name: "금이 간 거울", type: "탐색", text: "감춰진 흔적이나 문양을 발견하는 탐색 아이템" },
      { name: "이름 없는 편지", type: "스토리", text: "[[nemo|네모]]의 과거를 추측할 수 있는 스토리 아이템" },
      { name: "낡은 인형", type: "기억", text: "[[nox|녹스]]의 과거와 연결된 기억 아이템" },
      { name: "눈물병", type: "특수", text: "[[pluvia|플루비아]]의 기억을 확인하는 특수 아이템" },
      { name: "멈춘 오르골", type: "비밀", text: "숨겨진 기록이나 [[endings|비밀 엔딩]]과 연결되는 아이템" },
    ],
  },

  notes: {
    sections: [
      {
        title: "제작 의도",
        text: "이 프로젝트는 서로 다른 감정을 캐릭터로 시각화하고, 게임의 스토리와 공간 디자인을 통해 감정의 의미를 탐색하는 것을 목표로 합니다. 플레이어가 캐릭터의 기억과 선택을 따라가며 각 감정을 단순히 긍정적이거나 부정적인 것으로 구분하지 않고, 감정이 생겨나는 이유와 그 의미를 이해하도록 구성했습니다.",
      },
      {
        title: "브랜드 스토리",
        text: "《Dreaming Cradle》은 꿈속 세계를 통해 자신이 미처 알아차리지 못했던 감정과 마주하는 이야기입니다. [[ian|이안]]이 만나는 다섯 캐릭터는 각기 다른 감정을 상징하며, 이들의 이야기는 결국 이안 자신의 내면을 이해하는 과정으로 연결됩니다. 브랜드는 캐릭터 중심의 서사와 세계관을 바탕으로 플레이어가 작품을 해석하고 캐릭터에 공감할 수 있는 경험을 지향합니다.",
      },
      {
        title: "디자인 컨셉",
        text: "시각적 방향성은 아기자기한 캐릭터 디자인과 몽환적인 꿈의 분위기, 은근한 호러 요소의 조합입니다. 캐릭터마다 상징하는 감정에 맞는 색채와 장식, 공간 연출을 적용해 개성을 구분하고, 귀여운 외형과 불안한 분위기의 대비를 통해 독특한 시각적 인상을 전달합니다.\n\n이를 통해 강한 고어 표현 없이도 호기심과 긴장감을 유도하는 감정 중심의 게임 브랜드를 구축하고자 합니다.",
      },
    ],
    credits: [
      { label: "작품명", value: "Dreaming Cradle (꿈꾸는 요람)" },
      { label: "기획 및 디렉션", value: "심혜진" },
      { label: "프로그래밍", value: "클로드" },
      { label: "소셜 디자인", value: "심혜진" },
      { label: "캐릭터 아트", value: "심혜진" },
      { label: "메인 에디터", value: "심혜진" },
      { label: "어시스턴트 디렉터", value: "윤혜진, 김세영, 이동열" },
      { label: "주요 캐릭터", value: "[[ian|이안]], [[lumi|루미]], [[nemo|네모]], [[velvet|벨벳]], [[nox|녹스]], [[pluvia|플루비아]]" },
    ],
    panels: [
      { src: "assets/img/panel-01.png", caption: "졸업전시 판넬 01" },
      { src: "assets/img/panel-02.png", caption: "졸업전시 판넬 02" },
    ],
  },
};
