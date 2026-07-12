/* ============================================================
   Elaine's Bridal Shop — EN / 中文 language toggle
   English lives in the HTML (captured on load). Chinese lives below.
   ============================================================ */
(function () {
  "use strict";

  var ZH = {
    /* nav */
    "nav.about": "裁缝师",
    "nav.services": "服务项目",
    "nav.process": "服务流程",
    "nav.gallery": "作品",
    "nav.showcase": "视频",
    "nav.book": "预约试衣",

    /* hero */
    "hero.eyebrow": "婚纱改制 · 定制裁缝",
    "hero.title": "你梦想中的婚纱,<br /><em>合身得恰到好处。</em>",
    "hero.sub": "一位专注于婚纱改制的私人裁缝师。收腰、放量、精修,一针一线,把你的婚纱改到完全贴合你的身形。献给不愿将就的新娘。",
    "hero.book": "预约试衣",
    "hero.gallery": "查看作品",

    /* strip */
    "strip.text": "萨克拉门托的新娘,把一生中最重要的那条裙子交给我们。我们收腰、放量、改下摆、重塑版型,直到你的名牌婚纱合身得仿佛<em>为你量身定制</em>——只为你一人。",

    /* about */
    "about.eyebrow": "裁缝师",
    "about.title": "完美合身,<br />是一门手艺。",
    "about.p1": "在萨克拉门托一家顶级婚纱店精修婚纱 11 年后,Elaine 想为新娘们打造更私人、一对一的体验。如今,她在自己的家庭工作室里,把超过 40 年的专业缝纫经验,直接倾注到你的婚纱上。",
    "about.p2": "她的事业,始于一张缝纫台、一把剪刀,和一个绝不妥协的信念——绝不让任何一位新娘穿上不真正合身的婚纱。Elaine 每季只接有限的新娘,因为一条能随你而动、稳稳贴合、上镜如梦的婚纱,急不得。从第一次试衣到最后熨烫,每一道针脚都由她亲手把关,你的婚纱始终不离她手。",
    "about.link": "开始你的试衣 <span>&rarr;</span>",

    /* services */
    "services.eyebrow": "我们做什么",
    "services.title": "完美合身,<br />陪你走过红毯。",
    "svc1.h": "精准改身",
    "svc1.p": "收侧缝、改公主线、换拉链,打造无瑕贴身曲线。",
    "svc2.h": "上身调整",
    "svc2.p": "专业缩短与调整上身版型。",
    "svc3.h": "改下摆与拖尾收束",
    "svc3.p": "精准调整裙长,并为婚宴打造漂亮、牢固的拖尾收束(bustle)。",
    "svc4.h": "定制添加",
    "svc4.p": "制作并加装定制袖子(含优雅的垂坠袖与长袖),以及定制肩部与肩带。",

    /* custom gowns */
    "cv.eyebrow": "定制婚纱",
    "cv.title": "为你量身设计的<br />专属婚纱。",
    "cv.lede": "除了改制,我们也提供婚纱定制——<strong>首次咨询完全免费</strong>。",
    "cv.includes": "免费咨询包含:",
    "cv.i1": "<span>01</span>提供你的三围、身高体重,以及婚礼场地。",
    "cv.i2": "<span>02</span>获得我们为你精选的 <strong>30 款最适合你的婚纱推荐</strong>。",
    "cv.i3": "<span>03</span>在婚纱做出来之前,先看到你穿上它的样子——免费为你制作一支效果预览视频。",
    "cv.tip": "已经有心仪的婚纱款式?强烈建议带上它们的图片——最好在预约首次咨询时就发给我们。",
    "cv.note": "效果预览视频需到店体验——欢迎预约到店亲自观看。",
    "cv.cta": "预约免费咨询",
    "cv.demos": "我们制作的部分效果视频",

    /* gallery */
    "gallery.eyebrow": "作品集",
    "gallery.title": "近期作品,<br />近距离欣赏。",
    "gallery.note": "点击任意图片可放大查看。",
    "gallery.consent": "文中真实新娘的照片,均已征得本人同意后展示。",

    /* showcase */
    "showcase.eyebrow": "动态展示",
    "showcase.title": "婚纱之美,<br />唯有动起来才看得真切。",

    /* process */
    "process.eyebrow": "服务流程",
    "process.title": "清晰、从容,<br />通往完美合身。",
    "process.lede": "从你发来第一条消息,到最后一次试衣,每一步我们都坦诚透明。以下就是我们合作的全过程。",
    "process.link": "索取报价 <span>&rarr;</span>",
    "p1.h": "时间与安排",
    "p1.p": "请先告诉我们你的婚礼日期。我们建议在<strong>婚礼前三到四个月</strong>开始改制——留足时间把婚纱做到完美,不必赶在最后一刻。",
    "p2.h": "试衣流程",
    "p2.p": "大多数婚纱只需<strong>两次到店</strong>即可完成:",
    "p2.v1": "<span>第一次</span>初次试衣。请带上你的婚纱,以及婚礼当天<em>实际要穿的那双鞋</em>。",
    "p2.v2": "<span>第二次</span>我们检查合身度并精修每个细节。小幅调整通常当场完成;若需要较大改动,我们会再约第三次。",
    "p3.h": "如何报价",
    "p3.p": "想要预估价格,请发来<strong>整条婚纱挂起来的照片</strong>——正面、背面和侧面——并附上你想做的具体改动清单。我们会根据照片给出预估报价,并在你第一次到店时确认最终价格。",
    "p4.h": "工作室位置",
    "p4.p": "我们位于<strong>加州萨克拉门托 95828 区</strong>,采用预约制接待新娘。安排试衣行程时,请把这一点考虑进去。",

    /* promise */
    "promise.eyebrow": "我们的承诺",
    "promise.text": "每一位新娘,都值得拥有一条仿佛<em>为她量身定制</em>的婚纱——不做到这一点,我们绝不停手。",

    /* contact */
    "contact.eyebrow": "预约试衣",
    "contact.title": "让我们开始<br />你的婚纱之旅。",
    "contact.p": "我们采用私密的预约制。想最快拿到报价,请附上婚纱挂起来的照片(正面、背面和侧面),以及你想做的改动。我们会在两个工作日内回复你。",
    "contact.studio": "<span>工作室</span>家庭工作室 · 加州萨克拉门托 95828 · 仅限预约",
    "contact.email": "<span>邮箱</span><a href='mailto:weddingdresssewing@gmail.com'>weddingdresssewing@gmail.com</a>",
    "lbl.name": "姓名",
    "lbl.email": "邮箱",
    "lbl.date": "婚礼日期",
    "lbl.service": "我想了解",
    "lbl.message": "和我们聊聊你的婚纱",
    "opt.1": "精准改身",
    "opt.2": "上身调整",
    "opt.3": "改下摆与拖尾收束",
    "opt.4": "定制添加(袖子、肩带)",
    "opt.custom": "定制婚纱——免费咨询",
    "opt.5": "还不确定",
    "lbl.photos": "照片(选填)",
    "photos.btn": "最多上传 3 张照片——你的婚纱(正面、背面、侧面)或心仪的款式",
    "btn.submit": "提交预约申请",
    "contact.hint": "想直接发短信或邮件?可联系 Chloe(415)734-1832,或把婚纱的正面、背面和侧面照片发到 <a href='mailto:weddingdresssewing@gmail.com'>weddingdresssewing@gmail.com</a>,更快拿到报价。",
    "contact.success": "谢谢你——我们已收到你的预约申请,会尽快与你联系。♥",

    /* feedback */
    "fb.eyebrow": "意见反馈",
    "fb.title": "帮我们做得<br />更好。",
    "fb.lede": "和 Elaine 合作过吗?欢迎聊聊你的体验——一两句话,既能帮我们进步,也能帮到之后的新娘。",
    "fb.lblMsg": "你的反馈",
    "fb.lblName": "姓名(选填)",
    "fb.submit": "发送反馈",
    "fb.success": "谢谢你——你的反馈对我们意义重大。♥",

    /* footer */
    "footer.tag": "「这里,有你梦想中的那条裙子」· 加州萨克拉门托 · 家庭工作室",
    "footer.about": "裁缝师",
    "footer.services": "服务项目",
    "footer.custom": "定制婚纱",
    "footer.gallery": "作品",
    "footer.contact": "联系我们",
    "footer.rights": "版权所有。"
  };

  var ZH_PH = {
    "ph.name": "你的姓名",
    "ph.message": "你想做的改动、婚礼日期,以及任何疑问…",
    "fb.phMsg": "你的体验、建议,或任何想对我们说的话…",
    "fb.phName": "可以留空"
  };

  var META = {
    en: {
      title: "Elaine's Bridal Shop — Wedding Dress Alterations & Tailoring · Sacramento",
      desc: "Elaine's Bridal Shop — an in-home studio in Sacramento, CA specializing in expert wedding-dress alterations and tailoring. Where your dream dress awaits."
    },
    zh: {
      title: "Elaine's Bridal Shop — 婚纱改制与定制裁缝 · 萨克拉门托",
      desc: "Elaine's Bridal Shop（爱莲婚纱坊）—— 位于加州萨克拉门托的家庭工作室,专精婚纱改制与定制裁缝。这里,有你梦想中的那条裙子。"
    }
  };

  // Capture the English HTML/placeholders straight from the page on load.
  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  nodes.forEach(function (el) { el.setAttribute("data-en", el.innerHTML); });
  var phNodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n-ph]"));
  phNodes.forEach(function (el) { el.setAttribute("data-en-ph", el.getAttribute("placeholder") || ""); });

  var descEl = document.querySelector('meta[name="description"]');

  function apply(lang) {
    var zh = lang === "zh";
    document.documentElement.lang = zh ? "zh-CN" : "en";
    document.documentElement.classList.toggle("lang-zh", zh);

    nodes.forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var val = zh && ZH[k] != null ? ZH[k] : el.getAttribute("data-en");
      el.innerHTML = val;
    });
    phNodes.forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      el.placeholder = zh && ZH_PH[k] != null ? ZH_PH[k] : el.getAttribute("data-en-ph");
    });

    var m = zh ? META.zh : META.en;
    document.title = m.title;
    if (descEl) descEl.setAttribute("content", m.desc);

    var btn = document.getElementById("langToggle");
    if (btn) {
      btn.textContent = zh ? "EN" : "中文";
      btn.setAttribute("aria-label", zh ? "Switch to English" : "切换到中文");
    }
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  var saved = "en";
  try { saved = localStorage.getItem("lang") || "en"; } catch (e) {}

  var toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      apply(document.documentElement.lang === "zh-CN" ? "en" : "zh");
    });
  }

  apply(saved);
})();
