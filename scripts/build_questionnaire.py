#!/usr/bin/env python3
"""Generate custom-gown-questionnaire.html.

The questionnaire has no backend: when the bride taps the button, her answers
are compiled into one text message addressed to Chloe and Elaine (same
two-recipient SMS helper the contact form uses, window.ebsSmsHref from
js/main.js) and her Messages app opens so she can attach inspiration photos.

Run from anywhere:  python3 scripts/build_questionnaire.py
"""
import html
import os
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sg = open(os.path.join(ROOT, "silhouette-guide.html"), encoding="utf-8").read()


def block(src, start, end):
    i = src.index(start); j = src.index(end, i)
    return src[i:j]


NAV = block(sg, "  <!-- ===== Navigation ===== -->", "  <!-- ===== Page hero ===== -->")
FOOTER = block(sg, "  <!-- ===== Footer ===== -->", "  <!-- Page-specific translations")


# ---------------------------------------------------------------------------
# Question data. Every string is (en, zh). type: text | textarea | chips.
# chips: options list; "other" adds an Other chip with a text box; single=True
# makes the group single-choice. short = label used in the text message.
# ---------------------------------------------------------------------------
NS = ("Not sure", "还没想好")
OTHER = ("Other", "其他")
REC = ("I'd like your recommendation", "希望听听你们的建议")

