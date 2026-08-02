#!/usr/bin/env python3
"""Generate static /zh/ mirror pages from the EN pages + i18n dictionaries.

Also (idempotently) patches EN pages with hreflang links, breadcrumb/date
schema on guides, and width/height attributes on local <img> tags.

Run from repo root:  python3 scripts/build_zh.py
"""
import json
import os
import re
import subprocess

from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://elainesbridalshop.com"

PAGES = {
    "index.html": {"zh_url": "/zh/", "en_url": "/", "crumb": None},
    "silhouette-guide.html": {"zh_url": "/zh/silhouette-guide.html", "en_url": "/silhouette-guide.html",
                              "crumb": ("Silhouette Guide", "裙型指南"), "published": "2026-07-31"},
    "measurement-guide.html": {"zh_url": "/zh/measurement-guide.html", "en_url": "/measurement-guide.html",
                               "crumb": ("Measurement Guide", "量体指南"), "published": "2026-07-31"},
    "custom-wedding-dresses.html": {"zh_url": "/zh/custom-wedding-dresses.html", "en_url": "/custom-wedding-dresses.html",
                                    "crumb": ("Custom Wedding Dresses", "定制婚纱"), "published": "2026-08-01"},
}
TODAY = "2026-08-01"

PAGE_LINK = {  # how internal page links map inside /zh/ pages
    "index.html": "/zh/",
    "silhouette-guide.html": "/zh/silhouette-guide.html",
    "measurement-guide.html": "/zh/measurement-guide.html",
    "custom-wedding-dresses.html": "/zh/custom-wedding-dresses.html",
}


def node_eval(js_object_literal):
    out = subprocess.run(
        ["node", "-e", "const o = " + js_object_literal + "; console.log(JSON.stringify(o));"],
        capture_output=True, text=True)
    if out.returncode != 0:
        raise RuntimeError(out.stderr[:400])
    return json.loads(out.stdout)


def shared_dicts():
    s = open(os.path.join(ROOT, "js/i18n.js")).read()
    zh = node_eval(s[s.index("var ZH = {") + 9: s.index("\n  };") + 4])
    ph_start = s.index("var ZH_PH = {")
    zh_ph = node_eval(s[ph_start + 12: s.index("};", ph_start) + 1])
    meta_start = s.index("var META = PAGE.meta || {")
    meta = node_eval(s[meta_start + 24: s.index("\n  };", meta_start) + 4])
    return zh, zh_ph, meta


def page_i18n(html):
    m = re.search(r"window\.PAGE_I18N\s*=\s*(\{.*?\});\s*</script>", html, re.DOTALL)
    return node_eval(m.group(1)) if m else {}


def img_dims(path):
    out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", path],
                         capture_output=True, text=True).stdout
    w = re.search(r"pixelWidth: (\d+)", out)
    h = re.search(r"pixelHeight: (\d+)", out)
    return (w.group(1), h.group(1)) if w and h else (None, None)


def patch_en(fname, cfg):
    """hreflang + breadcrumbs/dates + img width/height on the EN page (idempotent)."""
    p = os.path.join(ROOT, fname)
    s = open(p).read()

    # hreflang triplet after canonical
    if 'hreflang="zh"' not in s:
        can = f'<link rel="canonical" href="{SITE}{cfg["en_url"]}" />'
        assert can in s, (fname, "canonical")
        s = s.replace(can, can + f'''
  <link rel="alternate" hreflang="en" href="{SITE}{cfg["en_url"]}" />
  <link rel="alternate" hreflang="zh" href="{SITE}{cfg["zh_url"]}" />
  <link rel="alternate" hreflang="x-default" href="{SITE}{cfg["en_url"]}" />''')

    # dates on Article schema (guides)
    if '"@type": "Article"' in s and '"datePublished"' not in s:
        s = s.replace('"author": {', f'"datePublished": "{cfg["published"]}",\n    "dateModified": "{TODAY}",\n    "author": {{', 1)

    # breadcrumbs on subpages
    if cfg["crumb"] and "BreadcrumbList" not in s:
        bc = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": cfg["crumb"][0], "item": SITE + cfg["en_url"]}]}
        s = s.replace("</head>", "  <script type=\"application/ld+json\">\n  " +
                      json.dumps(bc, ensure_ascii=False) + "\n  </script>\n</head>")

    # width/height on local images missing them
    def add_dims(m):
        tag = m.group(0)
        if "width=" in tag:
            return tag
        srcm = re.search(r'src="([^"]+)"', tag)
        if not srcm:
            return tag
        src = srcm.group(1)
        if src.startswith("http") or "images/collection/" in src or not os.path.isfile(os.path.join(ROOT, src)):
            return tag
        w, h = img_dims(os.path.join(ROOT, src))
        if not w:
            return tag
        return tag[:-2].rstrip() + f' width="{w}" height="{h}" />'
    s = re.sub(r"<img [^>]*/>", add_dims, s)

    open(p, "w").write(s)
    return s


