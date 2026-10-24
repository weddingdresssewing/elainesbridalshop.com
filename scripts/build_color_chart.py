#!/usr/bin/env python3
"""Generate color-chart.html from scripts/color-chart-data.json.
Run from anywhere:  python3 scripts/build_color_chart.py
Swatches are rendered as CSS colors sampled from the supplier's fabric photos;
no third-party images are copied or hot-linked."""
import json, re, html, os
from collections import OrderedDict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCR = os.path.join(ROOT, "scripts")
items = json.load(open(os.path.join(SCR, "color-chart-data.json"), encoding="utf-8"))
sg = open(os.path.join(ROOT, "silhouette-guide.html"), encoding="utf-8").read()

def block(src, start, end):
    i = src.index(start); j = src.index(end, i)
    return src[i:j]
NAV = block(sg, "  <!-- ===== Navigation ===== -->", "  <!-- ===== Page hero ===== -->")
FOOTER = block(sg, "  <!-- ===== Footer ===== -->", "  <!-- Page-specific translations")

FABRICS = OrderedDict([
  ("Chiffon",    dict(id="chiffon",    zh="雪纺",
     en="Light, airy and softly draped. Our widest range, and the most popular choice for flowing skirts and overlays.",
     zhd="轻盈飘逸、垂感柔和。颜色最全,最适合飘逸的裙摆与罩纱。")),
  ("Satin",      dict(id="satin",      zh="缎面",
     en="Smooth with a gentle sheen, and structured enough for clean lines and a polished finish.",
     zhd="顺滑带柔光,挺括度好,适合利落的线条与精致的质感。")),
  ("Silk Satin", dict(id="silk-satin", zh="真丝缎",
     en="A heavier, more luminous satin with a luxurious hand and a fluid drape.",
     zhd="更厚重、更有光泽的缎面,手感奢华,垂坠流畅。")),
  ("Sequin",     dict(id="sequin",     zh="亮片",
     en="All-over sequins on a mesh base, for shimmer that catches every light in the room.",
     zhd="网底满钉亮片,灯光下闪耀夺目。")),
  ("Tulle",      dict(id="tulle",      zh="网纱",
     en="Fine, sheer netting for layered skirts, overlays, veils and soft volume.",
     zhd="细腻通透的网纱,用于多层裙摆、罩纱、头纱与柔和的蓬度。")),
  ("Double FDY", dict(id="double-fdy", zh="双层 FDY",
     en="A soft, opaque double-layer weave with a matte, elegant drape that holds its shape.",
     zhd="柔软、不透光的双层面料,哑光垂坠,优雅而有型。")),
])
GROUP_ZH = {
  "Whites": "白色系", "White Color Series": "白色系", "Light Color Series": "浅色系",
  "Neutrals": "中性色", "Pinks": "粉色系", "Oranges / Burgundies": "橙色 / 酒红系",
  "Red / Orange": "红色 / 橙色系", "Purples": "紫色系", "Blues": "蓝色系",
  "Greens": "绿色系", "Yellows": "黄色系",
}
def key(s): return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

# ---- group items ----
tree = OrderedDict()
for it in items:
    tree.setdefault(it["fabric"], OrderedDict()).setdefault(it["group"], []).append(it)

def lum(h):
    r, g, b = (int(h[i:i+2], 16) / 255 for i in (1, 3, 5))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

i18n = OrderedDict()
def t(k, zh): i18n[k] = zh; return k

# ---- jump nav ----
jump = []
for f, m in FABRICS.items():
    n = sum(len(v) for v in tree[f].values())
    jump.append(f'        <a href="#{m["id"]}" class="cc-nav__link"><span data-i18n="{t("cc.f."+m["id"], m["zh"])}">{f}</span> <small>{n}</small></a>')
JUMP = "\n".join(jump)

