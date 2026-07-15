/* ============================================================
   Elaine's Bridal Shop — EN / 中文 language toggle
   English lives in the HTML (captured on load). Chinese lives below.
   ============================================================ */
(function () {
  "use strict";

  var ZH = {
    /* nav */
    "nav.services": "改衣服务",
    "nav.gallery": "作品",
    "nav.process": "服务流程",
    "nav.reviews": "客户评价",
    "nav.custom": "定制婚纱",
    "nav.book": "申请试衣预约",

    /* hero */
    "hero.eyebrow": "萨克拉门托婚纱改制",
    "hero.title": "您的婚纱,<br /><em>由 Elaine 亲手改到合身。</em>",
    "hero.sub": "在萨克拉门托,由拥有 40 多年专业缝纫经验的裁缝师为您提供私人一对一婚纱改制。先发送婚纱照片获取估价,准备好后再预约试衣。",
    "hero.estimate": "发送照片获取估价",
    "hero.request": "申请试衣预约",
    "hero.gallery": "查看真实作品",

    /* trust strip */
    "trust.1": "<strong>40+ 年</strong><span>缝纫经验</span>",
    "trust.2": "<strong>11 年</strong><span>萨克拉门托婚纱店经验</span>",
    "trust.3": "<strong>私人</strong><span>一对一试衣</span>",
    "trust.4": "<strong>照片先行</strong><span>到店前先估价</span>",
    "trust.5": "<strong>EN / 中文</strong><span>双语服务</span>",

    /* quick start */
    "qs.eyebrow": "如何开始",
    "qs.title": "先发照片,<br />再安心到店。",
    "qs.h1": "发送婚礼日期和婚纱照片",
    "qs.p1": "请附上婚纱挂起来的正面、背面和侧面照片,以及您的婚礼日期。",
    "qs.h2": "获取初步估价",
    "qs.p2": "我们会查看您的照片,通常在两个工作日内回复。",
    "qs.h3": "预约私人试衣",
    "qs.p3": "准备好后,欢迎来到 Elaine 位于萨克拉门托 95828 的家庭工作室。",

    /* about */
    "about.eyebrow": "认识 Elaine",
    "about.title": "被托付一生一次婚纱的<br />裁缝师。",
    "about.p1": "Elaine 为每一条经手的婚纱带来 40 多年的专业缝纫经验。在萨克拉门托一家顶级婚纱店精修婚纱 11 年后,她开设了自己的私人家庭工作室,专为想要细致一对一服务的新娘。",
    "about.p2": "从试衣到收尾,您的婚纱始终不离 Elaine 之手。她只接待有限数量的新娘,确保每条裙子都得到充分的时间、精准与从容。",
    "about.link": "开始您的试衣 <span>&rarr;</span>",

    /* services */
    "services.eyebrow": "改衣服务",
    "services.title": "我们每周都在做的<br />婚纱改制。",
    "services.lede": "无论您的婚纱是偏松、偏紧、偏长,还是差一点点完美,我们都会围绕您的身形和婚礼当天的需要,逐一调整每个细节。",
    "svc1.h": "版型与塑形",
    "svc1.p": "收放侧缝、公主线、拉链与上身,让婚纱平顺贴合、稳固安心。",
    "svc2.h": "下摆与拖尾收束",
    "svc2.p": "调整裙长、层次、拖尾与婚宴收束,让您行走、跳舞、拍照都自如。",
    "svc3.h": "上身、肩带与支撑",
    "svc3.p": "缩短上身、调整肩部、加固肩带,精修领口的贴合与支撑。",
    "svc4.h": "袖子与定制细节",
    "svc4.p": "加装袖子、肩带、遮挡片、肩部装饰等定制细节,让婚纱更像您自己。",
    "services.cta": "不确定您的婚纱需要改什么?<a href=\"#contact\">发照片来估价。</a>",

    /* custom gowns */
    "cv.eyebrow": "定制婚纱",
    "cv.title": "为您量身设计的<br />专属婚纱。",
    "cv.lede": "除了改制,我们也提供婚纱定制,<strong>首次咨询完全免费</strong>!",
    "cv.includes": "免费咨询包含:",
    "cv.i1": "<span>01</span>告诉我们您的三围尺寸、婚礼场地,以及您对梦想婚纱的构想。",
    "cv.i2": "<span>02</span>我们为您推荐最适合您的婚纱。",
    "cv.i3": "<span>03</span>在婚纱做出来之前,先看到您穿上它的样子:免费为您制作一支效果预览视频。",
    "cv.i4": "<span>04</span>若您决定与我们定制婚纱,我们会为您量取详细尺寸,并收取报价 50% 的定金。婚纱将严格按照所量尺寸制作;到店后我们会预约最后一次试衣,如需调整,可为您提供进一步的改制服务。",
    "cv.tip": "已经有心仪的婚纱款式?强烈建议带上它们的图片。最好在预约首次咨询时就发给我们。",
    "cv.note": "效果预览视频是咨询时的款式可视化工具,需到店体验;最终设计、制作、合身与改制均以到店确认为准。",
    "cv.cta": "预约免费咨询",
    "cv.demos": "我们制作的部分效果视频",

    /* gallery */
    "gallery.eyebrow": "作品集",
    "gallery.title": "近期作品,<br />近距离欣赏。",
    "gallery.note": "左右滑动浏览,点击任意图片可放大查看。",
    "gallery.consent": "文中真实新娘的照片,均已征得本人同意后展示。",

    /* showcase */
    "showcase.eyebrow": "动态展示",
    "showcase.title": "婚纱之美,<br />唯有动起来才看得真切。",

    /* process */
    "process.eyebrow": "服务流程",
    "process.title": "从第一条消息到最终试衣,<br />路径清晰。",
    "process.lede": "我们让流程简单、透明、从容,确保您的婚纱在婚礼前早早就绪。",
    "process.link": "索取报价 <span>&rarr;</span>",
    "p1.h": "时间与安排",
    "p1.p": "请先告诉我们您的婚礼日期。我们建议在<strong>婚礼前三到四个月</strong>开始改制,留出充足的时间打磨每一处细节,确保您的婚纱完美合身。",
    "p3.h": "发照片获取估价",
    "p3.p": "请发来<strong>整条婚纱挂起来的照片</strong>,包含正面、背面和侧面,并附上您想改的具体项目清单。我们会根据照片给出预估报价,并在首次试衣、动工之前确认最终价格。",
    "p2.h": "试衣流程",
    "p2.p": "大多数婚纱只需<strong>两次到店</strong>即可完成:",
    "p2.v1": "<span>第一次</span>初次试衣。请带上您的婚纱,以及婚礼当天<em>实际要穿的那双鞋</em>。",
    "p2.v2": "<span>第二次</span>我们检查合身度并精修每个细节。小幅调整通常当场完成;若需要较大改动,我们会再约第三次。",
    "p4.h": "工作室位置",
    "p4.p": "我们位于<strong>加州萨克拉门托 95828 区</strong>,采用预约制。确认预约后,我们会提供详细地址。",

    /* promise */
    "promise.eyebrow": "我们的承诺",
    "promise.text": "每一位新娘,都值得拥有一条仿佛<em>为她量身定制</em>的婚纱——不做到这一点,我们绝不停手。",

    /* contact */
    "contact.eyebrow": "开始咨询",
    "contact.title": "申请试衣,<br />或发照片估价。",
    "contact.p": "告诉我们您的婚礼日期和想改的地方,我们会在两个工作日内回复。想最快拿到估价,请把整条婚纱挂起来的正面、背面和侧面照片短信发给我们。",
    "contact.checkTitle": "想更快收到回复,请附上:",
    "contact.check1": "您的婚礼日期",
    "contact.check2": "婚纱的正面、背面和侧面照片",
    "contact.check3": "如方便,附一张您穿着这条裙子的照片",
    "contact.check4": "您想改的项目清单",
    "contact.check5": "您期望的试衣时间段",
    "contact.studio": "<span>工作室</span>私人家庭工作室 · 加州萨克拉门托 95828 · 预约确认后提供详细地址",
    "contact.email": "<span>邮箱</span><a href='mailto:weddingdresssewing@gmail.com'>weddingdresssewing@gmail.com</a>",
    "lbl.name": "姓名",
    "lbl.phone": "电话(便于短信回复)",
    "lbl.email": "邮箱",
    "lbl.date": "婚礼日期",
    "lbl.service": "我想了解",
    "lbl.message": "和我们聊聊您的婚纱",
    "opt.1": "版型与塑形",
    "opt.2": "下摆与拖尾收束",
    "opt.3": "上身、肩带与支撑",
    "opt.4": "袖子与定制细节",
    "opt.custom": "定制婚纱——免费咨询",
    "opt.5": "还不确定",
    "lbl.photos": "婚纱照片",
    "sms.btn": "<strong>把婚纱照片短信发给 Chloe</strong><br />正面、背面、侧面——最快拿到估价的方式",
    "contact.textConsent": "可以通过短信联系我确认估价和预约。",
    "btn.submit": "提交试衣申请",
    "contact.hint": "想直接联系我们?短信或致电 Chloe <a href='sms:+14157341832'>(415) 734-1832</a>,或发邮件至 <a href='mailto:weddingdresssewing@gmail.com'>weddingdresssewing@gmail.com</a>。",
    "contact.success": "谢谢您。我们已收到您的申请,将在两个工作日内回复。在我们与您确认可预约时间之前,预约尚未最终生效。",
    "contact.error": "抱歉,提交时出了点问题。请短信联系 Chloe <a href='sms:+14157341832'>(415) 734-1832</a>,或发邮件至 <a href='mailto:weddingdresssewing@gmail.com'>weddingdresssewing@gmail.com</a>。",

    /* feedback / reviews */
    "fb.eyebrow": "新娘评价",
    "fb.title": "被托付,<br />被信赖。",
    "fb.lede": "真实新娘的评价即将上线。与 Elaine 合作过?欢迎在下方留下一两句话,既帮我们进步,也帮到之后的新娘。",
    "fb.lblMsg": "您的反馈",
    "fb.lblName": "姓名(选填)",
    "fb.submit": "发送反馈",
    "fb.success": "谢谢您——您的反馈对我们意义重大。♥",

    /* footer */
    "footer.tag": "「这里,有您梦想中的那条裙子」· 加州萨克拉门托 · 家庭工作室",
    "footer.about": "裁缝师",
    "footer.services": "改衣服务",
    "footer.custom": "定制婚纱",
    "footer.gallery": "作品",
    "footer.feedback": "留下反馈",
    "footer.contact": "联系我们",
    "footer.rights": "版权所有。"
  };

  var ZH_PH = {
    "ph.name": "您的姓名",
    "ph.message": "您想做的改动、婚礼日期,以及任何疑问…",
    "fb.phMsg": "您的体验、建议,或任何想对我们说的话…",
    "fb.phName": "可以留空"
  };

  var META = {
    en: {
      title: "Sacramento Wedding Dress Alterations | Elaine's Bridal Shop",
      desc: "Private one-on-one wedding dress alterations in Sacramento, CA by Elaine, a bridal seamstress with 40+ years of sewing experience. Send dress photos for an estimate and request a fitting."
    },
    zh: {
      title: "萨克拉门托婚纱改制 | Elaine's Bridal Shop",
      desc: "Elaine's Bridal Shop —— 位于加州萨克拉门托的私人家庭工作室,40 多年专业缝纫经验,一对一婚纱改制。先发婚纱照片获取估价,再预约试衣。"
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
