// =====================================================================
//  SITE SETTINGS  (자주 바뀌는 안내 문구 모음)
//  - homeNewsSince: Home의 Group News에 이 날짜 이후 소식을 모두 보여줘요. (나머지는 News 페이지에)
//  - hiring: 박사후 연구원 등 모집 공고. show: false 로 바꾸면 숨겨져요.
//  - lectures: Lectures 페이지 강의 목록.
//  - coverScenes: Home 커버에 랜덤으로 나오는 연구 애니메이션.
//    "energy" "spheroid" "plasmonic" "neural" 중 원하는 것만 남기세요.
// =====================================================================

window.SITE = {
  homeNewsSince: "2025.09.01",
  hiring: {
    show: true,
    title: "박사후 연구원 초빙",
    text: "시뮬레이션 기반으로 차세대 배터리 설계 연구를 진행할 박사님을 모십니다. 관심 있으신 박사님은 jsong@sogang.ac.kr로 연락 부탁 드립니다."
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
  coverScenes: ["energy", "spheroid", "plasmonic", "neural"]
};