# ---- sections ----
secs = []
for fi, (f, m) in enumerate(FABRICS.items()):
    groups = tree[f]; n = sum(len(v) for v in groups.values())
    out = [f'  <section class="cc-fabric{" cc-fabric--cream" if fi % 2 else ""}" id="{m["id"]}">',
           f'    <div class="cc-fabric__inner">',
           f'      <header class="cc-fabric__head">',
           f'        <p class="eyebrow"><span data-i18n="{t("cc.f."+m["id"], m["zh"])}">{f}</span> · {n} <span data-i18n="cc.colors">colors</span></p>',
           f'        <h2 class="section-title" data-i18n="{t("cc.fh."+m["id"], m["zh"])}">{f}</h2>',
           f'        <p class="cc-fabric__desc" data-i18n="{t("cc.fd."+m["id"], m["zhd"])}">{m["en"]}</p>',
           f'      </header>']
    for g, lst in groups.items():
        if g:
            out.append(f'      <h3 class="cc-group" data-i18n="{t("cc.g."+key(g), GROUP_ZH.get(g, g))}">{html.escape(g)}</h3>')
        out.append(f'      <div class="cc-grid">')
        for it in lst:
            light = " cc-swatch--light" if lum(it["hex"]) > 0.82 else ""
            out.append(
              f'        <button type="button" class="cc-swatch cc-swatch--{m["id"]}{light}" style="--c:{it["hex"]}" '
              f'data-name="{html.escape(it["name"])}" data-code="{html.escape(it["code"])}" data-fabric="{f}" '
              f'aria-label="{html.escape(it["name"])}, {html.escape(it["code"])}, {f}">'
              f'<span class="cc-swatch__chip" aria-hidden="true"></span>'
              f'<span class="cc-swatch__name">{html.escape(it["name"])}</span>'
              f'<span class="cc-swatch__code">{html.escape(it["code"])}</span></button>')
        out.append('      </div>')
    out += ['    </div>', '  </section>', '']
    secs.append("\n".join(out))
SECTIONS = "\n".join(secs)
i18n["cc.colors"] = "种颜色"