SECTIONS = [
  {
    "id": "shape", "title": ("Your inspiration and dress shape", "您的灵感与裙型"),
    "qs": [
      dict(n=1, type="note", short=("Inspiration", "灵感参考"),
           q=("Please send photos or links showing your ideal dress.", "请提供能体现您理想婚纱的照片或链接。")),
      dict(n=2, type="note", short=("Reference link", "参考链接"),
           q=("Please include a link to the reference wedding dress.", "请附上参考婚纱的链接。")),
      dict(n=3, type="chips", short=("Change", "想改的地方"), other=True,
           q=("Are there any details you would like changed?", "有没有想改动的细节?"),
           opts=[("Nothing, I love it as is", "没有,就要这样"), ("Less revealing", "少露一些"), ("More revealing", "多露一些"),
                 ("Less sparkle", "少一些闪饰"), ("More sparkle", "多一些闪饰"), ("A different neckline", "换个领口"),
                 ("Different sleeves or straps", "换袖子或肩带"), ("A different skirt shape", "换个裙型"), ("A shorter train", "拖尾短一些")]),
      dict(n=4, type="chips", short=("Skirt shape", "裙型"), other=True,
           q=("Which skirt shape do you prefer?", "您偏好哪种裙型?"),
           opts=[("A line", "A 字裙"), ("Ball gown", "蓬蓬裙"), ("Fitted or sheath", "贴身直裁"),
                 ("Mermaid or fit and flare", "鱼尾或小鱼尾"), NS]),
      dict(n=5, type="chips", short=("Skirt feel", "裙摆质感"), other=True,
           q=("How would you like the skirt to feel?", "您希望裙摆是什么感觉?"),
           opts=[("Soft and flowy", "柔软飘逸"), ("Full and voluminous", "蓬松饱满"), ("Structured", "挺括有型")]),
      dict(n=6, type="chips", short=("Waistline", "腰线"), other=True,
           q=("What waistline would you like?", "您想要哪种腰线?"),
           opts=[("Natural waist", "自然腰线"), ("Basque waist, dipping into a V at the front", "前中呈 V 形的巴斯克腰"),
                 ("Dropped waist", "低腰"), NS]),
    ],
  },
  {
    "id": "bodice", "title": ("Neckline, bodice and back", "领口、上身与背部"),
    "qs": [
      dict(n=7, type="chips", short=("Neckline", "领口"), other=True,
           q=("What neckline would you like?", "您想要什么领口?"),
           opts=[("Sweetheart", "心形领"), ("Straight across", "一字平领"), ("V-neck", "V 领"), ("Plunging V", "深 V"),
                 ("Scoop", "U 形领"), ("Square", "方领"), ("Off the shoulder", "一字露肩"), ("Halter", "挂脖"),
                 ("High neck", "高领"), ("Illusion (sheer panel)", "透纱领"), NS]),
      dict(n=8, type="chips", short=("Neckline coverage", "领口深浅"), single=True,
           q=("How deep should the neckline be, compared with your reference photos?", "和参考图相比,领口要开多深?"),
           opts=[("More coverage than the reference", "比参考图遮得更多"), ("About the same", "差不多"),
                 ("Less coverage than the reference", "比参考图露得更多"), NS]),
      dict(n=9, type="chips", short=("Straps / sleeves", "肩带 / 袖子"), other=True,
           q=("What straps or sleeves would you like?", "您想要什么样的肩带或袖子?"),
           opts=[("Strapless", "无肩带"), ("Spaghetti straps", "细肩带"), ("Wide straps", "宽肩带"), ("Cap sleeves", "盖袖"),
                 ("Short sleeves", "短袖"), ("Three-quarter sleeves", "七分袖"), ("Long sleeves", "长袖"),
                 ("Off-the-shoulder sleeves", "露肩袖"), ("Detachable sleeves", "可拆卸袖子"), NS]),
      dict(n=10, type="chips", short=("Back", "背部"), other=True,
           q=("What back design would you like?", "您想要什么样的背部设计?"),
           opts=[("Open back", "露背"), ("Low back", "低背"), ("Illusion lace back", "透纱蕾丝背"), ("Keyhole", "钥匙孔镂空"),
                 ("Covered back", "全遮背"), ("Buttons down the back", "一排背扣"), ("Zipper", "拉链"),
                 ("Corset lace-up", "系带束身"), NS]),
      dict(n=11, type="chips", short=("Sheer areas", "透视部位"), other=True,
           q=("Would you like any sheer or transparent areas?", "您想要透视或半透明的部位吗?"),
           opts=[("No, I prefer full coverage", "不要,我喜欢完全遮盖"), ("Center front neckline", "前中领口"),
                 ("Sides beneath the arms", "腋下两侧"), ("Back", "背部"), ("Sleeves", "袖子"), NS]),
      dict(n=12, type="chips", short=("Sheer effect", "透视效果"), single=True,
           q=("For any sheer areas, what effect would you prefer?", "透视部位您希望是什么效果?"),
           opts=[("Clearly transparent", "明显透明"), ("Sheer with lace or embellishment for partial coverage", "透纱加蕾丝或装饰,半遮盖"), NS]),
      dict(n=13, type="chips", short=("Support / lining", "支撑 / 内衬"), other=True,
           q=("Any support, lining or coverage preferences?", "在支撑、内衬或遮盖方面有偏好吗?"),
           opts=[("Built-in cups", "内置胸垫"), ("Structured, boned bodice", "有骨架的束身上身"), ("Fully lined, nothing sheer", "全内衬,不透"),
                 ("Coverage for a regular bra", "能遮住普通内衣"), ("Coverage for a strapless bra", "能遮住无肩带内衣"),
                 ("Nothing special", "没有特别要求")]),
    ],
  },
  {
    "id": "fabric", "title": ("Fabric, color and embellishments", "面料、颜色与装饰"),
    "qs": [
      dict(n=14, type="chips", short=("Color", "颜色"), single=True,
           q=("Which color would you like for your wedding dress?", "您希望婚纱是什么颜色?"),
           hint=("Our custom gowns are made in these five colors.", "我们的定制婚纱提供以下五种颜色。"),
           opts=[("White", "纯白"), ("Off White", "米白"), ("Ivory", "象牙白"), ("Nude", "裸色"), ("Black", "黑色"), NS]),
      dict(n=15, type="chips", short=("Fabrics I like", "喜欢的面料"), other=True,
           q=("Which fabrics or textures do you like?", "您喜欢哪些面料或质感?"),
           opts=[("Lace", "蕾丝"), ("Tulle", "网纱"), ("Satin", "缎面"), ("Chiffon", "雪纺"), ("Crepe (smooth and matte)", "绉纱(光滑哑光)"),
                 ("Organza", "欧根纱"), ("Mikado (structured)", "米卡多(挺括)"), ("Sequin", "亮片"), NS]),
      dict(n=16, type="chips", short=("Fabrics to avoid", "不想要的面料"), other=True,
           q=("Any fabrics or textures you would rather avoid?", "有没有不想要的面料或质感?"),
           opts=[("None", "没有"), ("Lace", "蕾丝"), ("Tulle", "网纱"), ("Satin", "缎面"), ("Chiffon", "雪纺"),
                 ("Crepe", "绉纱"), ("Organza", "欧根纱"), ("Mikado", "米卡多"), ("Sequin", "亮片")]),
      dict(n=17, type="chips", short=("Embellishments", "装饰"), other=True,
           q=("What embellishments do you like?", "您喜欢哪些装饰?"),
           opts=[("Beading", "珠绣"), ("Sequins or sparkle", "亮片或闪饰"), ("Pearls", "珍珠"),
                 ("Lace appliqués", "蕾丝贴花"), ("Minimal or no embellishment", "极简或不要装饰")]),
      dict(n=18, type="chips", short=("Amount", "装饰多少"), single=True,
           q=("How much embellishment would you like?", "您希望装饰的多少?"),
           opts=[("Light and subtle", "轻盈、低调"), ("Moderate", "适中"), ("Detailed and heavily embellished", "精细、华丽繁复"), REC]),
      dict(n=19, type="chips", short=("Placement", "装饰位置"),
           q=("Where would you like the embellishments?", "您希望装饰在哪些位置?"),
           opts=[("Straps and neckline", "肩带与领口"), ("Bodice", "上身"), ("Waist", "腰部"), ("Back", "背部"),
                 ("Skirt", "裙身"), ("Train", "拖尾"), REC],
           note=("<strong>Our recommendation:</strong> we generally suggest some beading on the bodice, kept subtle so the overall look stays elegant. A little beading at the waist, with none on the skirt, creates a beautiful balance and is also the more cost-effective option. Additional beading and detailed embellishments increase the price.",
                 "<strong>我们的建议:</strong>一般建议上身做一些珠绣,保持低调,整体才显优雅。腰部少量珠绣、裙身不做,比例最美,也更经济。额外的珠绣和繁复装饰会增加价格。")),
    ],
  },
  {
    "id": "finish", "title": ("Skirt, train and finishing details", "裙摆、拖尾与收尾细节"),
    "qs": [
      dict(n=20, type="chips", short=("Train length", "拖尾长度"), single=True,
           q=("How long would you like the train?", "您希望拖尾多长?"),
           opts=[("No train", "不要拖尾"), ("Sweep, just brushing the floor", "扫地长度,刚触地"), ("Court, about 1 foot", "宫廷长度,约 1 英尺"),
                 ("Chapel, 3 to 4 feet", "教堂长度,3 到 4 英尺"), ("Cathedral, 6 feet or more", "大教堂长度,6 英尺以上"), NS]),
      dict(n=21, type="chips", short=("Extras", "附加功能"), other=True,
           q=("Would you like any additional features?", "需要其他附加设计吗?"),
           opts=[("Skirt slit", "开衩"), ("Pockets", "口袋"), ("Detachable sleeves", "可拆卸袖子"),
                 ("Detachable overskirt or train", "可拆卸罩裙或拖尾"), ("Bustle to lift the train for the reception", "宴会时可收起拖尾的裙撑扣")]),
      dict(n=22, type="textarea", short=("Anything else", "其他补充"),
           q=("Is there anything else you'd like us to know?", "还有什么想让我们知道的吗?")),
    ],
  },
]

