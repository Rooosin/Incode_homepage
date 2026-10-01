# INCODE Lab 홈페이지

서강대학교 기계공학과 SONG Research Group (INCODE Lab) 홈페이지입니다.
별도 설치나 빌드 과정 없이 **`data/` 폴더의 파일만 고치면** 사이트 내용이 바뀝니다.

---

## 폴더 구조

```
index.html          페이지 뼈대 (보통 수정할 일 없음)
data/               ★ 내용은 여기서 수정
  news.js             뉴스
  publications.js     논문 (국제학술지 / 준비 중 / 2009–2017)
  people.js           교수님, 현재 멤버, 졸업생
  photos.js           사진 앨범
  research.js         연구 분야와 프로젝트 설명
  site.js             모집 공고, 강의 목록, 커버 애니메이션, Home 뉴스 범위
img/                ★ 사진은 여기에
  news/  photos/  people/  research/  banners/  logos/  home/
css/style.css       디자인 (색, 글꼴, 배치)
js/app.js           화면을 그리는 코드
js/scenes.js        커버 연구 애니메이션 코드
tools/scene-preview.html   커버 애니메이션 4종 미리보기
```

## 수정한 결과 미리 보기

`index.html`을 더블클릭해서 브라우저로 열면 됩니다.
데이터 파일에 실수가 있으면 화면 왼쪽 아래에 **빨간 "데이터 확인 필요" 상자**가 뜨고 무엇이 문제인지 알려줍니다.
(배포된 사이트에서는 주소 뒤에 `?check`를 붙이면 같은 상자를 볼 수 있어요. 예: `https://.../?check`)

---

## 자주 하는 수정

> 공통 규칙
> - 글자는 항상 `"큰따옴표"` 안에 쓰고, 항목 사이에는 **쉼표(,)** 를 꼭 넣으세요.
> - 링크는 `[보이는 글자](https://주소)` 형식으로 씁니다.
> - 기존 항목 하나를 통째로 복사해서 붙여넣고 내용만 바꾸는 게 가장 안전해요.

### 1. 뉴스 추가 — `data/news.js`

`window.NEWS = [` 바로 아래, **맨 위**에 추가하세요.

```js
window.NEWS = [
  {
    date: "2026.10.15",
    type: "award",
    title: "Outstanding Presentation Prize",
    text: "Minjeong Lee won the outstanding presentation prize at KSME Fall Meeting! Congratulations!",
    images: ["news/2026-10-15.jpg"]
  },
  {   ← 기존 소식들
```

