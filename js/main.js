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
  var GALLERY = ["01", "05", "07", "03", "09", "20", "16", "10", "22", "18", "14", "02", "04", "08"];
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

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  function closeMenu() {
    toggle.classList.remove("open");
    links.classList.remove("open");
  }
  toggle.addEventListener("click", function () {
    toggle.classList.toggle("open");
    links.classList.toggle("open");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeMenu();
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

  /* ---------- Build gallery ---------- */
  var grid = document.getElementById("galleryGrid");
  var items = []; // { full, el }
  GALLERY.forEach(function (n) {
    var fig = document.createElement("figure");
    fig.className = "gallery__item reveal";
    var img = document.createElement("img");
    img.src = "assets/images/thumb/gown-" + n + ".jpg";
    img.loading = "lazy";
    img.alt = "Wedding dress alterations by Elaine's Bridal Shop";
    fig.appendChild(img);
    grid.appendChild(fig);
    items.push({ full: "assets/images/full/gown-" + n + ".jpg", el: fig });
    if (typeof io !== "undefined") io.observe(fig);
  });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var lbList = [];   // currently navigable items (the visible ones)
  var current = 0;

  function showImage(idx) {
    if (!lbList.length) return;
    current = (idx + lbList.length) % lbList.length;
    lbImg.src = lbList[current].full;
    lbImg.alt = "Wedding gown";
  }
  function openLightbox(el) {
    lbList = items.filter(function (it) { return !it.el.classList.contains("hide"); });
    var idx = 0;
    for (var k = 0; k < lbList.length; k++) { if (lbList[k].el === el) { idx = k; break; } }
    showImage(idx);
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
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

  /* ---------- Video grids (showcase + custom-gown demos) ---------- */
  function buildVideoGrid(gridId, prefix, list) {
    var grid = document.getElementById(gridId);
    if (!grid) return;
    list.forEach(function (v) {
      var card = document.createElement("div");
      card.className = "video-card";
      var video = document.createElement("video");
      video.src = "assets/video/" + prefix + "-" + v + ".mp4";
      video.poster = "assets/video/" + prefix + "-" + v + "-poster.jpg";
      video.preload = "none";
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      var play = document.createElement("div");
      play.className = "video-card__play";
      card.appendChild(video);
      card.appendChild(play);
      grid.appendChild(card);

      // click → enlarge in the video lightbox
      card.addEventListener("click", function () { openVideoLightbox(video); });
    });
  }
  buildVideoGrid("showcaseGrid", "showcase", VIDEOS);
  buildVideoGrid("customGrid", "custom", [8, 9, 7, 6, 1, 2, 3, 4, 5]);

  /* ---------- Video lightbox (click a video to enlarge) ---------- */
  var vlb = document.getElementById("vLightbox");
  var vlbVideo = document.getElementById("vlbVideo");
  var vlbClose = document.getElementById("vlbClose");

  function openVideoLightbox(sourceVideo) {
    // stop any inline videos first
    document.querySelectorAll(".video-card video").forEach(function (v) { v.pause(); });
    vlbVideo.src = sourceVideo.getAttribute("src");
    vlbVideo.poster = sourceVideo.getAttribute("poster") || "";
    // show the poster while the video buffers, instead of a black box
    vlbVideo.style.background = vlbVideo.poster
      ? "#000 center / contain no-repeat url('" + vlbVideo.poster + "')"
      : "#000";
    vlb.classList.add("open");
    vlb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    vlbVideo.play();
  }
  function closeVideoLightbox() {
    vlbVideo.pause();
    vlbVideo.removeAttribute("src");
    vlbVideo.load();
    vlb.classList.remove("open");
    vlb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
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
      hiddenField("Name", document.getElementById("name").value);
      hiddenField("email", document.getElementById("email").value);   // lowercase "email" sets reply-to
      hiddenField("Wedding date", document.getElementById("date").value);
      hiddenField("Interested in", document.getElementById("service").value);
      hiddenField("Message", document.getElementById("message").value);
      hiddenField("_subject", "New fitting inquiry — Elaine's Bridal Shop website");
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

      var settled = false;
      function finishOk() {
        if (settled) return; settled = true;
        nf.remove();
        success.hidden = false;
        form.reset();
        photos = [];
        renderPreviews();
        submitBtn.textContent = zhUI() ? "已发送 ✓" : "Sent ✓";
        restoreButtonSoon();
      }
      fsFrame.addEventListener("load", finishOk, { once: true });
      // safety net: if the iframe never fires load (offline etc.), restore the button
      setTimeout(function () {
        if (settled) return; settled = true;
        nf.remove();
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
        window.alert((zhUI() ? "抱歉,出了点问题。请直接发邮件至 " : "Sorry — something went wrong. Please email ") + FORM_EMAIL);
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

  /* ---------- Online booking (Calendly) ----------
     If BOOKING_URL is set, every [data-book] button opens the Calendly popup.
     If it's empty, the buttons keep their default behavior (scroll to contact). */
  if (BOOKING_URL) {
    document.querySelectorAll("[data-book]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        if (window.Calendly && typeof Calendly.initPopupWidget === "function") {
          e.preventDefault();
          Calendly.initPopupWidget({ url: BOOKING_URL });
        }
        // else: fall through to the default #contact scroll
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
