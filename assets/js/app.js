(function () {
  "use strict";

  const W = window.WIKI;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const main = $("#main");
  const rail = $("#rail");
  const page = $("#page");

  const charById = Object.fromEntries(W.characters.map((c) => [c.id, c]));

  // 캐릭터가 아닌 일반 문서
  const PAGES = {
    characters: { title: "분류:캐릭터", url: "#/characters", desc: "분류" },
    story: { title: "메인 스토리", url: "#/story", desc: "작품" },
    world: { title: "세계관", url: "#/world", desc: "작품" },
    endings: { title: "엔딩", url: "#/endings", desc: "작품" },
    items: { title: "아이템", url: "#/items", desc: "작품" },
    notes: { title: "제작 노트", url: "#/notes", desc: "작품" },
    all: { title: "모든 문서", url: "#/all", desc: "탐색" },
  };

  /* ---------- helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function linkTo(id) {
    if (charById[id]) return { url: `#/c/${id}`, title: charById[id].name };
    if (PAGES[id]) return PAGES[id];
    return null;
  }

  // 한 줄 안의 위키 문법 → HTML  ([[id|라벨]], **굵게**)
  function richInline(line) {
    return esc(line)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, id, label) => {
        const t = linkTo(id.trim());
        return t ? `<a href="${t.url}">${label || t.title}</a>` : label || id;
      });
  }

  // 여러 줄 위키 문법 → HTML  (빈 줄 = 문단, "* " = 목록)
  function rich(text) {
    return String(text)
      .split(/\n{2,}/)
      .map((para) => {
        const lines = para.trim().split("\n");
        if (lines.every((l) => /^\s*[*-]\s/.test(l))) {
          return `<ul>${lines.map((l) => `<li>${richInline(l.replace(/^\s*[*-]\s/, ""))}</li>`).join("")}</ul>`;
        }
        return `<p>${lines.map(richInline).join("<br>")}</p>`;
      })
      .join("");
  }

  const tbd = (label) => `<p class="tbd">${esc(label)} — 텍스트 입력 예정</p>`;
  const text = (value, label) => (value ? rich(value) : tbd(label));
  const inline = (value) => (value ? esc(value) : `<span class="tbd-inline">입력 예정</span>`);
  const sdImg = (c) => `<img src="${c.images.sd}" alt="${esc(c.name)}" loading="lazy">`;

  const ICON = {
    prev: `<svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg>`,
    next: `<svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>`,
    shuffle: `<svg viewBox="0 0 24 24"><path d="M3 7h3.5c2 0 3 1 4.2 2.8l2.6 4.4C14.5 16 15.5 17 17.5 17H21M3 17h3.5c1.4 0 2.3-.5 3.1-1.4M14.4 8.4c.8-.9 1.7-1.4 3.1-1.4H21M18 4l3 3-3 3M18 14l3 3-3 3"/></svg>`,
    image: `<svg viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 5-5 4 4 3-3 4 4"/></svg>`,
    list: `<svg viewBox="0 0 24 24"><path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/></svg>`,
    pencil: `<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>`,
  };

  // 페이지 공통 머리 (분류 / 제목 / 액션)
  function header({ cat, title, actions = "" }) {
    return `<div class="ph-top">${cat ? `분류: ${cat}` : ""}</div>
      <div class="page-header"><h1 class="page-title">${esc(title)}</h1>${actions ? `<div class="page-actions">${actions}</div>` : ""}</div>`;
  }

  const categories = (list) => `<div class="categories"><b>분류:</b>${list.map(([l, u]) => `<a href="${u}">${esc(l)}</a>`).join("")}</div>`;
  const license = () => `<p class="license">${esc(W.site.title)} © ${W.site.year} ${esc(W.site.author)}. 모든 이미지와 설정의 저작권은 작가에게 있습니다.</p>`;

  function toc(items) {
    return `<nav class="toc" aria-label="목차">
      <div class="toc__head"><b>${ICON.list}목차</b><button class="toc__toggle" type="button">[숨기기]</button></div>
      <ol>${items.map(([id, t]) => `<li><a href="#" data-jump="${id}">${esc(t)}</a></li>`).join("")}</ol>
    </nav>`;
  }

  /* ---------- slideshow (옆으로 밀리는 슬라이더 + 아래 캡션·썸네일 바) ---------- */
  function slideshow(slides) {
    const multi = slides.length > 1;
    return `<figure class="figure slideshow" aria-roledescription="carousel" aria-label="대문 이미지" data-index="0">
      <div class="slideshow__stage">
        <div class="slideshow__track">
          ${slides.map((s, i) => `<div class="slideshow__slide"><img src="${s.src}" alt="${esc(s.caption || "")}" data-zoom="${s.src}" data-caption="${esc(s.caption || "")}" ${i ? 'loading="lazy"' : ""}></div>`).join("")}
        </div>
        ${multi ? `<button class="slideshow__arrow slideshow__arrow--prev" type="button" data-slide="-1" aria-label="이전 사진">${ICON.prev}</button>
        <button class="slideshow__arrow slideshow__arrow--next" type="button" data-slide="1" aria-label="다음 사진">${ICON.next}</button>` : ""}
      </div>
      <figcaption class="slideshow__nav">
        <div class="slideshow__caption">
          ${slides.map((s, i) => `<div class="slideshow__cap${i === 0 ? " is-active" : ""}"><b>${esc(s.caption || "")}</b>${s.desc ? `<span>${esc(s.desc)}</span>` : ""}</div>`).join("")}
        </div>
        ${multi ? `<div class="slideshow__thumbs">${slides.map((s, i) => `<button type="button" class="slideshow__thumb${i === 0 ? " is-active" : ""}" data-slide-to="${i}" aria-label="${i + 1}번째 사진"><img src="${s.src}" alt=""></button>`).join("")}</div>` : ""}
      </figcaption>
    </figure>`;
  }

  let slideTimer = null;
  function startSlideshow() {
    clearInterval(slideTimer);
    const box = $(".slideshow");
    if (!box || $$(".slideshow__slide", box).length < 2) return;
    // 크게 보기 창이 열려 있는 동안은 넘기지 않음
    slideTimer = setInterval(() => { if (lb.hidden) goSlide(1); }, (W.home.slideSeconds || 7) * 1000);
  }
  function goSlide(step, absolute) {
    const box = $(".slideshow");
    if (!box) return clearInterval(slideTimer);
    const n = $$(".slideshow__slide", box).length;
    const cur = Number(box.dataset.index) || 0;
    const next = absolute === "to" ? step : (cur + step + n) % n;
    box.dataset.index = next;
    $(".slideshow__track", box).style.transform = `translateX(-${next * 100}%)`;
    $$(".slideshow__cap", box).forEach((c, i) => c.classList.toggle("is-active", i === next));
    $$(".slideshow__thumb", box).forEach((t, i) => t.classList.toggle("is-active", i === next));
  }

  /* ---------- pages ---------- */
  function renderHome() {
    const h = W.home;
    return {
      rail: false,
      title: "대문",
      html: `${header({ title: "대문" })}
      <div class="content">
        <p class="warn-title">안내 <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg></p>
        ${text(h.notice, "대문 안내 문구 (예: 스포일러 주의)")}

        ${slideshow(h.slides || [{ src: W.site.header, caption: "Dreaming Cradle 타이틀 화면" }])}

        <h2>환영합니다</h2>
        ${text(h.welcome, "환영 문구")}

        <h2>Dreaming Cradle 소개</h2>
        ${text(h.about, "작품 소개")}
        ${license()}
      </div>`,
    };
  }

  function renderCharacter(c) {
    const i = W.characters.indexOf(c);
    const prev = W.characters[(i - 1 + W.characters.length) % W.characters.length];
    const next = W.characters[(i + 1) % W.characters.length];
    const s = c.sections;
    const secs = [["appearance", "외형"], ["personality", "성격"], ["story", "스토리"], ["gallery", "갤러리"], ["trivia", "트리비아"]];

    const rows = c.infobox.map((r) => `<div class="infobox__row"><dt>${esc(r.label)}</dt><dd>${inline(r.value)}</dd></div>`).join("");
    const infobox = `<aside class="infobox">
      <h2 class="infobox__title">${esc(c.name)}</h2>
      <div class="infobox__tabs" role="tablist">
        <button class="infobox__tab" role="tab" aria-selected="true" data-view="ld">일러스트</button>
        <button class="infobox__tab" role="tab" aria-selected="false" data-view="sd">SD</button>
      </div>
      <div class="infobox__img" data-view="ld" data-zoom="${c.images.ld}" data-caption="${esc(c.name)} 일러스트" role="button" tabindex="0" aria-label="${esc(c.name)} 이미지 크게 보기"><img src="${c.images.ld}" alt="${esc(c.name)}"></div>
      <p class="infobox__group">정보</p>
      <dl>${rows}<div class="infobox__row"><dt>컬러</dt><dd>${c.swatches.map((x) => `<span class="swatch" style="background:${x}" title="${x}"></span>`).join("")}</dd></div></dl>
    </aside>`;

    const navbox = `<table class="navbox" role="presentation"><tbody style="display:block">
      <tr style="display:block"><th class="navbox__title" style="display:block">Dreaming Cradle 캐릭터</th></tr>
      <tr class="navbox__row"><th>주인공</th><td>${W.characters.filter((x) => x.emotion === "주인공").map((x) => `<a href="#/c/${x.id}" class="${x === c ? "is-current" : ""}">${esc(x.name)}</a>`).join("")}</td></tr>
      <tr class="navbox__row"><th>감정 NPC</th><td>${W.characters.filter((x) => x.emotion !== "주인공").map((x) => `<a href="#/c/${x.id}" class="${x === c ? "is-current" : ""}">${esc(x.name)}</a>`).join("")}</td></tr>
    </tbody></table>`;

    return {
      rail: true,
      current: c.id,
      title: c.name,
      html: `${header({
        cat: `<a href="#/characters">캐릭터</a>`,
        title: c.name,
        actions: `<a class="pa" href="#/c/${prev.id}">${ICON.prev}이전</a><a class="pa" href="#/c/${next.id}">다음${ICON.next}</a>`,
      })}
      <div class="content char-layout">
        ${infobox}
        <div class="char-body">
        ${c.quote ? `<blockquote class="quote">“${esc(c.quote)}”<cite>— ${esc(c.name)}</cite></blockquote>` : `<p class="tbd" style="text-align:center">대사 한 줄 — 텍스트 입력 예정</p>`}
        ${text(c.summary, `${c.name} 소개`)}
        ${toc(secs)}
        <h2 id="appearance">외형</h2>${text(s.appearance, "외형 설명")}
        <h2 id="personality">성격</h2>${text(s.personality, "성격 설명")}
        <h2 id="story">스토리</h2>${text(s.story, "스토리 속 역할")}
        <h2 id="gallery">갤러리</h2>
        <div class="gallery">
          ${[["ld", "일러스트"], ["sd", "SD"]].map(([k, l]) => `<button class="gallery__item" type="button" data-zoom="${c.images[k]}" data-caption="${esc(c.name)} ${l}"><span class="gallery__thumb"><img src="${c.images[k]}" alt="${esc(c.name)} ${l}" loading="lazy"></span><span class="gallery__cap">${l}</span></button>`).join("")}
        </div>
        <h2 id="trivia">트리비아</h2>${text(s.trivia, "트리비아")}
        </div>
      </div>
      <div class="content">
        ${navbox}
        ${categories([["캐릭터", "#/characters"]])}
        ${license()}
      </div>`,
    };
  }

  function initial(name) {
    const code = name.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) return name[0];
    return "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"[Math.floor(code / 588)];
  }

  function renderCharacters() {
    const groups = {};
    [...W.characters].sort((a, b) => a.name.localeCompare(b.name, "ko")).forEach((c) => {
      (groups[initial(c.name)] = groups[initial(c.name)] || []).push(c);
    });
    return {
      rail: true,
      title: "분류:캐릭터",
      html: `${header({ title: "분류:캐릭터" })}
      <div class="content">
        <p>이 분류에 속하는 문서는 모두 ${W.characters.length}개입니다.</p>
        <div class="cat-grid">${W.characters.map((c) => `<a class="cat-card" href="#/c/${c.id}"><span class="cat-card__img">${sdImg(c)}</span><span>${esc(c.name)}</span></a>`).join("")}</div>
        <h2>가나다순</h2>
        <ul class="catlist">${Object.entries(groups).map(([k, list]) => `<li><h4>${k}</h4>${list.map((c) => `<a href="#/c/${c.id}">${esc(c.name)}</a>`).join("<br>")}</li>`).join("")}</ul>
        ${license()}
      </div>`,
    };
  }

  function renderStory() {
    const chs = W.story.chapters;
    const label = (ch) => `챕터 ${ch.no}${ch.title ? ". " + ch.title : ""}`;
    return {
      rail: true,
      title: "메인 스토리",
      html: `${header({ cat: `<a href="#/all">작품</a>`, title: "메인 스토리" })}
      <div class="content">
        ${text(W.story.summary, "메인 스토리 개요")}
        ${toc(chs.map((ch) => [`ch${ch.no}`, label(ch)]))}
        ${chs.map((ch) => {
          const c = charById[ch.character];
          return `<h2 id="ch${ch.no}">${esc(label(ch))}</h2>
            ${c ? `<p style="font-size:13px;color:var(--muted)">중심 캐릭터: <a href="#/c/${c.id}">${esc(c.name)}</a> (${esc(c.emotion)})</p>` : ""}
            ${ch.map ? `<figure class="figure map-figure"><img src="${ch.map}" alt="${esc(label(ch))} 맵" data-zoom="${ch.map}" data-caption="${esc(label(ch))} 맵" loading="lazy"><figcaption>${esc(label(ch))} 맵</figcaption></figure>` : ""}
            ${text(ch.text, `챕터 ${ch.no} 줄거리`)}`;
        }).join("")}
        ${categories([["작품", "#/all"]])}
        ${license()}
      </div>`,
    };
  }

  function renderWorld() {
    const secs = W.world.sections;
    return {
      rail: true,
      title: "세계관",
      html: `${header({ cat: `<a href="#/all">작품</a>`, title: "세계관" })}
      <div class="content">
        ${W.world.summary ? rich(W.world.summary) : ""}
        ${toc(secs.map((s, i) => [`w${i}`, s.title]))}
        ${secs.map((s, i) => `<h2 id="w${i}">${esc(s.title)}</h2>${text(s.text, s.title)}`).join("")}
        ${categories([["작품", "#/all"]])}
        ${license()}
      </div>`,
    };
  }

  function renderEndings() {
    const list = W.endings.list;
    return {
      rail: true,
      title: "엔딩",
      html: `${header({ cat: `<a href="#/all">작품</a>`, title: "엔딩" })}
      <div class="content">
        ${text(W.endings.summary, "엔딩 소개")}
        <p class="spoiler-note">⚠ 아래 내용은 결말 스포일러입니다. 각 엔딩의 <b>스포일러 보기</b>를 눌러야 내용이 보입니다.</p>
        ${toc(list.map((e, i) => [`e${i}`, e.type]))}
        ${list.map((e, i) => `<h2 id="e${i}"><span class="ending-tag ending-tag--${e.type.split(" ")[0].toLowerCase()}">${esc(e.type)}</span></h2>
          <details class="spoiler">
            <summary><span class="spoiler__show">스포일러 보기 ▼</span><span class="spoiler__hide">스포일러 숨기기 ▲</span></summary>
            <div class="spoiler__body"><h3>${esc(e.title)}</h3>${text(e.text, e.title)}</div>
          </details>`).join("")}
        ${categories([["작품", "#/all"]])}
        ${license()}
      </div>`,
    };
  }

  /* ---------- 아이템 인벤토리 ---------- */
  let invList = [];

  function itemsFor(tab) {
    const I = W.items;
    if (tab === "key") return I.list.map((k) => ({ name: k.name, icon: k.icon || null, tag: `주요 아이템 · ${k.type}`, text: k.text }));
    return I.objects
      .filter((o) => tab === "all" || o.group === tab)
      .map((o) => {
        const c = charById[o.group];
        return { name: o.name, icon: o.icon, tag: I.groups[o.group] || "", where: c ? `[[${c.id}|${c.name}]]의 ${I.groups[o.group].replace(/^\S+\s/, "")}` : null, text: o.text };
      });
  }

  function invGrid(tab) {
    invList = itemsFor(tab);
    // 빈 칸으로 줄을 채움 (12의 배수라 한 줄 4·6칸 어느 쪽이든 딱 맞음)
    const total = Math.max(24, Math.ceil(invList.length / 12) * 12);
    let html = invList.map((it, i) => `<button type="button" class="inv-slot${i === 0 ? " is-selected" : ""}" data-inv-item="${i}" aria-label="${esc(it.name)}" aria-pressed="${i === 0}">
      ${it.icon ? `<img src="${it.icon}" alt="">` : `<span class="inv-slot__unknown">?</span>`}</button>`).join("");
    for (let i = invList.length; i < total; i++) html += `<span class="inv-slot inv-slot--empty" aria-hidden="true"></span>`;
    return html;
  }

  function invDetail(it) {
    if (!it) return "";
    return `<div class="inv-detail__icon">${it.icon ? `<img src="${it.icon}" alt="">` : `<span class="inv-slot__unknown">?</span>`}</div>
      <h3 class="inv-detail__name">${esc(it.name)}</h3>
      ${it.tag ? `<span class="inv-detail__tag">${esc(it.tag)}</span>` : ""}
      ${it.where ? `<p class="inv-detail__where">등장: ${richInline(it.where)}</p>` : ""}
      ${it.text ? `<div class="inv-detail__text">${rich(it.text)}</div>` : ""}`;
  }

  function selectInvTab(tab) {
    const inv = $(".inv");
    $$(".inv-tab", inv).forEach((b) => b.setAttribute("aria-selected", b.dataset.invTab === tab));
    $("#inv-grid").innerHTML = invGrid(tab);
    $("#inv-grid").scrollTop = 0;
    $("#inv-count").textContent = `${invList.length}개`;
    $("#inv-detail-body").innerHTML = invDetail(invList[0]);
  }

  function selectInvItem(i) {
    $$(".inv-slot[data-inv-item]").forEach((s) => {
      const on = Number(s.dataset.invItem) === i;
      s.classList.toggle("is-selected", on);
      s.setAttribute("aria-pressed", on);
    });
    $("#inv-detail-body").innerHTML = invDetail(invList[i]);
    // 폰처럼 정보창이 화면 밖(아래)에 있으면 보이는 곳까지 살짝 내려줌
    const box = $(".inv-detail").getBoundingClientRect();
    if (box.bottom > window.innerHeight - 70) $(".inv-detail").scrollIntoView({ behavior: "smooth", block: "end" });
  }

  function renderItems() {
    const I = W.items;
    const grid = invGrid("all");
    return {
      rail: true,
      title: "아이템",
      html: `${header({ cat: `<a href="#/all">작품</a>`, title: "아이템" })}
      <div class="content">
        ${text(I.summary, "아이템 소개")}
        <h2>인벤토리</h2>
        <div class="inv">
          <section class="inv-win" aria-label="${esc(I.inventoryTitle)}">
            <div class="inv-win__bar"><span class="inv-win__title">${esc(I.inventoryTitle)}</span><span class="inv-win__btns" aria-hidden="true"><i></i><i></i><i></i></span></div>
            <div class="inv-tabs" role="tablist">${I.tabs.map((t, i) => `<button type="button" class="inv-tab" role="tab" data-inv-tab="${t.id}" aria-selected="${i === 0}" aria-label="${esc(t.label)}"><span class="inv-tab__long">${esc(t.label)}</span><span class="inv-tab__short">${esc(t.label.split(" ")[0])}</span></button>`).join("")}</div>
            <div class="inv-grid" id="inv-grid">${grid}</div>
            <div class="inv-foot"><span class="inv-coin" aria-hidden="true">C</span><span class="inv-count" id="inv-count">${invList.length}개</span></div>
          </section>
          <section class="inv-win inv-detail" aria-label="아이템 정보">
            <div class="inv-win__bar"><span class="inv-win__title">아이템 정보</span><span class="inv-win__btns" aria-hidden="true"><i></i><i></i><i></i></span></div>
            <div class="inv-detail__body" id="inv-detail-body" aria-live="polite">${invDetail(invList[0])}</div>
          </section>
        </div>

        <h2>상점</h2>
        <div class="shops">${I.shops.map((s) => {
          const c = charById[s.character];
          return `<figure class="figure shop"><img src="${s.image}" alt="${esc(s.title)}" data-zoom="${s.image}" data-caption="${esc(s.title)}" loading="lazy"><figcaption>${c ? `<a href="#/c/${c.id}">${esc(c.name)}</a>` : ""} ${esc(s.title.replace(/^\S+\s/, ""))}</figcaption></figure>`;
        }).join("")}</div>
        ${categories([["작품", "#/all"]])}
        ${license()}
      </div>`,
    };
  }

  function renderNotes() {
    const secs = W.notes.sections;
    return {
      rail: true,
      title: "제작 노트",
      html: `${header({ cat: `<a href="#/all">작품</a>`, title: "제작 노트" })}
      <div class="content">
        ${toc([...secs.map((s, i) => [`n${i}`, s.title]), ["credits", "제작 정보"], ["panels", "졸업전시 판넬"]])}
        ${secs.map((s, i) => `<h2 id="n${i}">${esc(s.title)}</h2>${text(s.text, s.title)}`).join("")}
        <h2 id="credits">제작 정보</h2>
        <table class="wikitable wikitable--kv"><tbody>${W.notes.credits.map((c) => `<tr><th>${esc(c.label)}</th><td>${richInline(c.value)}</td></tr>`).join("")}</tbody></table>
        <h2 id="panels">졸업전시 판넬</h2>
        <div class="panels">${W.notes.panels.map((p) => `<button class="panel-thumb" type="button" data-zoom="${p.src}" data-caption="${esc(p.caption)}" data-tall="1"><img src="${p.src}" alt="${esc(p.caption)}" loading="lazy"><span>${esc(p.caption)}</span></button>`).join("")}</div>
        ${categories([["작품", "#/all"]])}
        ${license()}
      </div>`,
    };
  }

  function allEntries() {
    return [
      { title: "대문", url: "#/", desc: "위키 대문", cover: W.site.header },
      ...W.characters.map((c) => ({ title: c.name, url: `#/c/${c.id}`, desc: `캐릭터 · ${c.emotion}`, img: c.images.sd, keys: [c.emotion, c.id] })),
      ...Object.values(PAGES).map((p) => ({ title: p.title, url: p.url, desc: p.desc })),
    ];
  }

  function renderAll() {
    const list = allEntries().sort((a, b) => a.title.localeCompare(b.title, "ko"));
    return {
      rail: true,
      title: "모든 문서",
      html: `${header({ title: "모든 문서" })}<div class="content"><p>문서 ${list.length}개</p><ul class="catlist">${list.map((e) => `<li><a href="${e.url}">${esc(e.title)}</a></li>`).join("")}</ul>${license()}</div>`,
    };
  }

  function search(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    return allEntries().filter((e) => [e.title, e.desc, ...(e.keys || [])].some((s) => s && s.toLowerCase().includes(q)));
  }

  function renderSearch(q) {
    const results = search(q);
    return {
      rail: true,
      title: "검색 결과",
      html: `${header({ title: `"${q}" 검색 결과` })}<div class="content">
        <p>${results.length}개의 문서를 찾았습니다.</p>
        ${results.length ? results.map((e) => `<div class="result"><img src="${e.img || W.site.logo}" alt=""><span><a href="${e.url}"><b>${esc(e.title)}</b></a><small>${esc(e.desc)}</small></span></div>`).join("") : tbd(`"${q}"에 해당하는 문서가 없습니다`)}
      </div>`,
    };
  }

  function render404() {
    return {
      rail: true,
      title: "문서 없음",
      html: `${header({ title: "문서를 찾을 수 없습니다" })}<div class="content"><p>요청한 문서가 존재하지 않습니다. <a href="#/">대문으로 돌아가기</a></p></div>`,
    };
  }

  /* ---------- rail ---------- */
  function renderRail(currentId) {
    rail.innerHTML = `
      <section class="rail-box"><div class="rail-box__stripe"></div>
        <h2 class="rail-box__title">Dreaming Cradle</h2>
        <div class="rail-box__body"><img src="${W.site.logo}" alt=""><p style="margin:0">${W.home.tagline ? esc(W.home.tagline) : "작품 한 줄 소개 — 텍스트 입력 예정"}</p>
          <a class="btn btn--solid" href="#/world">세계관 보기</a><a class="btn btn--outline" href="#/story">메인 스토리</a></div>
      </section>
      <section class="rail-box"><h2 class="rail-box__title" style="text-align:left">인기 문서</h2>
        <ul class="pop">${W.characters.map((c) => `<li><a href="#/c/${c.id}" class="${c.id === currentId ? "is-current" : ""}"><span class="pop__img">${sdImg(c)}</span><span><b>${esc(c.name)}</b><small>${esc(c.emotion)}</small></span></a></li>`).join("")}</ul>
      </section>`;
  }

  /* ---------- menus / drawer / footer ---------- */
  function renderChrome() {
    const groups = [
      ["탐색", `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="m15 9-2 4-4 2 2-4z"/></svg>`, [["대문", "#/"], ["모든 문서", "#/all"], ["랜덤 문서", "#/random"]]],
      ["위키 콘텐츠", "", [["캐릭터", "#/characters"], ...W.characters.map((c) => [c.name, `#/c/${c.id}`, c.images.sd])]],
      ["작품", "", [["메인 스토리", "#/story"], ["세계관", "#/world"], ["엔딩", "#/endings"], ["아이템", "#/items"], ["제작 노트", "#/notes"]]],
    ];
    $("#lnav").innerHTML = groups.map(([label, icon, items]) => `<div class="lnav__item">
      <button class="lnav__btn" type="button" aria-expanded="false">${icon}${label}</button>
      <ul class="lnav__list">${items.map(([l, u, img]) => `<li><a href="${u}">${img ? `<img src="${img}" alt="">` : ""}${esc(l)}</a></li>`).join("")}</ul>
    </div>`).join("");

    $("#page-count").textContent = allEntries().length;
    $("#footer-desc").textContent = W.home.tagline || `${W.site.title} — ${W.site.author} 졸업전시 작품 위키`;
    $("#footer-explore").innerHTML = [["대문", "#/"], ["모든 문서", "#/all"], ["랜덤 문서", "#/random"]].map(([l, u]) => `<li><a href="${u}">${l}</a></li>`).join("");
    $("#footer-chars").innerHTML = W.characters.map((c) => `<li><a href="#/c/${c.id}">${esc(c.name)}</a></li>`).join("");
    $("#footer-work").innerHTML = [["메인 스토리", "#/story"], ["세계관", "#/world"], ["엔딩", "#/endings"], ["아이템", "#/items"], ["제작 노트", "#/notes"]].map(([l, u]) => `<li><a href="${u}">${l}</a></li>`).join("");
    $("#footer-copy").textContent = `${W.site.title} © ${W.site.year} ${W.site.author} · 졸업전시`;
  }

  function closeMenus() {
    $$(".lnav__item.is-open").forEach((m) => {
      m.classList.remove("is-open");
      $(".lnav__btn", m).setAttribute("aria-expanded", "false");
    });
  }

  /* ---------- router ---------- */
  function route() {
    const hash = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    const [name, arg] = hash.split("/");

    if (name === "random") {
      const pool = allEntries().filter((e) => e.url !== "#/");
      location.replace(pool[Math.floor(Math.random() * pool.length)].url);
      return;
    }

    let view, jump = null;
    if (!name) view = renderHome();
    else if (name === "c" && charById[arg]) view = renderCharacter(charById[arg]);
    else if (name === "characters") view = renderCharacters();
    else if (name === "story") { view = renderStory(); jump = arg; }
    else if (name === "world") view = renderWorld();
    else if (name === "endings") view = renderEndings();
    else if (name === "items") view = renderItems();
    else if (name === "notes") view = renderNotes();
    else if (name === "all") view = renderAll();
    else if (name === "search") view = renderSearch(arg || "");
    else view = render404();

    document.title = name ? `${view.title} | ${W.site.wikiName}` : W.site.wikiName;
    main.innerHTML = view.html;
    startSlideshow();
    page.classList.toggle("no-rail", !view.rail);
    if (view.rail) renderRail(view.current);

    closeMenus();
    closeSuggest();
    input.value = "";

    const navKey = !name ? "home" : name === "c" ? "characters" : name;
    $$(".gnav__item[data-nav]").forEach((b) => b.classList.toggle("is-active", b.dataset.nav === navKey));

    const target = jump && document.getElementById(jump);
    if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 60);
    else window.scrollTo(0, 0);
  }

  /* ---------- lightbox ---------- */
  const lb = $("#lightbox");
  function openLightbox(src, caption, tall) {
    $("#lightbox-img").src = src;
    $("#lightbox-img").alt = caption || "";
    $("#lightbox-title").textContent = caption || "";
    lb.classList.toggle("is-tall", !!tall);
    lb.hidden = false;
    $(".lightbox__close", lb).focus();
  }
  function closeLightbox() { lb.hidden = true; $("#lightbox-img").removeAttribute("src"); }

  /* ---------- search ---------- */
  const input = $("#search-input");
  const suggest = $("#search-suggest");
  let sel = -1;
  function closeSuggest() { suggest.hidden = true; sel = -1; }
  function updateSuggest() {
    const q = input.value;
    if (!q.trim()) return closeSuggest();
    const r = search(q).slice(0, 6);
    suggest.innerHTML = r.length
      ? r.map((e, i) => `<li><a href="${e.url}" role="option" aria-selected="${i === sel}">${e.img ? `<img src="${e.img}" alt="">` : ""}<span>${esc(e.title)}</span><small>${esc(e.desc)}</small></a></li>`).join("")
      : `<li class="empty">일치하는 문서가 없습니다</li>`;
    suggest.hidden = false;
  }
  input.addEventListener("input", () => { sel = -1; updateSuggest(); });
  input.addEventListener("focus", updateSuggest);
  input.addEventListener("keydown", (e) => {
    const items = $$("a", suggest);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!items.length) return;
      sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items.forEach((a, i) => a.setAttribute("aria-selected", i === sel));
    } else if (e.key === "Escape") { closeSuggest(); input.blur(); }
  });
  $("#search").addEventListener("submit", (e) => {
    e.preventDefault();
    const items = $$("a", suggest);
    if (sel >= 0 && items[sel]) location.hash = items[sel].getAttribute("href");
    else if (input.value.trim()) location.hash = `#/search/${encodeURIComponent(input.value.trim())}`;
    input.blur();
    closeSuggest();
  });

  /* ---------- events ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target;

    const menuBtn = t.closest(".lnav__btn");
    if (menuBtn) {
      const item = menuBtn.parentElement;
      const open = !item.classList.contains("is-open");
      closeMenus();
      item.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", open);
      return;
    }
    if (!t.closest(".lnav")) closeMenus();
    if (!t.closest(".search")) closeSuggest();

    const nav = t.closest("[data-nav]");
    if (nav && nav.dataset.nav === "top") return window.scrollTo({ top: 0, behavior: "smooth" });

    const tab = t.closest(".infobox__tab");
    if (tab) {
      const c = charById[location.hash.split("/")[2]];
      const view = tab.dataset.view;
      const box = tab.closest(".infobox");
      $$(".infobox__tab", box).forEach((b) => b.setAttribute("aria-selected", b === tab));
      const wrap = $(".infobox__img", box);
      wrap.dataset.view = view;
      wrap.dataset.zoom = c.images[view];
      wrap.dataset.caption = `${c.name} ${view === "ld" ? "일러스트" : "SD"}`;
      $("img", wrap).src = c.images[view];
      return;
    }

    if (t.closest("[data-close]") && (t.closest(".lightbox__close") || t.tagName !== "IMG")) return closeLightbox();
    const invTab = t.closest("[data-inv-tab]");
    if (invTab) return selectInvTab(invTab.dataset.invTab);
    const invItem = t.closest("[data-inv-item]");
    if (invItem) return selectInvItem(Number(invItem.dataset.invItem));

    const slideBtn = t.closest("[data-slide], [data-slide-to]");
    if (slideBtn) {
      if (slideBtn.dataset.slideTo != null) goSlide(Number(slideBtn.dataset.slideTo), "to");
      else goSlide(Number(slideBtn.dataset.slide));
      return startSlideshow(); // 직접 넘기면 타이머를 처음부터 다시
    }

    const zoom = t.closest("[data-zoom]");
    if (zoom) return openLightbox(zoom.dataset.zoom, zoom.dataset.caption, zoom.dataset.tall);

    const jumpLink = t.closest("[data-jump]");
    if (jumpLink) {
      e.preventDefault();
      document.getElementById(jumpLink.dataset.jump)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const tocToggle = t.closest(".toc__toggle");
    if (tocToggle) {
      const box = tocToggle.closest(".toc");
      box.classList.toggle("is-collapsed");
      tocToggle.textContent = box.classList.contains("is-collapsed") ? "[보이기]" : "[숨기기]";
      return;
    }

    const tool = t.closest("[data-tool]");
    if (tool) {
      if (tool.dataset.tool === "top") window.scrollTo({ top: 0, behavior: "smooth" });
      if (tool.dataset.tool === "wide") page.classList.toggle("is-wide");
      if (tool.dataset.tool === "toc") ($(".toc") || main).scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  // 슬라이드 손가락 넘기기 (스와이프). 넘긴 직후의 클릭은 확대 보기로 이어지지 않게 막음
  let swipeX = null, swiped = false;
  document.addEventListener("pointerdown", (e) => {
    swiped = false;
    swipeX = e.target.closest(".slideshow__stage") ? e.clientX : null;
  });
  document.addEventListener("pointerup", (e) => {
    if (swipeX == null) return;
    const dx = e.clientX - swipeX;
    swipeX = null;
    if (Math.abs(dx) > 40) { swiped = true; goSlide(dx < 0 ? 1 : -1); startSlideshow(); }
  });
  document.addEventListener("click", (e) => {
    if (swiped && e.target.closest(".slideshow__stage")) { e.stopImmediatePropagation(); swiped = false; }
  }, true);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeLightbox(); closeMenus(); }
    if ((e.key === "Enter" || e.key === " ") && e.target.matches(".infobox__img")) {
      e.preventDefault();
      openLightbox(e.target.dataset.zoom, e.target.dataset.caption);
    }
  });

  /* ---------- kiosk / idle ---------- */
  // 전시용 기능은 전시 PC에서 파일로 열었을 때(전시용 실행.bat)만 켜짐. 웹 주소로 들어오면 꺼짐.
  // 주소 끝에 ?kiosk 를 붙이면 웹에서도 강제로 켤 수 있음.
  const exhibit = location.protocol === "file:" || /[?&]kiosk/.test(location.search);

  if (W.site.kiosk && exhibit) {
    document.body.classList.add("kiosk");
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("dragstart", (e) => { if (e.target.tagName === "IMG") e.preventDefault(); });
    // 관람객이 키보드로 창을 닫거나·새 창을 열거나·화면을 확대/축소하지 못하게 (나가기는 Alt+F4)
    document.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ["w", "n", "t", "p", "s", "o", "l", "u", "+", "=", "-", "0"].includes(k)) e.preventDefault();
      if (["f5", "f11", "f12"].includes(k)) e.preventDefault();
    });
    document.addEventListener("wheel", (e) => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });
  }

  if (W.site.idleSeconds > 0 && exhibit) {
    let timer;
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const atHome = !location.hash.replace(/^#\/?/, "") && window.scrollY < 10 && lb.hidden;
        if (!atHome) {
          closeLightbox();
          const toast = document.createElement("div");
          toast.className = "toast";
          toast.textContent = "대문으로 돌아갑니다";
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 2200);
          if (location.hash.replace(/^#\/?/, "")) location.hash = "#/";
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }
        reset();
      }, W.site.idleSeconds * 1000);
    };
    ["pointerdown", "keydown", "wheel", "touchstart", "scroll"].forEach((ev) => window.addEventListener(ev, reset, { passive: true }));
    reset();
  }

  /* ---------- init ---------- */
  renderChrome();
  window.addEventListener("hashchange", route);
  route();
})();
