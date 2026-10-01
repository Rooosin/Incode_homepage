// =====================================================================
//  NEWS  (Home의 'Latest from the lab'과 News 페이지에 표시)
//  - 새 소식은 맨 위에 추가하세요. 위에 있을수록 최신으로 보여요.
//  - type 값: "pub"(논문) "cover"(저널 표지) "grant"(과제) "award"(수상)
//             "conf"(학회) "member"(새 멤버) "alumni"(졸업생 소식) "media"(언론) "lab"(연구실)
//  - text 안의 링크는 [보이는 글자](주소) 형식으로 쓰세요.
//  - images: img/news/ 폴더에 사진을 넣고 파일 이름을 적으세요. 없으면 [] 로 두면 돼요.
// =====================================================================

window.NEWS = [
  {
    date: "2026.09.24",
    type: "cover",
    title: "Journal Cover",
    text: "Our paper \"Mode-dependent energy redistribution in Au nanohole arrays for concurrent photothermal conversion and reduced fluorescence quenching\" has been selected as a Cover Feature in Small Structures. [Link ↗](https://doi.org/10.1002/sstr.70590) Congratulations!",
    images: ["news/2026-09-24.jpg"]
  },
  {
    date: "2026.08.24",
    type: "pub",
    title: "Journal Publication",
    text: "Chae eun Sung's work was published in journal \"Journal of Energy Storage (IF:10.7, Q1- JIF 15%)\". \"From microstructure to performance through coupled electrochemical and mechanical insights in all-solid-state batteries\" [Link ↗](https://doi.org/10.1016/j.est.2026.124264) Congratulations!",
    images: ["news/2026-08-24.jpg"]
  },
  {
    date: "2026.08.21",
    type: "pub",
    title: "Journal Publication",
    text: "Jiseok Han's work was published in journal \"Small Structures (IF:8.9, Q1- JIF 20%)\". \"Mode-dependent energy redistribution in Au nanohole arrays for concurrent photothermal conversion and reduced fluorescence quenching\" [Link ↗](https://doi.org/10.1002/sstr.70590) Congratulations!",
    images: ["news/2026-08-21.jpg"]
  },
  {
    date: "2026.08.10",
    type: "pub",
    title: "Journal Publication",
    text: "Seunggyun Byeon's work collaborating with Konkuk University and Seoul National University Bundang Hospital was published in journal \"Small Structures (IF:8.9, Q1- JIF 20%)\". \"Silica/nano graphene oxide nanocomposites decorated with Au@Ag nanoparticles as surface-enhanced raman scattering tags for highly sensitive quantitative lateral flow immunoassays.\" [Link ↗](https://doi.org/10.1002/sstr.70569) Congratulations!",
    images: ["news/2026-08-10.jpg"]
  },
  {
    date: "2026.07",
    type: "member",
    title: "New Members",
    text: "Minseok Kim joined our group as a Undergraduate Intern. Welcome!",
    images: []
  },
  {
    date: "2026.07.12",
    type: "pub",
    title: "Journal Publication",
    text: "Seunggyun Byeon's work was published in journal \"Materials (IF:3.7)\". \"Data-driven prediction of induced voltage in CT-based magnetic energy harvesting systems considering nonlinear B–H characteristics.\" [Link ↗](https://www.mdpi.com/1996-1944/19/14/3002) Congratulations!",
    images: ["news/2026-07-12.jpg"]
  },
  {
    date: "2026.06",
    type: "grant",
    title: "Research Grant",
    text: "Our group receives a Basic Research Laboratory (BRL) Grant from NRF of Korea \"Basic Research Laboratory for Enhancing Walking Ability Based on 3D TENG Insole Embedded Physical AI Exo-Boots\". (2026.07–2029.06) Congratulations!",
    images: ["news/2026-06.jpg"]
  },
  {
    date: "2026.05.06-05.09",
    type: "conf",
    title: "Attending a conference",
    text: "We attended KSME Spring Meeting in Yeosu. Seunggyun Byeon, Heesoo Jeong and Minjeong Lee had presentations.",
    images: ["news/2026-05-06.jpg"]
  },
  {
    date: "2026.04",
    type: "member",
    title: "New Members",
    text: "Gayeon You joined our group as a Undergraduate Intern. Welcome!",
    images: []
  },
  {
    date: "2026.02",
    type: "member",
    title: "New Members",
    text: "Seongwoo Hong joined our group as a URECA Fellow. Welcome!",
    images: []
  },
  {
    date: "2026.02.05",
    type: "pub",
    title: "Journal Publication",
    text: "Jiseok Han's work collaborating with Konkuk University and Harvard Medical School was published in journal \"Nature Communications (IF:15.7, Q1- JCI 5%)\". \"Early Diagnosis of Pancreatic Ductal Adenocarcinoma by Signal-Enhanced Lateral Flow Immunoassay: SELFI\". [Link ↗](https://www.nature.com/articles/s41467-026-69204-7) Congratulations!",
    images: ["news/2026-02-05.jpg"]
  },
  {
    date: "2025.12.10-12.13",
    type: "conf",
    title: "Attending a conference",
    text: "We attended KSME Fall Meeting in Gangwon. Jiseok Han and Minjoong Kim had presentations.",
    images: ["news/2025-12-10.jpg"]
  },
  {
    date: "2025.12.02",
    type: "pub",
    title: "Journal Publication",
    text: "Subeen Kim's work collaborating with Korea Research Institute of Standards and Science (KRISS) was published in journal \"Analytical Chemistry (IF:6.7, Q1- JCI 5%)\". \"Comparative analysis of sample loop and counting bead–based methods for size-dependent bias in flow cytometry\" [Link ↗](https://doi.org/10.1021/acs.analchem.5c03537) Congratulations!",
    images: ["news/2025-12-02.jpg"]
  },
  {
    date: "2025.09.01",
    type: "lab",
    title: "SONG Research Group @ Sogang University",
    text: "A new chapter begins — The SONG Research Group takes off at Sogang University. The journey has just begun.",
    images: ["news/2025-09-01.jpg"]
  },
  {
    date: "2025.06.25-06.27",
    type: "conf",
    title: "Attending a conference",
    text: "We attended KSME Spring Meeting in Jeju. Minjoong Kim and Seunggyun Byeon had presentations.",
    images: ["news/2025-06-25.jpg"]
  },
  {
    date: "2025.05.14-05.16",
    type: "conf",
    title: "Attending a conference",
    text: "We attended KBCS Spring Meeting in Yeosu. Jiseok Han had presentations.",
    images: ["news/2025-05-14.jpg"]
  },
  {
    date: "2025.04.02-04.04",
    type: "conf",
    title: "Attending a conference",
    text: "We attended KECS Spring Meeting in Jeju. Subeen Kim had presentations.",
    images: ["news/2025-04-02.jpg"]
  },
  {
    date: "2025.02.26",
    type: "grant",
    title: "Research Grant",
    text: "Our group receives a Mid-career Research Grant from NRF of Korea \"Physics-Informed Neural Network (PINN)-based multiscale and multiphysics design system for Sodium-ion batteries\". (2025.03~2029.2) Congratulations!",
    images: ["news/2025-02-26.jpg"]
  },
  {
    date: "2025.02.19",
    type: "pub",
    title: "Journal Publication",
    text: "Subeen Kim's work was published in journal \"Small Structures (IF:13.9, JCR Top 10%)\". \"Advanced multiscale modeling of potassium-ion batteries for interplay of electrochemical and mechanical behavior across scales.\" [Link ↗](https://doi.org/10.1002/sstr.202400640) Congratulations!",
    images: ["news/2025-02-19.jpg"]
  },
  {
    date: "2025.01.31",
    type: "pub",
    title: "Journal Publication",
    text: "Minjoong Kim's work was published in journal \"Materials (IF:3.1, JCR Top 25%)\". \"B-H Curve Estimation and Air Gap Optimization for High-Performance Split Core.\" [Link ↗](https://www.mdpi.com/1996-1944/18/3/644) Congratulations!",
    images: ["news/2025-01-31.jpg"]
  },
  {
    date: "2025.01.02",
    type: "cover",
    title: "Journal Cover",
    text: "Our paper \"Nanoplasmonic Rapid Antimicrobial-resistance Point-of-care Identification Device: RAPIDx.\" has been selected for the Inside Back Cover of Advanced Healthcare Materials.[Link ↗](https://onlinelibrary.wiley.com/doi/10.1002/adhm.202402044) Congratulations!",
    images: ["news/2025-01-02.jpg"]
  },
  {
    date: "2024.11.21",
    type: "award",
    title: "Outstanding Presentation Prize",
    text: "Jiseok Han, Subeen Kim, and Minjoong Kim won the outstanding presentation prize from 2024 PBL final presentation. Congratulations!",
    images: ["news/2024-11-21.jpg"]
  },
  {
    date: "2024.11.21",
    type: "award",
    title: "Outstanding Presentation Prize",
    text: "Subeen Kim won the outstanding presentation prize from KSME Spring Meeting (Chungcheong branch)! \"Design of High-Performance Potassium-Ion Batteries via Multiscale Approach Combined With DFT Calculations\" Congratulations!",
    images: ["news/2024-11-21-2.jpg"]
  },
  {
    date: "2024.11.06-11.09",
    type: "conf",
    title: "Attending a Conference",
    text: "We attended KSME Fall Meeting in Jeju. Subeen Kim, Hyunwoo Lim, Chae eun Sung and Jiseok Han had presentations.",
    images: ["news/2024-11-06.jpg"]
  },
  {
    date: "2024.10.27",
    type: "award",
    title: "Outstanding Presentation Prize",
    text: "Subeen Kim won the outstanding presentation prize from Korea Foundation for Women in Science Engineering and Technology \"Multiscale-Multiphysics Design for High-Performance Potassium-Ion Batteries\" Congratulations!",
    images: ["news/2024-10-27.jpg"]
  },
  {
    date: "2024.09.11",
    type: "award",
    title: "Excellence Prize",
    text: "Minjoong Kim, Hoyoung Kim and Minjeong Lee won the Excellence Prize in the Universal Design Competition! Congratulations!",
    images: ["news/2024-09-11.jpg"]
  },
  {
    date: "2024.09.01",
    type: "grant",
    title: "Research Grant",
    text: "Minjoong Kim receives a research grant from NRF Korea \"Design of High-Performance Nanocrystal Split Core Using Multiphysics Simulation\". Congratulations!",
    images: []
  },
  {
    date: "2024.08.29",
    type: "pub",
    title: "Journal Publication",
    text: "Our collaborative work with Harvard Medical School and KRICT was published in journal \"Advanced Healthcare Materials (IF:10.0)\". \"Nanoplasmonic Rapid Antimicrobial-resistance Point-of-care Identification Device: RAPIDx.\" [Link ↗](https://doi.org/10.1002/adhm.202402044) Congratulations!",
    images: ["news/2024-08-29.jpg"]
  },
  {
    date: "2024.06.27",
    type: "conf",
    title: "Attending a Conference",
    text: "We attended KSME Spring Meeting (Chungcheong branch) @ KAIST. Subeen Kim, Hyunwoo Lim, Chae eun Sung, Jiseok Han, and Minjoong Kim had presentations.",
    images: ["news/2024-06-27.jpg"]
  },
  {
    date: "2024.05.01-05.04",
    type: "conf",
    title: "Attending a Conference",
    text: "We attended KSME Spring Meeting in Jeju. Subeen Kim, Jiseok Han, and Minjoong Kim had presentations.",
    images: ["news/2024-05-01.jpg"]
  },
  {
    date: "2024.04.22",
    type: "pub",
    title: "Journal Publication",
    text: "Hyunwoo Lim's first work was published in journal \"IEEE Transactions on Transportation Electrification (IF:7.0)\". \"Modeling and validation of driving performance of electric vehicle converted from internal combustion engine vehicle.\" [Link ↗](https://ieeexplore.ieee.org/document/10506683) Congratulations!",
    images: ["news/2024-04-22.jpg"]
  },
  {
    date: "2024.03.29",
    type: "grant",
    title: "Research Grant",
    text: "Subeen Kim receives a research grant as P.I. from Korea Foundation for Women in Science Engineering and Technology \"Multiscale-Multiphysics Design for High-performance K-ion Batteries\". Congratulations!",
    images: []
  },
  {
    date: "2024.03.21",
    type: "award",
    title: "Outstanding Presentation Prize",
    text: "Subeen Kim won the outstanding presentation prize from 2023 KSME spring meeting! \"Multiphysics Simulation System for Controlled Drug Delivery via Optics and Photothermal Properties of Plasmonic Hybrid Nanogels\"Congratulations!",
    images: ["news/2024-03-21.jpg"]
  },
  {
    date: "2023.11.1-11.4",
    type: "conf",
    title: "Attending a Conference",
    text: "We attended KSME Fall Meeting in Songdo, Incheon. Subeen Kim and Myungseo Lee had presentations.",
    images: ["news/2023-11-01.jpg"]
  },
  {
    date: "2023.08.11",
    type: "pub",
    title: "Journal Publication",
    text: "Minjoong Kim's first work collaborating with Chungnam National University was published in journal \"Chemical Engineering Science (IF: 4.7)\". \"Characterization of passive microfluidic mixer with a three-dimensional zig-zag channel for cryo-EM sampling\". [Link ↗](https://doi.org/10.1016/j.ces.2023.119161) Congratulations!",
    images: ["news/2023-08-11.jpg"]
  },
  {
    date: "2023.06.14",
    type: "pub",
    title: "Journal Publication",
    text: "Subeen Kim's first work collaborating with University of Seoul was accepted in journal \"Journal of Nanobiotechnology (IF: 10.2, JCR top 5%)\". \"Spatiotemporally controlled drug delivery via photothermally driven conformational change of self-integrated plasmonic hybrid nanogels\". [Link ↗](https://doi.org/10.1186/s12951-023-01935-x) Congratulations!",
    images: ["news/2023-06-14.jpg"]
  },
  {
    date: "2023.05.17-20",
    type: "conf",
    title: "Attending a Conference",
    text: "We attended KSME spring meeting in Busan. Subeen Kim and Minjoong Kim had presentations.",
    images: ["news/2023-05-17.jpg"]
  },
  {
    date: "2022.07.08",
    type: "alumni",
    title: "MMM Alumni News",
    text: "Yun Kim has got the admission letter to the Ph.D program from universities within US ranking Top 20 (Georgia Institute of Technology, The Pennsylvania State University, University of Minnesota). Congratulations!",
    images: ["news/2022-07-08.jpg"]
  },
  {
    date: "2022.05.23",
    type: "pub",
    title: "Journal Publication",
    text: "Our work collaborating with University of Seoul was accepted in journal \"Nano Convergence (IF: 8.526)\". \"Ultrasensitive and real-time optical detection of cellular oxidative stress using graphene-covered tunable plasmonic interfaces\". [Link ↗](https://nanoconvergencejournal.springeropen.com/articles/10.1186/s40580-022-00315-9) Congratulations!",
    images: ["news/2022-05-23.jpg"]
  },
  {
    date: "2022.05.08-05.13",
    type: "conf",
    title: "Attending an International Conference",
    text: "We attended MRS spring meeting in Hawaii. Yun Kim had an oral presentation.",
    images: ["news/2022-05-08.jpg"]
  },
  {
    date: "2022.05.19",
    type: "award",
    title: "Outstanding Presentation Prize",
    text: "Yun Kim won the outstanding presentation prize from 2021 KSME spring meeting! Congratulations!",
    images: ["news/2022-05-19.jpg"]
  },
  {
    date: "2021.10.14",
    type: "media",
    title: "Media Reports",
    text: `Our work was highlighted in news media. Congratulations!
한국일보: [hankookilbo.com ↗](https://www.hankookilbo.com/News/Read/A2021101409540000941?did=NA)
한겨레: [hani.co.kr ↗](https://www.hani.co.kr/arti/economy/biznews/1015105.html)
중앙일보: [joongang.co.kr ↗](https://www.joongang.co.kr/article/25014494)
조선일보: [lifenlearning.chosun.com ↗](https://lifenlearning.chosun.com/pan/site/data/html_dir/2021/10/13/2021101300748.html)
에듀동아: [edu.donga.com ↗](http://edu.donga.com/forwarding.php?num=20211014102509379349)`,
    images: ["news/2021-10-14.jpg"]
  },
  {
    date: "2021.09.21",
    type: "pub",
    title: "Journal Publication",
    text: "Yun Kim's work collaborating with University of Seoul was accepted in journal \"Nature Communications (IF: 14.919, JCR top 5%)\". \"High-Spatial and Colourimetric Imaging of Histone Modifications in Single Senescent Cells Using Plasmonic Nanoprobes\". [Link ↗](https://www.nature.com/articles/s41467-021-26224-9) Congratulations!",
    images: ["news/2021-09-21.jpg"]
  },
  {
    date: "2021.09.09",
    type: "pub",
    title: "Journal Publication",
    text: "Yun Kim's work was accepted in journal \"Scientific Reports (IF: 4.379)\". \"Free manipulation system for nanorobot cluster based on complicated multi-coil electromagnetic actuator\". [Link ↗](https://www.nature.com/articles/s41598-021-98957-y) Congratulations!",
    images: ["news/2021-09-09.jpg"]
  },
  {
    date: "2021.05.30",
    type: "grant",
    title: "Research Grant",
    text: "Our group receives a grant from NRF of Korea \"Multiscale-Multiphysics Design for Next-generation Secondary Battery Systems\". (2021.06~2024.2)",
    images: ["news/2021-05-30.jpg"]
  },
  {
    date: "2021.04.21",
    type: "pub",
    title: "Journal Publication",
    text: "Our paper collaborating with U.C. Berkeley was accepted in journal \"Advanced Theory and Simulations (IF: 4.004)\". \"Mechanobiological stimulations of algal cells for energy harvesting\" [Link], 2021.04.",
    images: ["news/2021-04-21.jpg"]
  },
  {
    date: "2020.08.19-20",
    type: "award",
    title: "KSME Spring Meeting & Outstanding Presentation Prize",
    text: `We attended 2020 KSME Spring Meeting. Yun Kim won the outstanding presentation prize!
Congratulations!
Google SitesReport abusePage detailsPage updated Google SitesReport abuse`,
    images: ["news/2020-08-19.jpg"]
  }
];