TOTAL = len(items)
page = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18298272582"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'AW-18298272582');
  </script>

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Custom Wedding Dress Color Chart | Elaine's Bridal Shop</title>
  <meta name="description" content="Browse {TOTAL}+ fabric colors for a custom-made wedding or bridesmaid dress: chiffon, satin, silk satin, sequin, tulle and Double FDY. Pick your color and ask Elaine's Bridal Shop in Sacramento for a quote." />

  <link rel="canonical" href="https://elainesbridalshop.com/color-chart.html" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Elaine's Bridal Shop" />
  <meta property="og:title" content="Custom Wedding Dress Color Chart | Elaine's Bridal Shop" />
  <meta property="og:description" content="{TOTAL}+ fabric colors across chiffon, satin, silk satin, sequin, tulle and Double FDY for your custom-made gown." />
  <meta property="og:url" content="https://elainesbridalshop.com/color-chart.html" />
  <meta property="og:image" content="https://elainesbridalshop.com/assets/images/og-image-bottom.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://elainesbridalshop.com/assets/images/og-image-bottom.jpg" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500&family=Noto+Serif+SC:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
  <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="stylesheet" href="css/styles.css?v=20260914b" />
  <script type="application/ld+json">
  {{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://elainesbridalshop.com/"}}, {{"@type": "ListItem", "position": 2, "name": "Wedding Dresses", "item": "https://elainesbridalshop.com/wedding-dresses.html"}}, {{"@type": "ListItem", "position": 3, "name": "Color Chart", "item": "https://elainesbridalshop.com/color-chart.html"}}]}}
  </script>
</head>
<body>

{NAV}  <!-- ===== Page hero ===== -->
  <section class="fg-hero fg-hero--short">
    <div class="fg-hero__media">
      <img src="assets/images/full/dresses-hero.jpg" alt="A satin ball gown wedding dress with lace sleeves from the collection" width="1800" height="1013" />
    </div>
    <div class="fg-hero__overlay"></div>
    <div class="fg-hero__content">
      <nav class="fg-crumbs" aria-label="Breadcrumb">
        <a href="index.html" data-i18n="wd.crumbHome">Home</a>
        <span aria-hidden="true">/</span>
        <a href="wedding-dresses.html#custom" data-i18n="wnav.custom">Custom Gowns</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page" data-i18n="cc.crumb">Color Chart</span>
      </nav>
      <p class="eyebrow eyebrow--light" data-i18n="cc.eyebrow">Custom Gown Colors</p>
      <h1 class="fg-hero__title" data-i18n="cc.title">{TOTAL} fabric colors.<br /><em>Which one is yours?</em></h1>
      <p class="fg-hero__sub" data-i18n="cc.sub">Every custom gown we make can be sewn in the color you choose. Browse by fabric below, tap a swatch to select it, and send us the name and code with your quote request.</p>
      <div class="fg-hero__actions">
        <a href="#chiffon" class="btn btn--solid" data-i18n="cc.cta1">Browse the Colors</a>
        <a href="wedding-dresses.html#contact" class="btn btn--ghost" data-i18n="nav.book">Get a Quote</a>
      </div>
    </div>
  </section>

  <!-- ===== Fabric jump links (sticky) ===== -->
  <nav class="cc-nav" aria-label="Jump to a fabric">
    <div class="cc-nav__inner">
{JUMP}
    </div>
  </nav>

  <!-- ===== Swatches ===== -->
{SECTIONS}
  <!-- ===== Selection bar (appears once a swatch is tapped) ===== -->
  <div class="cc-bar" id="ccBar" hidden>
    <span class="cc-bar__chip" id="ccBarChip" aria-hidden="true"></span>
    <span class="cc-bar__text"><span data-i18n="cc.selected">Selected:</span> <strong id="ccBarName"></strong> <span id="ccBarMeta" class="cc-bar__meta"></span></span>
    <a class="btn btn--solid cc-bar__btn" id="ccBarBtn" href="wedding-dresses.html#contact" data-i18n="cc.ask">Ask About This Color</a>
    <button type="button" class="cc-bar__close" id="ccBarClose" aria-label="Clear selection">&times;</button>
  </div>

  <!-- ===== CTA ===== -->
  <section class="fg-cta">
    <h2 class="fg-cta__title" data-i18n="cc.ctaTitle">Found your color?<br /><em>Send us the name and code.</em></h2>
    <p class="fg-cta__sub" data-i18n="cc.ctaSub">Tell us the fabric, the color name and its code, along with a photo of the dress you love. Our custom-gown consultation is free, and you see a preview video before anything is sewn.</p>
    <div class="fg-cta__actions">
      <a href="wedding-dresses.html#contact" class="btn btn--solid" data-i18n="nav.book">Get a Quote</a>
      <a href="wedding-dresses.html#custom" class="btn btn--ghost" data-i18n="cc.ctaBtn2">How Custom Gowns Work</a>
    </div>
  </section>

{FOOTER}  <!-- Page-specific translations, merged into the shared dictionary by i18n.js -->
  <script>
  window.PAGE_I18N = {{
    zh: {{
      "wnav.alt": "改衣服务",
      "wnav.collection": "婚纱系列",
      "wnav.custom": "定制婚纱",
      "wnav.videos": "效果预览",
      "wnav.faq": "常见问题",
      "nav.book": "获取估价",
      "wd.crumbHome": "首页",
      "cc.crumb": "颜色表",
      "cc.eyebrow": "定制婚纱颜色",
      "cc.title": "{TOTAL} 种面料颜色,<br /><em>哪一种属于您?</em>",
      "cc.sub": "我们定制的每一件礼服都可以按您选的颜色制作。先按面料浏览,点一下色块选中它,然后把颜色名称和色号连同询价一起发给我们。",
      "cc.cta1": "浏览颜色",
      "cc.selected": "已选择:",
      "cc.ask": "咨询这个颜色",
      "cc.ctaTitle": "找到您的颜色了?<br /><em>把名称和色号发给我们。</em>",
      "cc.ctaSub": "告诉我们面料、颜色名称和色号,再附上您喜欢的礼服照片。定制婚纱首次咨询免费,一针未缝之前先看效果预览视频。",
      "cc.ctaBtn2": "了解定制流程",
{chr(10).join(f'      "{k}": "{v}",' for k, v in i18n.items())}
      "footer.tag": "「您的梦想婚纱在这里等您」· 加州萨克拉门托家庭工作室",
      "footer.rights": "版权所有。"
    }},
    meta: {{
      en: {{
        title: "Custom Wedding Dress Color Chart | Elaine's Bridal Shop",
        desc: "Browse {TOTAL}+ fabric colors for a custom-made wedding or bridesmaid dress: chiffon, satin, silk satin, sequin, tulle and Double FDY. Pick your color and ask Elaine's Bridal Shop in Sacramento for a quote."
      }},
      zh: {{
        title: "定制婚纱颜色表:{TOTAL} 种面料颜色 | Elaine's Bridal Shop",
        desc: "浏览 {TOTAL} 多种定制婚纱与伴娘裙面料颜色:雪纺、缎面、真丝缎、亮片、网纱与双层 FDY。选好颜色,向加州萨克拉门托的 Elaine's Bridal Shop 询价。"
      }}
    }}
  }};
  </script>
  <script src="js/main.js?v=20260914c"></script>
  <script src="js/i18n.js?v=20260914a"></script>
  <script>
  /* Swatch selection: highlight the tapped color and offer a one-tap path to
     the quote form, carrying the fabric + name + code in the URL so the form
     can pre-fill the message. */
  (function () {{
    var bar = document.getElementById("ccBar"), chip = document.getElementById("ccBarChip"),
        nameEl = document.getElementById("ccBarName"), metaEl = document.getElementById("ccBarMeta"),
        btn = document.getElementById("ccBarBtn"), current = null;
    function zh() {{ return document.documentElement.lang === "zh-CN"; }}
    function select(sw) {{
      if (current) current.classList.remove("is-selected");
      current = sw; sw.classList.add("is-selected");
      var name = sw.getAttribute("data-name"), code = sw.getAttribute("data-code"), fabric = sw.getAttribute("data-fabric");
      chip.style.background = getComputedStyle(sw).getPropertyValue("--c");
      nameEl.textContent = name;
      metaEl.textContent = "· " + fabric + " · " + code;
      btn.href = "wedding-dresses.html?color=" + encodeURIComponent(name + " (" + code + "), " + fabric) + "#contact";
      bar.hidden = false;
      document.body.classList.add("cc-bar-open");
    }}
    document.addEventListener("click", function (e) {{
      var sw = e.target.closest(".cc-swatch");
      if (sw) select(sw);
    }});
    document.getElementById("ccBarClose").addEventListener("click", function () {{
      if (current) current.classList.remove("is-selected");
      current = null; bar.hidden = true; document.body.classList.remove("cc-bar-open");
    }});
    // Sticky fabric nav: mark the section in view
    var links = Array.prototype.slice.call(document.querySelectorAll(".cc-nav__link"));
    var secs = links.map(function (a) {{ return document.querySelector(a.getAttribute("href")); }});
    var nav = document.getElementById("nav");
    function mark() {{
      // the fixed site nav shrinks once scrolled; keep the fabric bar glued to it
      if (nav) document.documentElement.style.setProperty("--navh", nav.offsetHeight + "px");
      var y = window.scrollY + 160, idx = -1;
      secs.forEach(function (s, i) {{ if (s && s.offsetTop <= y) idx = i; }});
      links.forEach(function (a, i) {{ a.classList.toggle("is-active", i === idx); }});
    }}
    window.addEventListener("scroll", mark, {{ passive: true }}); mark();
    window.addEventListener("resize", mark);
    window.addEventListener("load", mark);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(mark);
    window.addEventListener("transitionend", function (e) {{ if (e.target === nav) mark(); }});
  }})();
  </script>
</body>
</html>
'''
open(os.path.join(ROOT, "color-chart.html"), "w", encoding="utf-8").write(page)
print("wrote color-chart.html", len(page), "bytes;", TOTAL, "swatches;", len(i18n), "generated i18n keys")