i18n = {}          # key -> zh
def t(key, zh):
    i18n[key] = zh
    return key

def esc(s): return html.escape(s, quote=True)

# ---------------------------------------------------------------------------
# Build the form body
# ---------------------------------------------------------------------------
parts = []
meta_js = []   # per question: {n, type, short:{en,zh}, opts:[{en,zh}], other, single}

for sec in SECTIONS:
    parts.append(f'      <section class="qn-section" id="{sec["id"]}">')
    parts.append(f'        <h2 class="qn-section__title" data-i18n="{t("qn.sec."+sec["id"], sec["title"][1])}">{esc(sec["title"][0])}</h2>')
    for q in sec["qs"]:
        n = q["n"]; qid = f"q{n}"
        parts.append(f'        <div class="qn-q" data-q="{n}">')
        tag, attr = ("p", "") if q["type"] == "note" else ("label", f' for="{qid}"')
        parts.append(f'          <{tag} class="qn-q__label"{attr}><span class="qn-q__num">{n}</span><span data-i18n="{t(f"qn.q{n}", q["q"][1])}">{esc(q["q"][0])}</span></{tag}>')
        if q.get("hint"):
            parts.append(f'          <p class="qn-q__hint" data-i18n="{t(f"qn.h{n}", q["hint"][1])}">{esc(q["hint"][0])}</p>')
        m = {"n": n, "type": q["type"], "short": {"en": q["short"][0], "zh": q["short"][1]}}
        if q["type"] == "chips":
            opts = list(q["opts"])
            single = q.get("single", False)
            m["single"] = single
            m["opts"] = [{"en": o[0], "zh": o[1]} for o in opts]
            m["other"] = bool(q.get("other"))
            role = "radiogroup" if single else "group"
            parts.append(f'          <div class="chips qn-chips" id="{qid}" role="{role}" data-single="{str(single).lower()}">')
            for i, (en, zh) in enumerate(opts):
                parts.append(f'            <button type="button" class="chip" data-val="{i}" aria-pressed="false" data-i18n="{t(f"qn.q{n}o{i}", zh)}">{esc(en)}</button>')
            if q.get("other"):
                parts.append(f'            <button type="button" class="chip chip--other" data-val="other" aria-pressed="false" data-i18n="{t("qn.other", OTHER[1])}">{OTHER[0]}</button>')
            parts.append('          </div>')
            if q.get("other"):
                parts.append(f'          <input type="text" class="qn-other" id="{qid}_other" placeholder="Please describe" data-i18n-ph="{t("qn.otherPh", "请描述")}" hidden />')
        elif q["type"] == "textarea":
            parts.append(f'          <textarea id="{qid}" rows="3"></textarea>')
        elif q["type"] == "text":
            parts.append(f'          <input type="text" id="{qid}" />')
        if q.get("note"):
            parts.append(f'          <p class="qn-q__note" data-i18n="{t(f"qn.n{n}", q["note"][1])}">{q["note"][0]}</p>')
        parts.append('        </div>')
        if q["type"] != "note": meta_js.append(m)
    parts.append('      </section>')
