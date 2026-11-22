// =====================================================================
//  SITE SETTINGS  (자주 바뀌는 안내 문구 모음)
//  - homeNewsCount: Home의 Group News에 보여줄 최신 소식 개수. 전체 기록은 News 페이지에 모두 나와요.
//  - hiring: 박사후 연구원 등 모집 공고. show: false 로 바꾸면 숨겨져요.
//  - lectures: Lectures 페이지 강의 목록.
//    아이콘은 과목 이름으로 자동 선택돼요. 직접 고르려면 icon: "math" "factory" "tools" "code" "book" 중 하나를 넣으세요.
//  - coverScenes: Home 커버에 랜덤으로 나오는 연구 애니메이션.
//    "energy" "spheroid" "plasmonic" "neural" 중 원하는 것만 남기세요.
//  - seasons: 특별한 날에는 Home 큰 문장 끝의 마침표(.)가 몇 초마다 아이콘으로 뿅 바뀌었다가 다시 점으로 돌아와요.
//    할로윈 10.25~10.31 호박, 크리스마스 12.24~12.25 산타모자/캔디케인/눈사람(여러 개면 들어올 때마다 하나를 랜덤으로), 설날(전날~다음날) 까치, 추석(전날~다음날) 보름달, 스승의 날(5.15) 카네이션, 교수님 생신 케이크.
//    설날·추석은 브라우저의 한국 음력 달력으로 매년 자동 계산돼요(따로 적을 필요 없음).
//    미리 보기: 주소 끝에 ?season=halloween (또는 christmas, seollal, chuseok, teachers, birthday) 를 붙이세요.
// =====================================================================

window.SITE = {
  homeNewsCount: 10,
  hiring: {
    show: true,
    title: "박사후 연구원 초빙",
    text: "시뮬레이션 기반으로 차세대 배터리 설계 연구를 진행할 박사님을 모십니다. 관심 있으신 박사님은 jsong@sogang.ac.kr로 연락 부탁 드립니다.",
    // English version, shown on phones when English is selected in the Join card
    titleEn: "Postdoctoral researcher wanted",
    textEn: "We are looking for a postdoctoral researcher to work on simulation-based design of next-generation batteries. If you are interested, please contact jsong@sogang.ac.kr."
  },
  lectures: [
    {
      semester: "1st semester",
      courses: [
        {
          name: "Engineering Mathematics I",
          sub: "공업수학 I"
        },
        {
          name: "생산공정",
          sub: "Manufacturing Processes"
        },
        {
          name: "기계제작 실습",
          sub: "Machine Fabrication Practice"
        }
      ]
    },
    {
      semester: "2nd semester",
      courses: [
        {
          name: "Engineering Mathematics II",
          sub: "공업수학 II"
        },
        {
          name: "C 프로그래밍 기초",
          sub: "Fundamentals of C Programming"
        }
      ]
    }
  ],
  coverScenes: ["energy", "spheroid", "plasmonic", "neural"],
  seasons: {
    birthday: "02-16"
  }
};
