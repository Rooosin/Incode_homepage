// =====================================================================
//  PHOTO  (Photo 페이지 앨범)
//  - 앨범(탭) 순서대로 보여요.
//  - 종류 태그는 제목으로 자동 분류돼요. 바꾸려면 tag: "conf" | "celebrate" | "life" 를 적으세요.
//  - 새 행사는 해당 앨범 events 맨 위에 추가하세요.
//  - 사진은 img/photos/<앨범폴더>/ 에 넣고 경로를 적으세요.
//  - 휴대폰에서는 첫 사진이 세로 사진이 아니면 맨 위에 크게 나와요. 다른 사진(여러 장도 가능)을 크게 하려면 wide: ["파일이름.jpg"] 를 적으세요.
//  - 새 해가 되면 { label: "2027", events: [ ... ] } 를 맨 위에 추가하면 돼요.
// =====================================================================

window.ALBUMS = [
  {
    label: "2026",
    events: [
      {
        date: "2026.11.11-11.14",
        title: "KSME Fall Meeting in Jeju",
        images: ["photos/2026/2026-11-11-a.jpg", "photos/2026/2026-11-11-b.jpg", "photos/2026/2026-11-11-c.jpg", "photos/2026/2026-11-11-d.jpg"]
      },
      {
        date: "2026.11.10-11.13",
        title: "KBCS Fall Meeting in Jeju",
        images: ["photos/2026/2026-11-10-a.jpg", "photos/2026/2026-11-10-b.jpg"]
      },
      {
        date: "2026.11.10",
        title: "Lab Dinner with Subeen Kim",
        images: ["photos/2026/2026-11-10-dinner.jpg"]
      },
      {
        date: "2026.11.09",
        title: "Happy Birthday Seongwoo!",
        images: ["photos/2026/2026-11-09-a.jpg", "photos/2026/2026-11-09-b.jpg"]
      },
      {
        date: "2026.08.28",
        title: "Lab Lunch",
        images: ["photos/2026/2026-08-28-a.jpg", "photos/2026/2026-08-28-b.jpg"]
      },
      {
        date: "2026.06.24",
        title: "Happy birthday Gayeon!",
        images: ["photos/2026/2026-06-24-a.jpg", "photos/2026/2026-06-24-b.jpg"]
      },
      {
        date: "2026.05.20",
        title: "Welcome party for Seongwoo and Gayeon!",
        images: ["photos/2026/2026-05-20.jpg"]
      },
      {
        date: "2026.05.15",
        title: "Teacher's day. Thank you!",
        images: ["photos/2026/2026-05-15.jpg"]
      },
      {
        date: "2026.05.06-05.09",
        title: "KSME Spring Meeting in Yeosu",
        images: ["photos/2026/2026-05-06-a.jpg", "photos/2026/2026-05-06-b.jpg", "photos/2026/2026-05-06-c.jpg", "photos/2026/2026-05-06-e.jpg", "photos/2026/2026-05-06-d.jpg"],
        wide: ["2026-05-06-e.jpg", "2026-05-06-d.jpg"]
      },
      {
        date: "2026.04.15",
        title: "Happy birthday Minjeong!",
        images: ["photos/2026/2026-04-15-a.jpg", "photos/2026/2026-04-15-b.jpg"]
      },
      {
        date: "2026.04.02",
        title: "Spring campus walk with lab members.",
        images: ["photos/2026/2026-04-02-a.jpg", "photos/2026/2026-04-02-b.jpg"]
      },
      {
        date: "2026.03.13",
        title: "Farewell party for Minjoong and Jiseok.",
        images: ["photos/2026/2026-03-13-a.jpg", "photos/2026/2026-03-13-b.jpg"]
      },
      {
        date: "2026.02.16",
        title: "Professor's birthday. Thank you!",
        images: ["photos/2026/2026-02-16.jpg"]
      }
    ]
  },
  {
    label: "2025",
    events: [
      {
        date: "2025.12.10-12.13",
        title: "KSME Fall Meeting in Gangwon.",
        images: ["photos/2025/2025-12-10-a.jpg", "photos/2025/2025-12-10-b.jpg", "photos/2025/2025-12-10-c.jpg", "photos/2025/2025-12-10-d.jpg", "photos/2025/2025-12-10-e.jpg", "photos/2025/2025-12-10-f.jpg", "photos/2025/2025-12-10-g.jpg", "photos/2025/2025-12-10-h.jpg", "photos/2025/2025-12-10-i.jpg", "photos/2025/2025-12-10-j.jpg"]
      },
      {
        date: "2025.06.25-06.27",
        title: "KSME Spring Meeting in Jeju.",
        images: ["photos/2025/2025-06-25-a.jpg", "photos/2025/2025-06-25-b.jpg", "photos/2025/2025-06-25-c.jpg"]
      },
      {
        date: "2025.05.14-05.16",
        title: "KBCS Spring Meeting in Yeosu.",
        images: ["photos/2025/2025-05-14-a.jpg", "photos/2025/2025-05-14-b.jpg"]
      },
      {
        date: "2025.04.02-04.04",
        title: "KECS Spring Meeting in Jeju.",
        images: ["photos/2025/2025-04-02.jpg"]
      },
      {
        date: "2025.05.15",
        title: "Teacher's day. Thank you!",
        images: ["photos/2025/2025-05-15.jpg"]
      },
      {
        date: "2025.03.05",
        title: "Spring semester opening party in 2025",
        images: ["photos/2025/2025-03-05.jpg"]
      },
      {
        date: "2025.02.14",
        title: "Graduation Ceremony. Hyunwoo, Chae eun and Subeen congratulations!",
        images: ["photos/2025/2025-02-14.jpg", "photos/2025/2025-02-14-2.jpg"]
      },
      {
        date: "2025.02.16",
        title: "Professor's birthday. Thank you!",
        images: ["photos/2025/2025-02-16.jpg", "photos/2025/2025-02-16-2.jpg"]
      }
    ]
  },
  {
    label: "Before 2025",
    events: [
      {
        date: "2024.12.24",
        title: "Christmas party",
        images: ["photos/before-2025/2024-12-24.jpg"]
      },
      {
        date: "2024.11.26",
        title: "Lab dinner",
        images: ["photos/before-2025/2024-11-26.jpg"]
      },
      {
        date: "2024.11.06-11.09",
        title: "KSME Fall meeting",
        images: [
          "photos/before-2025/2024-11-06.jpg",
          "photos/before-2025/2024-11-06-2.jpg",
          "photos/before-2025/2024-11-06-3.jpg",
          "photos/before-2025/2024-11-06-4.jpg",
          "photos/before-2025/2024-11-06-5.jpg",
          "photos/before-2025/2024-11-06-6.jpg"
        ]
      },
      {
        date: "2024.07.17&08.07",
        title: "Lab dinner with Yun Kim",
        images: ["photos/before-2025/2024-07-17.jpg"]
      },
      {
        date: "2024.07.17",
        title: "Lab dinner",
        images: ["photos/before-2025/2024-07-17-2.jpg", "photos/before-2025/2024-07-17-3.jpg"]
      },
      {
        date: "2024.06.27",
        title: "KSME Meeting (Chungcheong branch)@KAIST",
        images: [
          "photos/before-2025/2024-06-27.jpg",
          "photos/before-2025/2024-06-27-2.jpg",
          "photos/before-2025/2024-06-27-3.jpg",
          "photos/before-2025/2024-06-27-4.jpg",
          "photos/before-2025/2024-06-27-5.jpg",
          "photos/before-2025/2024-06-27-6.jpg"
        ]
      },
      {
        date: "2024.05.15",
        title: "Teacher's day. Thank you!",
        images: ["photos/before-2025/2024-05-15.jpg"]
      },
      {
        date: "2024.05.01-05.04",
        title: "KSME Spring Meeting",
        images: [
          "photos/before-2025/2024-05-01-4.jpg",
          "photos/before-2025/2024-05-01-5.jpg",
          "photos/before-2025/2024-05-01-6.jpg",
          "photos/before-2025/2024-05-01-7.jpg"
        ]
      },
      {
        date: "2024.02.16",
        title: "Graduation Ceremony. Minjoong and Jiseok congratulations!",
        images: ["photos/before-2025/2024-02-16.jpg", "photos/before-2025/2024-02-16-2.jpg"]
      },
      {
        date: "2024.02.16",
        title: "Professor's birthday. Thank you!",
        images: ["photos/before-2025/2024-02-16-3.jpg"]
      },
      {
        date: "2023.12.11",
        title: "With Prof. Luke P. Lee (Harvard Medical School) @ KRICT",
        images: ["photos/before-2025/2023-12-11.jpg"]
      },
      {
        date: "2023.11.01-11.04",
        title: "KSME Fall Meeting",
        images: [
          "photos/before-2025/2023-11-01.jpg",
          "photos/before-2025/2023-11-01-2.jpg",
          "photos/before-2025/2023-11-01-3.jpg"
        ]
      },
      {
        date: "2023.05.17-05.23",
        title: "KSME Spring Meeting",
        images: ["photos/before-2025/2023-05-17.jpg", "photos/before-2025/2023-05-17-2.jpg"]
      },
      {
        date: "2023.01.03",
        title: "Joint Meeting with UOS (Prof. I. Choi group).",
        images: ["photos/before-2025/2023-01-03.jpg", "photos/before-2025/2023-01-03-2.jpg"]
      },
      {
        date: "2022.07.08",
        title: "Farewell party for Yun Kim.",
        images: ["photos/before-2025/2022-07-08.jpg", "photos/before-2025/2022-07-08-2.jpg"]
      },
      {
        date: "2022.05.08-05.13",
        title: "MRS Spring Meeting at Hawaii.",
        images: ["photos/before-2025/2022-05-08.jpg"]
      }
    ]
  }
];