FORM_BODY = "\n".join(parts)
META_JSON = json.dumps(meta_js, ensure_ascii=False)

I18N_LINES = "\n".join(f'      {json.dumps(k, ensure_ascii=False)}: {json.dumps(v, ensure_ascii=False)},' for k, v in i18n.items())

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
  <title>Custom Wedding Gown Questionnaire | Elaine's Bridal Shop</title>
  <meta name="description" content="Tell us about your dream wedding dress: silhouette, neckline, fabric, color and embellishments. Your answers go straight to Chloe and Elaine by text, and we send back design images and a quote." />

  <link rel="canonical" href="https://elainesbridalshop.com/custom-gown-questionnaire.html" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Elaine's Bridal Shop" />
  <meta property="og:title" content="Custom Wedding Gown Questionnaire | Elaine's Bridal Shop" />
  <meta property="og:description" content="Tell us about your dream wedding dress and we will send back design images and a quote." />
  <meta property="og:url" content="https://elainesbridalshop.com/custom-gown-questionnaire.html" />
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
  <link rel="stylesheet" href="css/styles.css?v=20260914f" />
  <script type="application/ld+json">
  {{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://elainesbridalshop.com/"}}, {{"@type": "ListItem", "position": 2, "name": "Wedding Dresses", "item": "https://elainesbridalshop.com/wedding-dresses.html"}}, {{"@type": "ListItem", "position": 3, "name": "Custom Gown Questionnaire", "item": "https://elainesbridalshop.com/custom-gown-questionnaire.html"}}]}}
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
        <span aria-current="page" data-i18n="qn.crumb">Questionnaire</span>
      </nav>
      <p class="eyebrow eyebrow--light" data-i18n="qn.eyebrow">Custom Wedding Gown</p>
      <h1 class="fg-hero__title" data-i18n="qn.title">Tell us about<br /><em>your dream dress.</em></h1>
      <p class="fg-hero__sub" data-i18n="qn.sub">Answer what you can below and share your inspiration photos. "Not sure" is a perfectly good answer; we can help you explore the options. When you are done, your answers go to Chloe and Elaine in one text.</p>
    </div>
  </section>

  <!-- ===== Questionnaire ===== -->
  <section class="qn">
    <form class="qn__form" id="gownForm" novalidate>
      <section class="qn-section" id="about">
        <h2 class="qn-section__title" data-i18n="qn.sec.about">About you</h2>
        <div class="field-row">
          <div class="field">
            <label for="qName" data-i18n="lbl.name">Name</label>
            <input type="text" id="qName" required placeholder="Your name" data-i18n-ph="ph.name" autocomplete="name" />
          </div>
          <div class="field">
            <label for="qDate" data-i18n="qn.date">Wedding date</label>
            <input type="date" id="qDate" required />
          </div>
        </div>
      </section>

{FORM_BODY}

      <section class="qn-section qn-section--next">
        <h2 class="qn-section__title" data-i18n="qn.nextTitle">What happens next</h2>
        <p class="qn-next" data-i18n="qn.nextP">We will generate images of your wedding dress based on your preferences. If you are happy with the proposed design and quote, we will schedule a free consultation to take your measurements. We look forward to helping you create your wedding gown!</p>
        <button type="submit" class="btn btn--solid btn--full" data-i18n="qn.submit">Text My Answers to Chloe &amp; Elaine</button>
        <p class="contact__hint" data-i18n="qn.hint">Tap the button to open your Messages app with your answers filled in, addressed to Chloe &amp; Elaine. Attach your inspiration photos and hit send.</p>
        <p class="contact__success" id="qnSuccess" hidden role="status" data-i18n="qn.success">Your Messages app should now be open with your answers filled in. Attach your inspiration photos and tap send. If nothing opened, use the copy button below and text us at Chloe <a href="sms:+14157341832">(415) 734-1832</a> or Elaine <a href="sms:+14158139302">(415) 813-9302</a>.</p>
        <p class="qn-copy"><button type="button" class="qn-copy__btn" id="qnCopy" data-i18n="qn.copy">On a computer? Copy my answers instead</button><span class="qn-copy__done" id="qnCopied" hidden data-i18n="qn.copied">Copied. Paste them into a text or email (<a href="mailto:weddingdresssewing@gmail.com">weddingdresssewing@gmail.com</a>) to us.</span></p>
      </section>
    </form>
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
      "qn.crumb": "定制问卷",
      "qn.eyebrow": "定制婚纱",
      "qn.title": "说说您的<br /><em>梦想婚纱。</em>",
      "qn.sub": "能答多少答多少,并分享您的灵感照片。写「还没想好」完全没问题,我们可以帮您一起探索。填完后,您的答案会通过一条短信发给 Chloe 和 Elaine。",
      "qn.sec.about": "关于您",
      "lbl.name": "姓名",
      "qn.date": "婚礼日期",
      "qn.nextTitle": "接下来会怎样",
      "qn.nextP": "我们会根据您的偏好生成婚纱效果图。如果您满意设计方案和报价,我们再预约免费咨询,为您量体。期待为您打造专属婚纱!",
      "qn.submit": "短信发送给 Chloe 和 Elaine",
      "qn.hint": "点击按钮会打开您的短信 App,答案已自动填好,收件人是 Chloe 和 Elaine。附上灵感照片后发送即可。",
      "qn.success": "您的短信 App 应该已经打开,答案已填好。附上灵感照片后点发送即可。如果没有打开,请用下方的复制按钮,然后短信联系 Chloe <a href='sms:+14157341832'>(415) 734-1832</a> 或 Elaine <a href='sms:+14158139302'>(415) 813-9302</a>。",
      "qn.copy": "在电脑上?改为复制我的答案",
      "qn.copied": "已复制。粘贴到短信或邮件(<a href='mailto:weddingdresssewing@gmail.com'>weddingdresssewing@gmail.com</a>)发给我们即可。",
{I18N_LINES}
      "footer.tag": "「您的梦想婚纱在这里等您」· 加州萨克拉门托家庭工作室",
      "footer.rights": "版权所有。"
    }},
    ph: {{
      "ph.name": "您的姓名",
      "qn.otherPh": "请描述"
    }},
    meta: {{
      en: {{
        title: "Custom Wedding Gown Questionnaire | Elaine's Bridal Shop",
        desc: "Tell us about your dream wedding dress: silhouette, neckline, fabric, color and embellishments. Your answers go straight to Chloe and Elaine by text, and we send back design images and a quote."
      }},
      zh: {{
        title: "定制婚纱问卷 | Elaine's Bridal Shop",
        desc: "告诉我们您的梦想婚纱:裙型、领口、面料、颜色与装饰。答案直接短信发给 Chloe 和 Elaine,我们回复效果图和报价。"
      }}
    }}
  }};
  </script>
  <script src="js/main.js?v=20260914e"></script>
  <script src="js/i18n.js?v=20260914a"></script>
  <script>
  (function () {{
    var META = {META_JSON};
    var form = document.getElementById("gownForm");
    var KEY = "ebs-gown-questionnaire";
    function zh() {{ return document.documentElement.lang === "zh-CN"; }}
    function el(id) {{ return document.getElementById(id); }}
    function val(id) {{ var e = el(id); return e ? e.value.trim() : ""; }}

    /* ---- chips: multi or single select, Other reveals a text box ---- */
    form.addEventListener("click", function (e) {{
      var chip = e.target.closest(".chip");
      if (!chip) return;
      var group = chip.parentNode;
      var on = chip.getAttribute("aria-pressed") === "true";
      if (group.getAttribute("data-single") === "true") {{
        Array.prototype.forEach.call(group.querySelectorAll(".chip"), function (c) {{ c.setAttribute("aria-pressed", "false"); }});
        chip.setAttribute("aria-pressed", on ? "false" : "true");
      }} else {{
        chip.setAttribute("aria-pressed", on ? "false" : "true");
      }}
      var other = el(group.id + "_other");
      if (other && chip.classList.contains("chip--other")) {{
        other.hidden = chip.getAttribute("aria-pressed") !== "true";
        if (!other.hidden) other.focus();
      }}
      save();
    }});

    /* ---- draft autosave (per browser) so a half-finished form survives ---- */
    function snapshot() {{
      var d = {{ f: {{}}, c: {{}} }};
      Array.prototype.forEach.call(form.querySelectorAll("input[id], textarea[id]"), function (i) {{ if (i.value) d.f[i.id] = i.value; }});
      Array.prototype.forEach.call(form.querySelectorAll(".chip[aria-pressed='true']"), function (c) {{
        var g = c.parentNode.id; (d.c[g] = d.c[g] || []).push(c.getAttribute("data-val"));
      }});
      return d;
    }}
    function save() {{ try {{ localStorage.setItem(KEY, JSON.stringify(snapshot())); }} catch (e) {{}} }}
    function restore() {{
      var d; try {{ d = JSON.parse(localStorage.getItem(KEY) || "null"); }} catch (e) {{}}
      if (!d) return;
      Object.keys(d.f || {{}}).forEach(function (id) {{ var i = el(id); if (i) i.value = d.f[id]; }});
      Object.keys(d.c || {{}}).forEach(function (g) {{
        d.c[g].forEach(function (v) {{
          var c = document.querySelector("#" + g + " .chip[data-val='" + v + "']");
          if (c) c.setAttribute("aria-pressed", "true");
          if (v === "other") {{ var o = el(g + "_other"); if (o) o.hidden = false; }}
        }});
      }});
    }}
    form.addEventListener("input", save);
    restore();

    /* ---- compile the answers into one text message ---- */
    function answerFor(m) {{
      var id = "q" + m.n, L = zh() ? "zh" : "en";
      if (m.type !== "chips") return val(id);
      var picked = [];
      Array.prototype.forEach.call(document.querySelectorAll("#" + id + " .chip[aria-pressed='true']"), function (c) {{
        var v = c.getAttribute("data-val");
        if (v === "other") {{ var o = val(id + "_other"); picked.push((zh() ? "其他" : "Other") + (o ? ": " + o : "")); }}
        else picked.push(m.opts[+v][L]);
      }});
      return picked.join(zh() ? "、" : ", ");
    }}
    function compose() {{
      var Z = zh(), lines = [];
      lines.push(Z ? "定制婚纱问卷 — Elaine's Bridal Shop" : "Custom gown questionnaire — Elaine's Bridal Shop");
      lines.push((Z ? "姓名: " : "Name: ") + val("qName"));
      lines.push((Z ? "婚礼日期: " : "Wedding date: ") + val("qDate"));
      META.forEach(function (m) {{
        var a = answerFor(m);
        if (a) lines.push(m.n + ". " + m.short[Z ? "zh" : "en"] + ": " + a);
      }});
      lines.push(Z ? "灵感照片:" : "Inspiration photos:");
      return lines.join("\\n");
    }}

    form.addEventListener("submit", function (e) {{
      e.preventDefault();
      if (!form.checkValidity()) {{ form.reportValidity(); return; }}
      if (typeof gtag === "function") gtag("event", "custom_gown_questionnaire", {{}});
      var ok = el("qnSuccess"); if (ok) ok.hidden = false;
      window.location.href = window.ebsSmsHref ? window.ebsSmsHref(compose()) : "sms:+14157341832,+14158139302?&body=" + encodeURIComponent(compose());
    }});

    /* ---- desktop fallback: copy to clipboard ---- */
    el("qnCopy").addEventListener("click", function () {{
      var text = compose(), done = el("qnCopied");
      function show() {{ done.hidden = false; }}   // stays visible so she can find the address later
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(show, function () {{ window.prompt("Copy your answers:", text); }});
      else window.prompt("Copy your answers:", text);
    }});
  }})();
  </script>
</body>
</html>
'''
out = os.path.join(ROOT, "custom-gown-questionnaire.html")
open(out, "w", encoding="utf-8").write(page)
print("wrote custom-gown-questionnaire.html", len(page), "bytes;", len(meta_js), "questions;", len(i18n), "zh keys")
