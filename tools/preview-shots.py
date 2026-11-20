# Takes screenshots of the pages a change affects and writes the pull-request comment (used by GitHub Actions).
#   git diff --name-only origin/main...HEAD | python tools/preview-shots.py shots
#   add --dry to only print which pages would be captured (no browser needed)
# Env: BASE = public URL folder where the PNGs will be published, RESIZED = text listing resized photos.
import os, sys, subprocess, pathlib, time

PAGES = {  # page key -> (label, hash route)
    "home": ("Home", "home"), "research": ("Research", "research"), "team": ("Team", "team"),
    "publications": ("Publications", "publications"), "news": ("News", "news"),
    "photo": ("Photo", "photo"), "photo-wall": ("Photo wall", "photo"), "lectures": ("Lectures", "lectures"),
}
RULES = [  # changed path prefix -> pages to show
    ("data/news.js", ["home", "news"]), ("img/news/", ["home", "news"]),
    ("data/photos.js", ["photo", "photo-wall"]), ("img/photos/", ["photo", "photo-wall"]),
    ("data/people.js", ["team"]), ("img/people/", ["team"]),
    ("data/publications.js", ["publications"]), ("data/research.js", ["research"]), ("img/research/", ["research"]),
    ("data/site.js", ["home", "lectures"]),
    ("css/", list(PAGES)), ("js/", list(PAGES)), ("index.html", list(PAGES)), ("img/banners/", list(PAGES)), ("img/logos/", list(PAGES)),
]

def pages_for(paths):
    want = []
    for path in paths:
        for prefix, keys in RULES:
            if path.startswith(prefix):
                want += [k for k in keys if k not in want]
    return [k for k in PAGES if k in want]  # keep menu order

def shoot(keys, out):
    from playwright.sync_api import sync_playwright
    server = subprocess.Popen([sys.executable, "-m", "http.server", "8800"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1)
    problems = []
    try:
        with sync_playwright() as pw:
            page = pw.chromium.launch().new_page(viewport={"width": 1280, "height": 900})
            for k in keys:
                page.goto(f"http://localhost:8800/?shot={k}#{PAGES[k][1]}")
                page.wait_for_timeout(1500)
                if k == "photo-wall":
                    page.click('#albumTabs [data-v="wall"]')
                    page.wait_for_timeout(3000)
                # scroll through once so lazy images load, then back to the top
                page.evaluate("""async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } scrollTo(0, 0); }""")
                page.wait_for_timeout(1000)
                h = min(page.evaluate("document.documentElement.scrollHeight"), 6000)
                page.screenshot(path=str(out / f"{k}.png"), full_page=True, clip={"x": 0, "y": 0, "width": 1280, "height": h})
                box = page.query_selector("#dataProblems")
                if box:
                    problems += [f"{PAGES[k][0]}: {li.inner_text()}" for li in box.query_selector_all("li")]
    finally:
        server.terminate()
    return list(dict.fromkeys(problems))

def comment(keys, problems, out):
    base, resized = os.environ.get("BASE", "."), os.environ.get("RESIZED", "").strip()
    lines = ["### 미리보기", ""]
    if problems:
        lines += ["> [!WARNING]", "> **데이터 확인 필요** — 아래 문제를 고친 뒤 승인하세요."] + [f"> - {p}" for p in problems] + [""]
    if resized:
        lines += [f"사진을 웹용 크기로 줄여서 이 요청에 다시 저장했어요.", "", "```", resized, "```", ""]
    if keys:
        lines += ["이 수정이 반영되면 아래 페이지가 이렇게 보여요 (클릭하면 크게 보여요)."]
        for k in keys:
            lines += ["", f"<details open><summary><b>{PAGES[k][0]}</b></summary>", "", f'<a href="{base}/{k}.png"><img src="{base}/{k}.png" width="640"></a>', "", "</details>"]
    else:
        lines += ["화면에 보이는 페이지는 바뀌지 않아요."]
    lines += ["", "---", "**승인하려면:** 위 **Files changed** 탭 → **Review changes** → **Approve** → 이 화면 아래 **Merge pull request**. 1~2분 뒤 사이트에 반영돼요."]
    (out / "comment.md").write_text("\n".join(lines), encoding="utf8")

if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    out = pathlib.Path(args[0] if args else "shots"); out.mkdir(exist_ok=True)
    keys = pages_for([l.strip() for l in sys.stdin if l.strip()])
    if "--dry" in sys.argv:
        print(keys); sys.exit()
    problems = shoot(keys, out) if keys else []
    comment(keys, problems, out)
    print("captured:", keys, "problems:", len(problems))
