# Elaine's Bridal Shop — Website

A handcrafted, fully responsive one-page website for **Elaine's Bridal Shop**,
an in-home wedding-dress sewing & alterations studio in Sacramento, CA
("Where Your Dream Dress Awaits"). Built with plain HTML, CSS, and JavaScript —
no build step, no dependencies. Rebuilt from the shop's own photos & videos
(replacing the old Strikingly no-code site with real, editable source code).

Contact: Chloe (415) 734-1832 · Elaine (415) 813-9302 ·
weddingdresssewing@gmail.com

## Run it locally

It's a static site — open `index.html` directly, or serve the folder:

```bash
cd wedding-dress-website
python3 -m http.server 8768
# then open http://localhost:8768
```

## Structure

```
wedding-dress-website/
├── index.html            # all page content & sections
├── css/styles.css        # all styling (palette, layout, responsive)
├── js/main.js            # nav, scroll reveals, gallery lightbox, video
└── assets/
    ├── images/
    │   ├── full/         # gown-01…23.jpg  (large, for lightbox)
    │   └── thumb/        # gown-01…23.jpg  (small, for the grid)
    └── video/            # showcase-1…4.mp4 + *-poster.jpg
```

The 23 photos were converted from HEIC → web JPEG; the 4 videos were
compressed from ~165 MB total down to ~23 MB for fast loading.

## Features

- Full-screen hero with subtle zoom
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Filterable gallery (All / Finished Gowns / On the Bride / In the Studio) with
  click-to-enlarge lightbox that respects the active filter
- Click-to-play video showcase with poster frames
- Reviews section + Google-reviews link
- Online booking (Calendly) on every "Book a Fitting" button
- Contact form (front-end demo — see "Make it live" below)
- Instagram / email / phone in the footer
- Mobile hamburger menu, responsive down to 375 px

## ⚙️ Owner settings — paste 3 links (5 minutes)

Open **`js/main.js`**, find the **OWNER SETTINGS** block at the very top, and
fill in any of these (leave `""` to keep a feature off):

| Setting | What it does | Where to get it |
|---|---|---|
| `FORM_EMAIL` | Inbox the contact form delivers to. **Already set** to `weddingdresssewing@gmail.com` via FormSubmit (free, no account). See activation note below. | — |
| `BOOKING_URL` | Makes every "Book a Fitting" button open an online scheduler. Until set, those buttons scroll to the (working) contact form. | Free [Calendly](https://calendly.com) event, or a free [Google Calendar appointment schedule](https://support.google.com/calendar/answer/10729749) (uses your Gmail) |
| `INSTAGRAM_URL` | Shows the Instagram icon in the footer + contact row. **Already set** to `@elainebridalsac`. | Your IG profile URL |

## Real vs. placeholder content

**Already accurate** (real business info):
- Brand name **Elaine's Bridal Shop**, the slogan, the **E** monogram.
- Email **weddingdresssewing@gmail.com**, phones **Chloe (415) 734-1832** &
  **Elaine (415) 813-9302**, in-home studio **Sacramento, CA 95828**.
- The entire **How It Works** section — timeline (3–4 months), the 2–3 fitting
  visits, and the photo-based quote process.

- About stats are real: **40+ years experience · 500+ gowns tailored · 100% hand-fitted**.
- Instagram is wired to **@sacbridalseamstress** (footer icon + contact row).
- A real client's face in one gallery photo (`gown-09`) is **blurred** for privacy.
- Video music is credited per its CC BY 3.0 license (under the video section).

**No fabricated content remains.** The placeholder reviews were removed — the
"Our Promise" section is the shop's own words (not a fake customer quote). When
you collect real Google reviews, they can be added back as a reviews section.

## Contact form — activate it (one time, free)

The form already delivers to **weddingdresssewing@gmail.com** through
[FormSubmit](https://formsubmit.co) — free, unlimited, no account. One one-time
step to switch it on:

1. Open the live site and submit the form once (any test message).
2. FormSubmit emails an **activation link** to weddingdresssewing@gmail.com —
   open that email and click **Activate Form**.
3. Done. From then on, every inquiry arrives in the inbox (with the bride's
   email as reply-to, so you can just hit Reply).

To reduce spam scraping later, you can swap the email in `js/main.js`
(`FORM_EMAIL`) for the random alias FormSubmit gives you after activation.

## Online booking — free options

The "Book a Fitting" buttons already lead to the working contact form, so booking
requests work for free today. For true self-service calendar booking (the bride
picks a slot), use a free scheduler tied to *your* availability, then paste its
link into `BOOKING_URL` in `js/main.js`:

- **Google Calendar → Appointment schedules** — free with your Gmail, no new account.
- **Calendly free tier** — 1 event type, unlimited bookings.

Both give you a shareable link; once it's in `BOOKING_URL`, every "Book a Fitting"
button opens the scheduler in a popup.

## Deploy (free)

Drag the folder onto [Netlify Drop](https://app.netlify.com/drop), or push to
GitHub and enable **Pages**. No configuration needed — it's all static files.
