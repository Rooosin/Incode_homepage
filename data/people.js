// =====================================================================
//  TEAM
//  - PI: 교수님 정보
//  - MEMBERS: 그룹별 현재 멤버. 사진은 img/people/ 에 넣으세요 (정사각형에 가까운 사진 권장).
//  - 논문은 자동으로 붙어요: publications.js 저자 목록에 이 사람 이름(name)이 있으면 카드에 저절로 나와요.
//    논문에 이름이 다르게 적혀 있으면 aka 에 그 표기를 넣으세요. 예) aka: ["Chaeeun Sung"]
//    publications.js 에 없는 논문·수상은 publications: ["글자 그대로"] 로 따로 적으면 함께 나와요.
//  - ALUMNI: 졸업생. 멤버가 졸업하면 MEMBERS 에서 지우고 여기 맨 위에 추가하세요.
//    position 이 비어 있으면 "Current position not listed" 로 보여요.
// =====================================================================

window.PEOPLE = {
  PI: {
    name: "Jihwan Song",
    photo: "people/jihwan-song.jpg",
    role: "Associate Professor, Department of Mechanical Engineering, Sogang University",
    phone: "+82-2-705-8639",
    email: "jsong@sogang.ac.kr",
    address: "AS-613, Department of Mechanical Engineering, Sogang University, 35 Baekbeom-ro, Mapo-gu, Seoul, Korea",
    experience: [
      {
        when: "Sep. 2025 – Present",
        what: "Associate Professor",
        where: "Sogang University, Seoul, Korea",
        current: true
      },
      {
        when: "Sep. 2017 – Aug. 2025",
        what: "Assistant / Associate Professor",
        where: "Hanbat National University, Daejeon, Korea"
      },
      {
        when: "Sep. 2016 – Aug. 2017",
        what: "Postdoctoral Researcher",
        where: "University of California, Berkeley, USA\nAdvisor: Professor Luke P. Lee"
      },
      {
        when: "Mar. 2015 – Aug. 2016",
        what: "Postdoctoral Researcher",
        where: "Sogang University, Seoul, Korea\nAdvisor: Professor Dongchoul Kim"
      }
    ],
    education: [
      {
        when: "Feb. 2015",
        what: "Ph.D., Mechanical Engineering",
        where: `Sogang University, Seoul, Korea\nAdvisor: Professor Dongchoul Kim
Dissertation: Development of multi-physics design system based on phase field model for nano/microstructures`
      },
      {
        when: "Aug. 2009",
        what: "M.S., Mechanical Engineering",
        where: "Sogang University, Seoul, Korea"
      },
      {
        when: "Aug. 2007",
        what: "B.S., Mechanical Engineering",
        where: "Sogang University, Seoul, Korea"
      }
    ]
  },
  MEMBERS: [
    {
      group: "Ph.D. candidates",
      people: [
        {
          name: "Seunggyun Byeon",
          photo: "people/seunggyun-byeon.jpg",
          position: "Integrated Master's & Doctoral Program",
          interests: [
            "AI-driven multiscale & multiphysics design of Sodium-ion battery system",
            "AI-driven multiscale & multiphysics design of energy harvesting system"
          ],
          education: ["2026 B.S., Mechanical Engineering"],
          email: "sgbyeon@sogang.ac.kr"
        }
      ]
    },
    {
      group: "M.S. candidates",
      people: [
        {
          name: "Minjeong Lee",
          photo: "people/minjeong-lee.jpg",
          position: "Master's Program",
          interests: [
            "AI-driven multiscale & multiphysics design of cell sorting system",
            "Multiscale & multiphysics design of molecular diagnostic system"
          ],
          education: ["2026 B.S., Mechanical Engineering"],
          email: "minjeong@sogang.ac.kr"
        },
        {
          name: "Heesoo Jeong",
          photo: "people/heesoo-jeong.jpg",
          position: "Master's Program",
          interests: ["Multiscale & multiphysics design of molecular diagnostic system"],
          education: ["2026 B.S., Mechanical Engineering"],
          email: "heesoo@sogang.ac.kr"
        }
      ]
    },
    {
      group: "URECA fellows",
      people: [
        {
          name: "Seongwoo Hong",
          photo: "people/seongwoo-hong.jpg",
          position: "URECA Fellow",
          education: ["Mar. 2021 – Present, B.S., Mechanical Engineering"],
          email: "dmagnglgl@sogang.ac.kr"
        }
      ]
    },
    {
      group: "Undergraduate interns",
      people: [
        {
          name: "Minseok Kim",
          photo: "people/minseok-kim.jpg",
          position: "Undergraduate Intern",
          education: ["Mar. 2023 – Present, B.S., Mechanical Engineering"],
          email: "mskim03@sogang.ac.kr"
        }
      ]
    }
  ],
  ALUMNI: [
    {
      name: "Jiseok Han",
      position: "The University of Utah (Ph.D program)",
      education: [
        "2026 M.S., Mechanical Engineering, Hanbat National University",
        "2024 B.S., Mechanical Engineering, Hanbat National University"
      ]
    },
    {
      name: "Minjoong Kim",
      position: "Okinawa Institute of Science and Technology (OIST)",
      education: [
        "2026 M.S., Mechanical Engineering, Hanbat National University",
        "2024 B.S., Mechanical Engineering, Hanbat National University"
      ]
    },
    {
      name: "Chae eun Sung",
      aka: ["Chaeeun Sung"],
      position: "Korea Automotive Technology Institute",
      education: [
        "2025 M.S., Mechanical Engineering, Hanbat National University",
        "2023 B.S., Mechanical Engineering, Hanbat National University"
      ],
      publications: [
        "Multiphysics modeling of the influence of initial pressure on mechanical and electrochemical performance of all-solid-state batteries, Yoon Koo Lee†, Chaeeun Sung, Jiyeon Kim, Chaemin Hong, Jinnil Choi*, Journal of Energy Storage (IF: 9.4, Q1-15%), 2024.04. [Link ↗](https://doi.org/10.1016/j.est.2024.110431)"
      ]
    },
    {
      name: "Hyunwoo Lim",
      position: "",
      education: [
        "2025 M.S., Mechanical Engineering, Hanbat National University",
        "2023 B.S., Mechanical Engineering, Hanbat National University"
      ]
    },
    {
      name: "Subeen Kim",
      position: "SIMMTECH Co., Ltd.",
      education: [
        "2025 M.S., Mechanical Engineering, Hanbat National University",
        "2023 B.S., Mechanical Engineering, Hanbat National University"
      ]
    },
    {
      name: "Jun Keun Chae",
      position: "Korea University (Graduate school)",
      education: ["2021 B.S., Mechanical Engineering, Hanbat National University"]
    },
    {
      name: "Myungseo Lee",
      position: "AustemGTC",
      education: ["2024 B.S., Mechanical Engineering, Hanbat National University"]
    },
    {
      name: "Sijeong Lee",
      position: "Mutech Korea",
      education: ["2022 B.S., Mechanical Engineering, Hanbat National University"]
    },
    {
      name: "Yun Kim",
      position: "University of Minnesota Twin Cities (Ph.D program)",
      education: [
        "2022 M.S., Mechanical Engineering, Hanbat National University",
        "2020 B.S., Mechanical Engineering, Hanbat National University"
      ]
    }
  ]
};