def localize(html, fname, cfg, zh, zh_ph, meta_default):
    page = page_i18n(html)
    d = dict(zh)
    d.update(page.get("zh", {}))
    ph = dict(zh_ph)
    ph.update(page.get("ph", {}))
    meta = page.get("meta", meta_default)

    soup = BeautifulSoup(html, "html.parser")
    soup.html["lang"] = "zh"
    soup.html["class"] = "lang-zh"

    for el in soup.select("[data-i18n]"):
        key = el["data-i18n"]
        if key in d:
            el.clear()
            el.append(BeautifulSoup(d[key], "html.parser"))
    for el in soup.select("[data-i18n-ph]"):
        key = el["data-i18n-ph"]
        if key in ph:
            el["placeholder"] = ph[key]

    # head: title/meta/canonical/og
    soup.title.string = meta["zh"]["title"]
    for sel, attr, val in [
        ('meta[name="description"]', "content", meta["zh"]["desc"]),
        ('meta[property="og:title"]', "content", meta["zh"]["title"]),
        ('meta[property="og:description"]', "content", meta["zh"]["desc"]),
        ('meta[property="og:url"]', "content", SITE + cfg["zh_url"]),
    ]:
        tag = soup.select_one(sel)
        if tag:
            tag[attr] = val
    can = soup.select_one('link[rel="canonical"]')
    can["href"] = SITE + cfg["zh_url"]
    # hreflang: swap x-default stays EN; links already in EN source ✓ (kept as-is)

    # drop i18n.js + swap lang toggle for a plain link to the EN page
    for sc in soup.find_all("script", src=True):
        if "i18n.js" in sc["src"]:
            sc.decompose()
    btn = soup.select_one("#langToggle")
    if btn:
        a = soup.new_tag("a", href=cfg["en_url"], **{"class": "nav__lang"})
        a.string = "EN"
        btn.replace_with(a)

    # schema: drop Article/FAQPage on zh, rewrite urls + breadcrumb names on the rest
    for sc in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(sc.string)
        except Exception:
            continue
        t = data.get("@type")
        if t in ("Article", "FAQPage"):
            sc.decompose()
            continue
        txt = json.dumps(data, ensure_ascii=False)
        txt = txt.replace(SITE + cfg["en_url"], SITE + cfg["zh_url"])
        if t == "BreadcrumbList" and cfg["crumb"]:
            txt = txt.replace(f'"name": "{cfg["crumb"][0]}"', f'"name": "{cfg["crumb"][1]}"')
            txt = txt.replace('"name": "Home"', '"name": "首页"')
        sc.string = txt

    # rewrite internal paths
    for el in soup.find_all(href=True):
        el["href"] = map_link(el["href"])
    for el in soup.find_all(src=True):
        el["src"] = map_link(el["src"])

    return str(soup)


def map_link(u):
    if re.match(r"^(https?:|mailto:|tel:|sms:|#|/)", u):
        return u
    for page, zh_target in PAGE_LINK.items():
        if u == page:
            return zh_target
        if u.startswith(page + "#"):
            return zh_target + "#" + u.split("#", 1)[1]
    return "/" + u  # assets, css, js, favicons


def main():
    zh, zh_ph, meta_default = shared_dicts()
    os.makedirs(os.path.join(ROOT, "zh"), exist_ok=True)
    for fname, cfg in PAGES.items():
        html = patch_en(fname, cfg)
        out = localize(html, fname, cfg, zh, zh_ph, meta_default)
        dest = os.path.join(ROOT, "zh", fname)
        open(dest, "w").write(out)
        print(f"{fname} -> zh/{fname} ({len(out)//1024}KB)")


if __name__ == "__main__":
    main()
