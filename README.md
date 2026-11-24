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
  site.js             모집 공고, 강의 목록, 커버 애니메이션, Home 뉴스 개수
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
- 학회·수상 소식처럼 여러 장을 흰 판 위에 붙인 사진은 `python tools/cream-gutters.py --apply img/news/파일.jpg`로 흰 판을 페이지 바탕색(크림색)으로 바꿀 수 있어요. (`--apply` 없이 실행하면 미리보기 파일만 만들어요)
- 줄을 나누고 싶으면 `text`를 백틱(`` ` ``)으로 감싸고 엔터로 줄바꿈하면 돼요.
- Home의 **Group News**에는 최신 소식 10개만 나오고(`data/site.js`의 `homeNewsCount`), **News 페이지에는 모든 소식이 기록으로 남아요.** 오래된 소식도 지우지 말고 그대로 두세요.

### 2. 논문 추가 — `data/publications.js`

`JOURNALS: [` 아래 **맨 위**에 추가하고, `no`는 마지막 번호 + 1로 적으세요.

```js
{
  no: 49,
  year: 2026,
  title: "논문 제목",
  authors: "Minjeong Lee, Jihwan Song*",
  journal: "Lab on a Chip",
  impact: "IF 6.1 · Q1-10%",
  volume: "26, 1234",
  date: "2026.10",
  link: "https://doi.org/..."
},
```

- 심사 중이면 `journal: "Under review"`로 두고 `impact`, `volume`, `date`, `link`는 빼도 됩니다.
- `note: "Cover Feature"`처럼 강조 문구를 붙일 수 있어요.
- `impact`는 `Q1-10%`처럼 분위와 %를 붙여 쓰고, JCI·JIF·JCR 같은 말은 넣지 않아요.

#### 저자는 자동으로 알아봐요
논문을 넣기만 하면, `authors`에서 교수님과 `data/people.js`에 있는 멤버·졸업생 이름을 찾아서
1. 이름에 **주황 밑줄**을 치고
2. 그 사람의 **Team 카드에 논문을 자동으로 붙여요.** (사람마다 따로 적을 필요 없어요)

단, 이름이 `people.js`의 `name`과 **글자 하나까지 똑같아야** 해요. († * 표시는 상관없어요)

| 논문 저자 표기 | people.js 이름 | 인식 |
|---|---|---|
| `Seunggyun Byeon†` | `Seunggyun Byeon` | ✅ |
| `Chaeeun Sung` | `Chae eun Sung` | ❌ → `aka`로 해결 |
| `Seung-gyun Byeon` | `Seunggyun Byeon` | ❌ 하이픈이 다름 |
| `seunggyun byeon` | `Seunggyun Byeon` | ❌ 대소문자가 다름 |

- **표기가 다를 때**: 그 사람 정보에 `aka`로 다른 표기를 적어 주세요. 예) `aka: ["Chaeeun Sung"]`
- **people.js에 없는 사람**(예: 카드 없는 학부 졸업생)에게 밑줄만 치고 싶으면 `publications.js` 맨 위 `GROUP_MEMBERS`에 이름을 넣으세요.
- **동명이인 주의**: 다른 학교 공동저자가 우리 멤버와 이름이 완전히 같으면 그 논문이 우리 멤버 카드에도 붙어요.
- **확인 방법**: Publications 페이지에서 그 이름에 주황 밑줄이 있으면 카드에도 붙은 거예요.

### 3. 멤버 추가 / 졸업 처리 — `data/people.js`

- **새 멤버**: 사진을 `img/people/이름.jpg`로 넣고, `MEMBERS`의 알맞은 그룹(`Ph.D. candidates`, `M.S. candidates` 등)에 추가하세요.
  ```js
  {
    name: "Gildong Hong",
    photo: "people/gildong-hong.jpg",
    position: "Master's Program",
    interests: ["관심 연구 1", "관심 연구 2"],
    education: ["2027 B.S., Mechanical Engineering"],
    email: "gildong@sogang.ac.kr"
  },
  ```
  논문은 적지 않아도 돼요. `publications.js` 저자 목록에 이름이 있으면 자동으로 붙어요. ([저자는 자동으로 알아봐요](#저자는-자동으로-알아봐요) 참고)
  `publications.js`에 없는 논문이나 수상은 `publications: ["글자 그대로"]`로 적으면 함께 나와요.
- **사진은 모든 멤버가 같은 모양**(동그란 사진, 연한 회색 배경, 얼굴 높이·크기 동일)이에요. 새 사진을 넣은 뒤 아래 명령으로 맞춰 주세요. 증명사진처럼 단색 배경 사진이 가장 잘 돼요.
  ```
  python tools/fit-portrait.py img/people/gildong-hong.jpg
  ```
- 석사·박사과정은 논문이 없어도 `Publications & honors` 칸이 보이고("To be updated."), 다른 과정은 논문이 생기면 나타나요.
- **졸업**: `MEMBERS`에서 지우고 `ALUMNI` 맨 위에 추가하세요. 논문은 이름으로 자동으로 따라와요.
  ```js
  {
    name: "Gildong Hong",
    position: "Samsung SDI",
    education: ["2028 M.S., Mechanical Engineering, Sogang University"]
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
- 행사 종류 태그(Conference / Celebration / Lab life)는 제목을 보고 자동으로 붙어요. 틀리게 붙으면 `tag: "conf"`(학회) `"celebrate"`(생일·스승의 날·졸업 등 축하하는 날) `"life"`(회식·환영회·송별회 등 연구실 일상) 중 하나를 적어 주세요.
- 여러 장을 흰 틈으로 이어 붙인 사진은 `python tools/split-collages.py`로 몇 장으로 나뉠지 먼저 보고, `--apply`를 붙여 실행하면 낱장 파일로 나누고 `photos.js`도 고쳐 줘요.
- 새해가 되면 `window.ALBUMS = [` 아래 맨 위에 `{ label: "2027", events: [ ... ] },`를 추가하세요.

### 5. 모집 공고 · 강의 · 커버 · Home 뉴스 개수 — `data/site.js`

- `hiring`: 박사후 연구원 등 모집 공고. 마감되면 `show: false`
- `lectures`: 학기별 강의 목록
- `coverScenes`: Home 커버에 랜덤으로 나오는 애니메이션. `"energy"`(전고체전지), `"spheroid"`(스페로이드 칩), `"plasmonic"`(금 나노홀), `"neural"`(PINN) 중 원하는 것만 남기세요. `tools/scene-preview.html`에서 미리 볼 수 있어요.
- `homeNewsCount`: Home의 Group News에 보여줄 최신 소식 개수 (기본 10)

### 6. 연구 소개 — `data/research.js`

분야별 소개 문단(`overview`, `bullets`, `closing`)과 프로젝트(`projects`)를 고칠 수 있어요. 프로젝트 그림은 `img/research/`에 있습니다.

---

## 사진 규칙

- 파일 이름은 **영어 소문자, 숫자, 하이픈(-)만** 쓰세요. 예: `2026-10-20-2.jpg` (한글·공백 X)
- GitHub Pages는 **대소문자를 구분**합니다. `Photo.JPG`와 `photo.jpg`는 다른 파일이에요.
- 사진 크기는 신경 쓰지 않아도 돼요. GitHub에 올리면 자동으로 가로 1600px 이하로 줄여 줘요. (이 컴퓨터에서 직접 줄이려면 `python tools/resize-images.py 파일경로`)

---

## GitHub Pages로 배포하기 (처음 한 번)

1. GitHub에서 새 저장소를 만듭니다 (예: `incode-lab`). **Public**으로 만들어야 무료로 Pages를 쓸 수 있어요.
2. 이 폴더의 파일을 모두 올립니다. (웹에서 *Add file → Upload files*로 끌어다 놓아도 됩니다.)
3. 저장소 **Settings → Pages** → *Source: Deploy from a branch*, *Branch: main / (root)* → Save
4. 1~2분 뒤 `https://<아이디>.github.io/incode-lab/` 주소로 사이트가 열립니다.

### 연구실 사람들에게 수정 권한 주기

**Settings → Collaborators → Add people**에서 GitHub 아이디로 초대하세요.

### 수정 → 미리보기 → 승인 흐름

`main`에 보호 규칙이 켜져 있으면, 연구실 사람이 고친 내용은 바로 사이트에 반영되지 않고 **승인을 기다리는 수정 요청(Pull Request)** 이 됩니다.

1. github.com에서 `data/` 파일을 열고 연필 아이콘(✏️)으로 고치거나, 사진 폴더에서 *Add file → Upload files*로 사진을 올립니다.
2. *Commit changes*를 누르면 **"Create a new branch … and start a pull request"** 가 선택돼 있어요. 그대로 *Propose changes* → *Create pull request*.
3. 2~3분 뒤 GitHub가 자동으로
   - 새 사진을 **가로 1600px 이하로 줄여서** 다시 저장하고
   - 바뀐 페이지를 **화면 캡처해서** 수정 요청에 댓글로 붙여 줘요. 데이터 실수가 있으면 "데이터 확인 필요" 경고도 함께 나와요.
4. 관리자가 캡처를 보고 **Files changed → Review changes → Approve → Merge pull request**를 누르면 1~2분 뒤 사이트에 반영됩니다. 고칠 게 있으면 같은 요청에서 파일을 더 고치면 캡처가 새로 올라와요.

잘못 반영됐다면 저장소의 **History**에서 이전 버전을 보고 되돌릴 수 있어요.

> 이 자동화는 `.github/workflows/`에 있어요 (`preview.yml`: 캡처·사진 줄이기, `resize-images.yml`: main에 바로 올린 사진 줄이기). 캡처 이미지는 사이트와 상관없는 `previews` 브랜치에 쌓여요.

#### 처음 한 번: main 보호 규칙 켜기

**Settings → Rules → Rulesets → New ruleset → New branch ruleset**
- Ruleset name: `main`, Enforcement status: **Active**
- Bypass list: **Add bypass → Repository admin** (관리자는 승인 없이 바로 올릴 수 있게)
- Target branches: **Add target → Include default branch**
- **Require a pull request before merging** 체크 → Required approvals: **1**
- 맨 아래 **Create**

> 수정이 사이트에 안 보이면: 브라우저가 이전 파일을 최대 10분간 기억해 두기 때문이에요. **Ctrl + F5**(맥은 Cmd + Shift + R)로 새로고침하면 바로 보여요.
> `css/`, `js/` 파일이나 `index.html`의 구조를 바꿨다면 `index.html` 아래쪽 `?v=` 숫자를 모두 하나씩 올려 주세요. 그래야 방문자들도 바로 새 버전을 받아요.

### 학교 주소(incode.sogang.ac.kr) 연결하기

1. **Settings → Pages → Custom domain**에 `incode.sogang.ac.kr` 입력 → Save
2. 학교 전산 담당에 *"incode.sogang.ac.kr 을 `<아이디>.github.io` 로 CNAME 연결해 달라"*고 요청합니다. (현재는 Google Sites로 연결되어 있음)
3. 연결되면 *Enforce HTTPS*를 체크합니다.

### 졸업 등으로 관리자가 바뀔 때

**Settings → General → Transfer ownership**으로 다음 관리자 계정에 저장소를 넘기면 수정 기록이 그대로 유지됩니다. 학교 주소를 연결해 두었다면 방문자가 쓰는 주소는 바뀌지 않아요.