- `type`은 다음 중 하나: `"pub"` 논문, `"cover"` 저널 표지, `"grant"` 과제, `"award"` 수상, `"conf"` 학회, `"member"` 새 멤버, `"alumni"` 졸업생 소식, `"media"` 언론, `"lab"` 연구실
- 사진이 없으면 `images: []`
- 줄을 나누고 싶으면 `text`를 백틱(`` ` ``)으로 감싸고 엔터로 줄바꿈하면 돼요.
- Home의 **Group News**에는 `data/site.js`의 `homeNewsSince` 날짜 이후 소식이 모두 나오고, 전체 목록은 News 페이지에 나옵니다.

### 2. 논문 추가 — `data/publications.js`

`JOURNALS: [` 아래 **맨 위**에 추가하고, `no`는 마지막 번호 + 1로 적으세요.

```js
{
  no: 49,
  year: 2026,
  title: "논문 제목",
  authors: "Minjeong Lee, Jihwan Song*",
  journal: "Lab on a Chip",
  impact: "IF 6.1 · Q1 10%",
  volume: "26, 1234",
  date: "2026.10",
  link: "https://doi.org/..."
},
```

- 심사 중이면 `journal: "Under review"`로 두고 `impact`, `volume`, `date`, `link`는 빼도 됩니다.
- `note: "Cover Feature"`처럼 강조 문구를 붙일 수 있어요.
- `Jihwan Song`은 자동으로 굵게, `GROUP_MEMBERS`에 있는 이름은 자동으로 밑줄 처리됩니다. **새 멤버가 들어오면 `GROUP_MEMBERS`에도 이름을 추가하세요.**

### 3. 멤버 추가 / 졸업 처리 — `data/people.js`

- **새 멤버**: 사진을 `img/people/이름.jpg`로 넣고, `MEMBERS`의 알맞은 그룹(`Ph.D. candidates`, `M.S. candidates` 등)에 추가하세요.
  ```js
  {
    name: "Gildong Hong",
    photo: "people/gildong-hong.jpg",
    position: "Master's Program",
    interests: ["관심 연구 1", "관심 연구 2"],
    education: ["2027 B.S., Mechanical Engineering"],
    publications: [49],
    email: "gildong@sogang.ac.kr"
  },
  ```
  `publications`에는 논문 번호(`no`)를 적으면 제목이 자동으로 연결돼요.
- **졸업**: `MEMBERS`에서 지우고 `ALUMNI` 맨 위에 추가하세요.
  ```js
  {
    name: "Gildong Hong",
    position: "Samsung SDI",
    education: ["2028 M.S., Mechanical Engineering, Sogang University"],
    publications: ["논문 제목, 저자, 저널, 2027. [Link](https://doi.org/...)"]
  },
  ```

### 4. 사진 앨범 — `data/photos.js`

1. 사진을 `img/photos/2026/` 같은 앨범 폴더에 넣습니다.
2. 해당 앨범의 `events:` 아래 **맨 위**에 추가합니다.
   ```js
   {
     date: "2026.10.20",
     title: "Fall lab workshop",
     images: ["photos/2026/2026-10-20.jpg", "photos/2026/2026-10-20-2.jpg"]
   },
   ```
- 새해가 되면 `window.ALBUMS = [` 아래 맨 위에 `{ label: "2027", events: [ ... ] },`를 추가하세요.

### 5. 모집 공고 · 강의 · 커버 · Home 뉴스 범위 — `data/site.js`

- `hiring`: 박사후 연구원 등 모집 공고. 마감되면 `show: false`
- `lectures`: 학기별 강의 목록
- `coverScenes`: Home 커버에 랜덤으로 나오는 애니메이션. `"energy"`(전고체전지), `"spheroid"`(스페로이드 칩), `"plasmonic"`(금 나노홀), `"neural"`(PINN) 중 원하는 것만 남기세요. `tools/scene-preview.html`에서 미리 볼 수 있어요.
- `homeNewsSince`: Home의 Group News에 보여줄 소식의 시작 날짜 (예: `"2025.09.01"`)

### 6. 연구 소개 — `data/research.js`

분야별 소개 문단(`overview`, `bullets`, `closing`)과 프로젝트(`projects`)를 고칠 수 있어요. 프로젝트 그림은 `img/research/`에 있습니다.

---

## 사진 규칙

- 파일 이름은 **영어 소문자, 숫자, 하이픈(-)만** 쓰세요. 예: `2026-10-20-2.jpg` (한글·공백 X)
- GitHub Pages는 **대소문자를 구분**합니다. `Photo.JPG`와 `photo.jpg`는 다른 파일이에요.
- 가로 1600px 이하, 한 장에 500KB 이하를 권장합니다. 큰 사진은 [squoosh.app](https://squoosh.app)에서 줄여서 넣으세요.

---

## GitHub Pages로 배포하기 (처음 한 번)

1. GitHub에서 새 저장소를 만듭니다 (예: `incode-lab`). **Public**으로 만들어야 무료로 Pages를 쓸 수 있어요.
2. 이 폴더의 파일을 모두 올립니다. (웹에서 *Add file → Upload files*로 끌어다 놓아도 됩니다.)
3. 저장소 **Settings → Pages** → *Source: Deploy from a branch*, *Branch: main / (root)* → Save
4. 1~2분 뒤 `https://<아이디>.github.io/incode-lab/` 주소로 사이트가 열립니다.

### 연구실 사람들에게 수정 권한 주기

**Settings → Collaborators → Add people**에서 GitHub 아이디로 초대하세요. 초대받은 사람은 github.com에서 `data/` 파일을 열고 연필 아이콘(✏️)으로 바로 수정 → *Commit changes*를 누르면 1~2분 뒤 사이트에 반영됩니다. 사진은 해당 폴더에서 *Add file → Upload files*로 올립니다.

잘못 고쳤다면 저장소의 **History**에서 이전 버전을 보고 되돌릴 수 있어요.

> 수정이 사이트에 안 보이면: 브라우저가 이전 파일을 최대 10분간 기억해 두기 때문이에요. **Ctrl + F5**(맥은 Cmd + Shift + R)로 새로고침하면 바로 보여요.
> `css/`, `js/` 파일이나 `index.html`의 구조를 바꿨다면 `index.html` 아래쪽 `?v=2` 숫자를 모두 하나씩 올려 주세요(예: `?v=3`). 그래야 방문자들도 바로 새 버전을 받아요.

### 학교 주소(incode.sogang.ac.kr) 연결하기

1. **Settings → Pages → Custom domain**에 `incode.sogang.ac.kr` 입력 → Save
2. 학교 전산 담당에 *"incode.sogang.ac.kr 을 `<아이디>.github.io` 로 CNAME 연결해 달라"*고 요청합니다. (현재는 Google Sites로 연결되어 있음)
3. 연결되면 *Enforce HTTPS*를 체크합니다.

### 졸업 등으로 관리자가 바뀔 때

**Settings → General → Transfer ownership**으로 다음 관리자 계정에 저장소를 넘기면 수정 기록이 그대로 유지됩니다. 학교 주소를 연결해 두었다면 방문자가 쓰는 주소는 바뀌지 않아요.
