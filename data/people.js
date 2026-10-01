// =====================================================================
//  TEAM
//  - PI: 교수님 정보
//  - MEMBERS: 그룹별 현재 멤버. 사진은 img/people/ 에 넣으세요 (정사각형에 가까운 사진 권장).
//    publications 에는 publications.js 의 논문 번호(no)를 적으면 제목이 자동으로 연결돼요.
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
        where: "University of California, Berkeley, USA · Advisor: Professor Luke P. Lee"
      },
      {
        when: "Mar. 2015 – Aug. 2016",
        what: "Postdoctoral Researcher",
        where: "Sogang University, Seoul, Korea · Advisor: Professor Dongchoul Kim"
      }
    ],
    education: [
      {
        when: "Feb. 2015",
        what: "Ph.D., Mechanical Engineering",
        where: `Sogang University · Advisor: Professor Dongchoul Kim
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
          publications: [42, 41],
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
          publications: [46],
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
          name: "Gayeon You",
          photo: "people/gayeon-you.jpg",
          position: "Undergraduate Intern",
          education: ["Mar. 2023 – Present, B.S., Mechanical Engineering"],
          email: "ygy404@sogang.ac.kr"
        },
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
      position: "University of Utah (Ph.D program)",
      education: [
        "2026 M.S., Mechanical Engineering, Hanbat National University",
        "2024 B.S., Mechanical Engineering, Hanbat National University"
      ],
      publications: [
        "Mode-dependent energy redistribution in Au nanohole arrays for concurrent photothermal conversion and reduced fluorescence quenching, Jiseok Han, Minki Kim, Jong-Hwan Lee*, Sang Hun Lee*, and Jihwan Song*, Small Structures (IF:8.9, Q1- JIF 20%), 2026.08. [Link ↗](https://doi.org/10.1002/sstr.70590)",
        "Early Diagnosis of Pancreatic Ductal Adenocarcinoma (PDAC) by Using Signal-Enhanced Lateral Flow Immunoassay (SELFI), Sohyeon Jang†, Minsup Shin†, Jiseok Han†, Han-Joo Bae, Yuna Youn, Hye-Seong Cho, Kwanghee Yoo, Jun-Sik Chu, Jaehyun An, Hyejin Chang, Jaehi Kim*, Jihwan Song*, Jong-chan Lee*, Luke P. Lee*, and Bong-Hyun Jun*, Nature Communications (IF:15.7, Q1- JCI 5%), 2026.02. [Link ↗](https://www.nature.com/articles/s41467-026-69204-7)"
      ]
    },
    {
      name: "Minjoong Kim",
      position: "Okinawa Institute of Science and Technology (OIST)",
      education: [
        "2026 M.S., Mechanical Engineering, Hanbat National University",
        "2024 B.S., Mechanical Engineering, Hanbat National University"
      ],
      publications: [
        "Data-driven prediction of induced voltage in CT-based magnetic energy harvesting systems considering nonlinear B–H characteristics, Seunggyun Byeon, Minjoong Kim, and Jihwan Song*, Materials (IF:3.7, Q2), 2026.07. [Link ↗](https://doi.org/10.3390/ma19143002)",
        "B-H curve estimation and air gap optimization for high-performance split core, Minjoong Kim†, Myungseo Lee†, Sijeong Lee, Jaeyun Lee*, and Jihwan Song*, Materials (IF:3.1, Q1- JIF 25%), 2025.01. [Link ↗](https://www.mdpi.com/1996-1944/18/3/644)",
        "Characterization of passive microfluidic mixer with a three-dimensional zig-zag channel for cryo-EM sampling, Byungjin Lee†, Minjoong Kim†, Seoyeon Oh, Dan Bi Lee, Seong-Gyu Lee, Ho Min Kim, Kyung Hyun Kim, Jihwan Song*, and Chang-Soo Lee*, Chemical Engineering Science (IF:4.7, Q2), 2023.08. [Link ↗](https://doi.org/10.1016/j.ces.2023.119161)"
      ]
    },
    {
      name: "Chae eun Sung",
      position: "",
      education: [
        "2025 M.S., Mechanical Engineering, Hanbat National University",
        "2023 B.S., Mechanical Engineering, Hanbat National University"
      ],
      publications: [
        "From microstructure to performance through coupled electrochemical and mechanical insights in all-solid-state batteries, Chaeeun Sung, Jihwan Song*, and Yoon Koo Lee*, Journal of Energy Storage (IF:10.7, Q1- JIF 15%), 2026.08. [Link ↗](https://doi.org/10.1016/j.est.2026.124264)",
        "Multiphysics modeling of the influence of initial pressure on mechanical and electrochemical performance of all-solid-state batteries, Yoon Koo Lee†, Chaeeun Sung, Jiyeon Kim, Chaemin Hong, Jinnil Choi*, Journal of Energy Storage (IF: 9.4), 2024.04. [Link ↗](https://doi.org/10.1016/j.est.2024.110431)"
      ]
    },
    {
      name: "Hyunwoo Lim",
      position: "",
      education: [
        "2025 M.S., Mechanical Engineering, Hanbat National University",
        "2023 B.S., Mechanical Engineering, Hanbat National University"
      ],
      publications: [
        "Modeling and validation of driving performance of electric vehicle converted from internal combustion engine vehicle, Juhyun Park†, Hyunwoo Lim†, Sangjun Kim, Jihwan Song*, and Yoon Koo Lee*, IEEE Transactions on Transportation Electrification (IF:7.0, Q1- JCI 10%), 2024.04. [Link ↗](https://ieeexplore.ieee.org/document/10506683)"
      ]
    },
    {
      name: "Subeen Kim",
      position: "",
      education: [
        "2025 M.S., Mechanical Engineering, Hanbat National University",
        "2023 B.S., Mechanical Engineering, Hanbat National University"
      ],
      publications: [
        "Comparative analysis of sample loop and counting bead–based methods for size-dependent bias in flow cytometry, Hye Ji Shin†, Subeen Kim†, Minjeong Kwak, Inchul Yang, Sang-Ryoul Park, Jihwan Song*, and Ji Youn Lee*, Analytical Chemistry (IF:6.7, Q1- JCI 5%), 2025.11. [Link ↗](https://doi.org/10.1021/acs.analchem.5c03537)",
        "Advanced multiscale modeling of potassium-ion batteries for interplay of electrochemical and mechanical behavior across scales, Subeen Kim, Yun Kim, Yoon Koo Lee*, and Jihwan Song*, Small Structures (IF:13.9, Q1- JIF 10%), 2025.04. [Link ↗](https://onlinelibrary.wiley.com/doi/10.1002/sstr.202400640)"
      ]
    },
    {
      name: "Jun Keun Chae",
      position: "Korea University (Graduate school)",
      education: ["2021 B.S., Mechanical Engineering, Hanbat National University"],
      publications: [
        "Free manipulation system for nanorobot cluster based on complicated multi-coil electromagnetic actuator, Yun Kim, Jun Keun Chae, Jong-Hwan Lee, Eunpyo Choi, Yoon Koo Lee, and Jihwan Song*, Scientific Reports (IF: 4.996, Q1- JCI 15%), 2021.10. [Link ↗](https://www.nature.com/articles/s41598-021-98957-y)"
      ]
    },
    {
      name: "Myungseo Lee",
      position: "AustemGTC",
      education: ["2024 B.S., Mechanical Engineering, Hanbat National University"],
      publications: [
        "B-H curve estimation and air gap optimization for high-performance split core, Minjoong Kim†, Myungseo Lee†, Sijeong Lee, Jaeyun Lee*, and Jihwan Song*, Materials (IF:3.1, Q1- JIF 25%), 2025.01. [Link ↗](https://www.mdpi.com/1996-1944/18/3/644)"
      ]
    },
    {
      name: "Sijeong Lee",
      position: "Mutech Korea",
      education: ["2022 B.S., Mechanical Engineering, Hanbat National University"],
      publications: [
        "B-H curve estimation and air gap optimization for high-performance split core, Minjoong Kim†, Myungseo Lee†, Sijeong Lee, Jaeyun Lee*, and Jihwan Song*, Materials (IF:3.1, Q1- JIF 25%), 2025.01. [Link ↗](https://www.mdpi.com/1996-1944/18/3/644)"
      ]
    },
    {
      name: "Yun Kim",
      position: "University of Minnesota (Ph.D program)",
      education: [
        "2022 M.S., Mechanical Engineering, Hanbat National University",
        "2020 B.S., Mechanical Engineering, Hanbat National University"
      ],
      publications: [
        "Advanced multiscale modeling of potassium-ion batteries for interplay of electrochemical and mechanical behavior across scales, Subeen Kim, Yun Kim, Yoon Koo Lee*, and Jihwan Song*, Small Structures (IF:13.9, Q1- JIF 10%), 2025.04. [Link ↗](https://onlinelibrary.wiley.com/doi/10.1002/sstr.202400640)",
        "Nanoplasmonic Rapid Antimicrobial-resistance Point-of-care Identification Device: RAPIDx, Jong-Hwan Lee†, Jihwan Song†, SoonGweon Hong, Yun Kim, Minsun Song, Byungrae Cho, Tiffany Wu, Lee W. Riley, Ulf Landegren, and Luke P. Lee*, Advanced Healthcare Materials (IF:10.0, Q1- JIF 5%) (Selected for Inside Back Cover), 2024.08. [Link ↗](https://doi.org/10.1002/adhm.202402044)",
        "High-spatial and colourimetric imaging of histone modifications in single senescent cells using plasmonic nanoprobes, Hyun Ji An†, Yun Kim†, Soojeong Chang†, Hakchun Kim, Jihwan Song*, Hyunsung Park*, and Inhee Choi*, Nature Communications (IF: 17.694, Q1- JCI 5%), 2021.10. [Link ↗](https://www.nature.com/articles/s41467-021-26224-9)",
        "Free manipulation system for nanorobot cluster based on complicated multi-coil electromagnetic actuator, Yun Kim, Jun Keun Chae, Jong-Hwan Lee, Eunpyo Choi, Yoon Koo Lee, and Jihwan Song*, Scientific Reports (IF: 4.996, Q1- JCI 15%), 2021.10. [Link ↗](https://www.nature.com/articles/s41598-021-98957-y)",
        "Multifunctional nanorobot system for active therapeutic delivery and synergistic chemo-photothermal therapy, Zhen Jin, Kim Tien Nguyen, Gwangjun Go, Byungjeon Kang, Hyun-Ki Min, Seok-Jae Kim, Yun Kim, Hao Li, Chang-Sei Kim, Seonmin Lee, Sukho Park*, Kyu-Pyo Kim*, Kang Moo Huh*, Jihwan Song*, Jong-Oh Park*, and Eunpyo Choi*, Nano Letters (IF: 12.262, Q1- JCI 5%), 2019.11. [Link ↗](https://doi.org/10.1021/acs.nanolett.9b03051)"
      ]
    }
  ]
};
