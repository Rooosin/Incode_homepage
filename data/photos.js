// =====================================================================
//  PHOTO  (Photo 페이지 앨범 + Home의 'Life in the lab')
//  - 앨범(탭) 순서대로 보여요. 첫 번째 앨범의 앞쪽 사진들이 Home에 나와요.
//  - 새 행사는 해당 앨범 events 맨 위에 추가하세요.
//  - 사진은 img/photos/<앨범폴더>/ 에 넣고 경로를 적으세요.
//  - 새 해가 되면 { label: "2027", events: [ ... ] } 를 맨 위에 추가하면 돼요.
// =====================================================================

window.ALBUMS = [
  {
    label: "2026",
    events: [
      {
        date: "2026.08.28",
        title: "Lab Lunch",
        images: ["photos/2026/2026-08-28.jpg"]
      },
      {
        date: "2026.06.24",
        title: "Happy birthday Gayeon!",
        images: ["photos/2026/2026-06-24.jpg"]
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
        images: ["photos/2026/2026-05-06.jpg"]
      },
      {
        date: "2026.04.15",
        title: "Happy birthday Minjeong!",
        images: ["photos/2026/2026-04-15.jpg"]
      },
      {
        date: "2026.04.02",
        title: "Spring campus walk with lab members.",
        images: ["photos/2026/2026-04-02.jpg"]
      },
      {
        date: "2026.03.13",
        title: "Farewell party for Minjoong and Jiseok.",
        images: ["photos/2026/2026-03-13.jpg"]
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
        images: ["photos/2025/2025-12-10.jpg"]
      },
      {
        date: "2025.06.25-06.27",
        title: "KSME Spring Meeting in Jeju.",
        images: ["photos/2025/2025-06-25.jpg"]
      },
      {
        date: "2025.05.14-05.16",
        title: "KBCS Spring Meeting in Yeosu.",
        images: ["photos/2025/2025-05-14.jpg"]
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
          "photos/before-2025/2024-06-27-3.jpg"
        ]
      },
      {
        date: "2024.05.01-05.04",
        title: "KSME Spring Meeting",
        images: [
          "photos/before-2025/2024-05-01.jpg",
          "photos/before-2025/2024-05-01-2.jpg",
          "photos/before-2025/2024-05-01-3.jpg"
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
