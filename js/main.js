/* ============================================================
   Elaine's Bridal Shop — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ============================================================
     OWNER SETTINGS — paste your links here, then save.
     Leave a value as "" to keep that feature off.
     ============================================================ */
  var FORM_EMAIL         = "weddingdresssewing@gmail.com"; // contact form emails here (free, via FormSubmit)
  var BOOKING_URL        = "";   // free: Calendly free tier OR Google Calendar appointment schedule
  var INSTAGRAM_URL      = "https://www.instagram.com/elainebridalsac";

  /* ---------- Data ---------- */
  // Gallery photos, in display order: photos with people first, then gowns on the form.
  // gown-06 is the hero image, so it's intentionally left out of the gallery.
  // Gallery photos in display order. Each has a specific alt + bilingual caption.
  var GALLERY = [
    { id: "01", alt: "Elaine hand-sewing a wedding gown hem beside the dress form in her Sacramento studio", en: "Hand-finishing a gown, stitch by stitch.", zh: "一针一线,手工精修婚纱。" },
    { id: "05", alt: "Elaine guiding wedding gown fabric through her sewing machine", en: "Precision work at the machine.", zh: "缝纫机前的精准作业。" },
    { id: "07", alt: "Pinning a lace wedding gown during a private fitting", en: "Pinning the fit during a private fitting.", zh: "私人试衣中细致定位。" },
    { id: "03", alt: "Elaine reviewing finished wedding gowns hanging on the studio rack", en: "Gowns ready for their brides.", zh: "整装待发的婚纱。" },
    { id: "09", alt: "Bride wearing her altered asymmetric wedding gown after the final fitting", en: "Final fit, ready for the aisle.", zh: "最终试衣,准备走上红毯。" },
    { id: "20", alt: "Strapless lace wedding gown after alterations, on the dress form", en: "Lace gown, altered and pressed.", zh: "蕾丝婚纱,改制熨烫完成。" },
    { id: "16", alt: "Fitted lace wedding gown with train after alterations", en: "Shaped through the bodice and hem.", zh: "上身与下摆重新塑形。" },
    { id: "10", alt: "A-line wedding gown after hem and bodice alterations", en: "Hem and bodice adjustments complete.", zh: "下摆与上身调整完成。" },
    { id: "22", alt: "Beaded wedding gown on the dress form after tailoring", en: "Beadwork preserved through every alteration.", zh: "改制全程保留珠绣细节。" },
    { id: "18", alt: "Mermaid wedding gown with sweetheart neckline after alterations", en: "A mermaid silhouette, refined.", zh: "鱼尾轮廓,精细修身。" },
    { id: "14", alt: "Ruched mermaid wedding gown after fitting alterations", en: "Ruching realigned for a clean line.", zh: "褶皱重整,线条利落。" },
    { id: "02", alt: "Finished mermaid wedding gown displayed in the studio", en: "Ready for pickup in the studio.", zh: "工作室里等待新娘的成品。" },
    { id: "04", alt: "Elaine's serger and thread station in the Sacramento studio", en: "The tools behind every clean seam.", zh: "每一道干净缝线背后的工具。" },
    { id: "08", alt: "Designer wedding gowns in garment bags awaiting alterations", en: "Brides' gowns in our care.", zh: "新娘们托付的婚纱。" }
  ];
  var VIDEOS = [1, 2, 3, 4];       // showcase-1 … showcase-4

  /* ---------- Year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky nav ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 60) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu (accessible) ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  function menuIsOpen() { return links.classList.contains("open"); }
  function setMenu(open, refocus) {
    toggle.classList.toggle("open", open);
    links.classList.toggle("open", open);
    nav.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (!open && refocus) toggle.focus();
  }
  toggle.addEventListener("click", function () { setMenu(!menuIsOpen()); });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setMenu(false);
  });
  document.addEventListener("click", function (e) {
    if (menuIsOpen() && !links.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuIsOpen()) setMenu(false, true);
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Build gallery (buttons = keyboard accessible) ---------- */
  var grid = document.getElementById("galleryGrid");
  var items = []; // { full, alt, el }
  GALLERY.forEach(function (g) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery__item";
    btn.setAttribute("aria-label", "View larger: " + g.en);
    var img = document.createElement("img");
    // NOTE: no loading="lazy" here — in the horizontal strip the items are
    // 0-wide until the image loads, so a lazy image never "intersects" and
    // never loads (chicken-and-egg). Eager is required for this layout.
    img.src = "assets/images/thumb/gown-" + g.id + ".jpg";
    img.alt = g.alt;
    var cap = document.createElement("span");
    cap.className = "gallery__caption";
    cap.innerHTML = '<span class="i18n-en">' + g.en + '</span><span class="i18n-zh">' + g.zh + '</span>';
    btn.appendChild(img);
    btn.appendChild(cap);
    grid.appendChild(btn);
    items.push({ full: "assets/images/full/gown-" + g.id + ".jpg", alt: g.alt, el: btn });
  });

  /* ---------- Gallery arrows (desktop) ---------- */
  var galPrev = document.getElementById("galPrev");
  var galNext = document.getElementById("galNext");
  function galScroll(dir) {
    grid.scrollBy({ left: dir * grid.clientWidth * 0.8, behavior: "smooth" });
  }
  if (galPrev) galPrev.addEventListener("click", function () { galScroll(-1); });
  if (galNext) galNext.addEventListener("click", function () { galScroll(1); });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var lbList = [];   // currently navigable items (the visible ones)
  var current = 0;

  var lastGalleryTrigger = null;   // focus returns here on close

  function showImage(idx) {
    if (!lbList.length) return;
    current = (idx + lbList.length) % lbList.length;
    lbImg.src = lbList[current].full;
    lbImg.alt = lbList[current].alt || "Wedding gown";
  }
  function openLightbox(el) {
    lastGalleryTrigger = el;
    lbList = items.filter(function (it) { return !it.el.classList.contains("hide"); });
    var idx = 0;
    for (var k = 0; k < lbList.length; k++) { if (lbList[k].el === el) { idx = k; break; } }
    showImage(idx);
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }
  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lbImg.removeAttribute("src");
    if (lastGalleryTrigger) { lastGalleryTrigger.focus(); lastGalleryTrigger = null; }
  }

  grid.addEventListener("click", function (e) {
    var item = e.target.closest(".gallery__item");
    if (item && !item.classList.contains("hide")) openLightbox(item);
  });
  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", function () { showImage(current - 1); });
  lbNext.addEventListener("click", function () { showImage(current + 1); });
  lb.addEventListener("click", function (e) {
    if (e.target === lb) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") showImage(current - 1);
    else if (e.key === "ArrowRight") showImage(current + 1);
  });

  /* ---------- Video grids (showcase + custom-gown demos) ----------
     Cards are <button> with a poster <img> only — no inline <video> element,
     so nothing video-related loads until a card is actually opened. */
  function buildVideoGrid(gridId, prefix, list, labelPrefix) {
    var grid = document.getElementById(gridId);
    if (!grid) return;
    list.forEach(function (v, i) {
      var src = "assets/video/" + prefix + "-" + v + ".mp4";
      var poster = "assets/video/" + prefix + "-" + v + "-poster.jpg";
      var card = document.createElement("button");
      card.type = "button";
      card.className = "video-card";
      card.setAttribute("aria-label", "Play " + labelPrefix + " video " + (i + 1));
      var img = document.createElement("img");
      img.className = "poster";
      img.src = poster;
      img.alt = "";
      img.loading = "lazy";
      var play = document.createElement("span");
      play.className = "video-card__play";
      play.setAttribute("aria-hidden", "true");
      card.appendChild(img);
      card.appendChild(play);
      grid.appendChild(card);
      card.addEventListener("click", function () { openVideoLightbox(src, poster, card); });
    });
  }
  buildVideoGrid("showcaseGrid", "showcase", VIDEOS, "gown fitting");
  buildVideoGrid("customGrid", "custom", [8, 9, 7, 6, 1, 4], "custom gown preview");

  /* ---------- Video lightbox (click a video to enlarge) ---------- */
  var vlb = document.getElementById("vLightbox");
  var vlbVideo = document.getElementById("vlbVideo");
  var vlbClose = document.getElementById("vlbClose");
  var lastVideoTrigger = null;

  function openVideoLightbox(src, poster, trigger) {
    lastVideoTrigger = trigger || null;
    vlbVideo.src = src;
    vlbVideo.poster = poster || "";
    // show the poster while the video buffers, instead of a black box
    vlbVideo.style.background = poster
      ? "#000 center / contain no-repeat url('" + poster + "')"
      : "#000";
    vlb.classList.add("open");
    vlb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    vlbClose.focus();
    vlbVideo.play();
  }
  function closeVideoLightbox() {
    vlbVideo.pause();
    vlbVideo.removeAttribute("src");
    vlbVideo.load();
    vlb.classList.remove("open");
    vlb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastVideoTrigger) { lastVideoTrigger.focus(); lastVideoTrigger = null; }
  }
  vlbClose.addEventListener("click", closeVideoLightbox);
  vlb.addEventListener("click", function (e) { if (e.target === vlb) closeVideoLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && vlb.classList.contains("open")) closeVideoLightbox();
  });

  /* ---------- Contact form ----------
     Submits to FORM_EMAIL via FormSubmit (free, no account). The owner must
     confirm the very FIRST submission once — FormSubmit emails a one-time
     activation link. After that, every inquiry lands in the inbox.
     Set FORM_EMAIL = "" to fall back to a demo-only form. */
  var form = document.getElementById("contactForm");
  var success = document.getElementById("formSuccess");
  if (form) {
    var submitBtn = form.querySelector("button[type=submit]");
    var submitLabel = submitBtn.textContent;

    // Hidden iframe target for the native FormSubmit POST. Created once at init
    // so its initial about:blank "load" can't race a submission's load event.
    var fsFrame = document.createElement("iframe");
    fsFrame.name = "fsFrame";
    fsFrame.setAttribute("title", "hidden form target");
    fsFrame.style.display = "none";
    document.body.appendChild(fsFrame);

    /* --- photo upload (max 3, client-side downscaled, sent as email attachments) --- */
    var MAX_PHOTOS = 3;
    var photos = [];   // File objects (compressed)
    var photoInput = document.getElementById("photoInput");
    var photoZone = document.getElementById("photoZone");
    var photoPreviews = document.getElementById("photoPreviews");

    function zhUI() { return document.documentElement.lang === "zh-CN"; }

    // Downscale to ≤1600px JPEG so phone photos don't blow the attachment limit
    function compressImage(file) {
      return new Promise(function (resolve) {
        if (!/^image\//.test(file.type) || file.type === "image/gif") return resolve(file);
        var url = URL.createObjectURL(file);
        var img = new Image();
        img.onload = function () {
          var MAX = 1600;
          var scale = Math.min(1, MAX / Math.max(img.width, img.height));
          var c = document.createElement("canvas");
          c.width = Math.round(img.width * scale);
          c.height = Math.round(img.height * scale);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          c.toBlob(function (b) {
            URL.revokeObjectURL(url);
            if (b && b.size < file.size) {
              resolve(new File([b], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" }));
            } else { resolve(file); }
          }, "image/jpeg", 0.82);
        };
        img.onerror = function () { URL.revokeObjectURL(url); resolve(file); };
        img.src = url;
      });
    }

    function renderPreviews() {
      photoPreviews.innerHTML = "";
      photos.forEach(function (f, i) {
        var d = document.createElement("div");
        d.className = "upload__thumb";
        var img = document.createElement("img");
        img.src = URL.createObjectURL(f);
        img.alt = f.name;
        var x = document.createElement("button");
        x.type = "button";
        x.textContent = "×";
        x.setAttribute("aria-label", "Remove photo");
        x.addEventListener("click", function () { photos.splice(i, 1); renderPreviews(); });
        d.appendChild(img); d.appendChild(x);
        photoPreviews.appendChild(d);
      });
    }

    photoZone.addEventListener("click", function () { photoInput.click(); });
    photoInput.addEventListener("change", function () {
      var files = Array.prototype.slice.call(photoInput.files || []);
      photoInput.value = "";
      if (!files.length) return;
      if (photos.length + files.length > MAX_PHOTOS) {
        window.alert(zhUI() ? "最多上传 " + MAX_PHOTOS + " 张照片。" : "You can upload up to " + MAX_PHOTOS + " photos.");
        files = files.slice(0, MAX_PHOTOS - photos.length);
      }
      files.forEach(function (f) {
        if (f.size > 20 * 1024 * 1024) {
          window.alert(zhUI() ? "「" + f.name + "」太大了(超过 20MB),请换一张。" : '"' + f.name + '" is too large (over 20MB) — please choose a smaller photo.');
          return;
        }
        compressImage(f).then(function (out) {
          if (photos.length < MAX_PHOTOS) { photos.push(out); renderPreviews(); }
        });
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      function submitLabelNow() {
        return zhUI() ? "提交预约申请" : "Request an Appointment";
      }
      function restoreButtonSoon() {
        setTimeout(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = submitLabelNow();
        }, 2500);
      }

      if (!FORM_EMAIL) {                       // demo fallback (no email configured)
        success.hidden = false;
        form.reset();
        restoreButtonSoon();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = zhUI() ? "发送中…" : "Sending…";

      // Submit to FormSubmit's NATIVE endpoint via a hidden iframe: the /ajax/
      // endpoint silently drops file attachments, the native one emails them.
      var nf = document.createElement("form");
      nf.action = "https://formsubmit.co/" + FORM_EMAIL;
      nf.method = "POST";
      nf.enctype = "multipart/form-data";
      nf.target = "fsFrame";
      nf.style.display = "none";
      function hiddenField(name, value) {
        var i = document.createElement("input");
        i.type = "hidden"; i.name = name; i.value = value;
        nf.appendChild(i);
      }
      var consentEl = document.getElementById("textConsent");
      hiddenField("Name", document.getElementById("name").value);
      hiddenField("Phone", document.getElementById("phone").value);
      hiddenField("Text consent", consentEl && consentEl.checked ? "YES — ok to text" : "no");
      hiddenField("email", document.getElementById("email").value);   // lowercase "email" sets reply-to
      hiddenField("Wedding date", document.getElementById("date").value);
      hiddenField("Interested in", document.getElementById("service").value);
      hiddenField("Message", document.getElementById("message").value);
      hiddenField("_subject", "New fitting request — Elaine's Bridal Shop website");
      hiddenField("_template", "table");
      hiddenField("_captcha", "false");
      // Attach photos; on ancient browsers without DataTransfer, send the form
      // without them rather than dying mid-submit.
      try {
        photos.forEach(function (f, i) {
          var fi = document.createElement("input");
          fi.type = "file";
          fi.name = i === 0 ? "attachment" : "attachment" + (i + 1);
          var dt = new DataTransfer();
          dt.items.add(f);
          fi.files = dt.files;
          nf.appendChild(fi);
        });
      } catch (err) {
        hiddenField("Note", "(bride attached " + photos.length + " photo(s) but her browser could not upload them)");
      }
      document.body.appendChild(nf);

      var formError = document.getElementById("formError");
      var settled = false;
      function finishOk() {
        if (settled) return; settled = true;
        nf.remove();
        if (formError) formError.hidden = true;
        success.hidden = false;
        form.reset();
        photos = [];
        renderPreviews();
        submitBtn.textContent = zhUI() ? "已发送 ✓" : "Sent ✓";
        restoreButtonSoon();
      }
      fsFrame.addEventListener("load", finishOk, { once: true });
      // safety net: if the iframe never fires load (offline etc.), show the
      // on-page error (with text/email fallbacks) and restore the button
      setTimeout(function () {
        if (settled) return; settled = true;
        nf.remove();
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabelNow();
        if (formError) formError.hidden = false;
      }, 20000);

      nf.submit();
    });
  }

  /* ---------- Feedback form (stars + FormSubmit, same free pipe) ---------- */
  var fbForm = document.getElementById("feedbackForm");
  if (fbForm) {
    var fbSuccess = document.getElementById("fbSuccess");
    var fbBtn = fbForm.querySelector("button[type=submit]");
    var fbMsg = document.getElementById("fbMessage");
    var starBtns = Array.prototype.slice.call(document.querySelectorAll("#fbStars button"));
    var fbRating = 0;

    function paintStars() {
      starBtns.forEach(function (b) {
        b.classList.toggle("on", parseInt(b.dataset.star, 10) <= fbRating);
      });
    }
    starBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        fbRating = parseInt(b.dataset.star, 10);
        paintStars();
      });
    });

    fbForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!fbForm.checkValidity()) { fbForm.reportValidity(); return; }
      var zh = document.documentElement.lang === "zh-CN";

      function fbRestoreSoon() {
        setTimeout(function () {
          fbBtn.disabled = false;
          fbBtn.textContent = document.documentElement.lang === "zh-CN" ? "发送反馈" : "Send Feedback";
        }, 2500);
      }

      if (!FORM_EMAIL) {                      // demo fallback
        fbSuccess.hidden = false;
        fbForm.reset(); fbRating = 0; paintStars();
        fbRestoreSoon();
        return;
      }

      fbBtn.disabled = true;
      fbBtn.textContent = zh ? "发送中…" : "Sending…";

      var payload = {
        Type: "Website feedback",
        Rating: fbRating ? fbRating + " / 5" : "(not given)",
        Name: document.getElementById("fbName").value || "(anonymous)",
        Feedback: fbMsg.value,
        _subject: "New feedback — Elaine's Bridal Shop website",
        _template: "table",
        _captcha: "false"
      };

      fetch("https://formsubmit.co/ajax/" + encodeURIComponent(FORM_EMAIL), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json(); })
        .then(function () {
          fbSuccess.hidden = false;
          fbForm.reset(); fbRating = 0; paintStars();
          fbBtn.textContent = zh ? "已发送 ✓" : "Sent ✓";
          fbRestoreSoon();
        })
        .catch(function () {
          fbBtn.disabled = false;
          fbBtn.textContent = zh ? "发送反馈" : "Send Feedback";
          window.alert((zh ? "抱歉,出了点问题。请直接发邮件至 " : "Sorry — something went wrong. Please email ") + FORM_EMAIL);
        });
    });
  }

  /* ---------- Online booking (Calendly, lazy-loaded) ----------
     Nothing Calendly-related loads unless BOOKING_URL is set AND a booking
     button is actually clicked. When it's empty, the buttons keep their
     default behavior (scroll to contact). */
  function loadCalendly() {
    return new Promise(function (resolve, reject) {
      if (window.Calendly) return resolve();
      var css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(css);
      var s = document.createElement("script");
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  if (BOOKING_URL) {
    document.querySelectorAll("[data-book]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        loadCalendly()
          .then(function () { Calendly.initPopupWidget({ url: BOOKING_URL }); })
          .catch(function () { window.location.hash = "#contact"; });
      });
    });
  }

  /* ---------- Instagram links (footer icon + contact row) ---------- */
  if (INSTAGRAM_URL) {
    var igHandle = "@" + INSTAGRAM_URL.replace(/\/+$/, "").split("/").pop().split("?")[0];
    var igIcon = document.querySelector("[data-instagram]");
    if (igIcon) { igIcon.href = INSTAGRAM_URL; igIcon.hidden = false; }
    var igLink = document.querySelector("[data-instagram-link]");
    if (igLink) { igLink.href = INSTAGRAM_URL; igLink.textContent = igHandle; }
    var igRow = document.querySelector("[data-instagram-row]");
    if (igRow) { igRow.hidden = false; }
  }
})();
