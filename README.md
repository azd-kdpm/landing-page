# NEXUS — CCTV, Home Automation & Security Systems (ELV)

A modern, responsive, mobile-first personal and collaborative website, standalone digital visiting card, and secure content management portal built for **NEXUS** with HTML5, Tailwind CSS, and Vanilla JavaScript.

Designed specifically for co-founders **Asadullah K. P.** and **Ansarullah K. P.** who share the same studio (**NEXUS**), ELV capabilities, and installation portfolio, with **individual direct contact points** (instant mobile phone vCard download and direct WhatsApp chat).

---

## 🌐 Web Pages in Project

1. **[`index.html`](index.html)** — The main collaborative website:
   - Tagline: **CCTV / Home automation / Security system (ELV)**
   - Dual Partner Profiles:
     - **Asadullah K. P.** (Founder & Product Strategist — `asadukdpm@gmail.com` — `+91 90489 14570`)
     - **Ansarullah K. P.** (Founder & Creative Director — `ansaransarullahkp@gmail.com` — `+91 98479 14570`)
   - Real high-res user photos integrated.
   - Professional profiles section temporarily hidden until social links are added.
   - 9 ELV Capabilities & Specializations with custom high-tech icons.
   - Project Archive / Timeline with photos hidden until real installation pictures are added.
   - Mobile Floating Action Bar (Save Contact, WhatsApp Direct, Call).

2. **[`card.html`](card.html)** — Dedicated Standalone Visiting Card:
   - Interactive 3D/2D flippable matte-black business card.
   - Features Ansarullah's or Asadullah's portrait, direct phone, WhatsApp, and location.
   - Back: Scannable QR code & studio details.
   - 1-Click Save Contact, WhatsApp Direct, and Print button (exact 3.5" x 2" standard business card).
   - Download link for the physical print mockup image.

3. **[`admin.html`](admin.html)** — 🔐 Secure Visual Content Manager & Image Uploader:
   - **PIN-Protected Lock Screen**: Master PIN security check (Default PIN: `9048`).
   - Change Master PIN anytime inside the Brand / Settings tab.
   - **Upload photos directly from your computer or phone** for Partner Avatars and Project Gallery thumbnails.
   - Built-in canvas compression automatically resizes images to avoid heavy files.
   - Edit names, phone numbers, WhatsApp links, emails, bios, services, and projects in simple forms.
   - **"Save Changes"** updates the website immediately in your browser.
   - **"Download data.js"** button lets you export a clean `data.js` file with 1 click to save edits permanently.

---

## 🔐 How to Access the Secure Content Manager (`admin.html`)

1. Open **`admin.html`** in your browser (or click the discreet lock icon in the footer of `index.html` or `card.html`).
2. Enter your Master PIN: **`9048`** and click **Unlock Dashboard**.
3. Edit your details, services, or upload photos.
4. You can change your Master PIN anytime in the **🏢 Brand Settings** tab.
5. Click **Lock** in the top bar whenever you finish editing.

---

## ⚡ 9 Capabilities & Specializations

1. **Home automation** (Smart Living & IoT)
2. **Security Alarm** (Intrusion Protection)
3. **Large scale CCTV System** (Enterprise Surveillance)
4. **Wifi / Solar Camera systm** (Off-Grid Wireless Surveillance)
5. **Solar Electric** (Clean Renewable Energy)
6. **Gate/shutter automation** (Motorized Access Control)
7. **Biometric / Attandance system** (Access Control & HR Tracking)
8. **wifi / network** (Structured Cabling & Mesh)
9. **Nurse call system** (Healthcare & Hospital ELV)

---

## 🌟 Key Features

1. **Dual Partner Profiles & Instant Switcher**:
   - Header switcher toggle between **Asadullah K. P.** (+91 90489 14570) and **Ansarullah K. P.** (+91 98479 14570).
   - **Unique Direct Share Links**:
     - `index.html?profile=partner1` & `card.html?profile=partner1` (Asadullah)
     - `index.html?profile=partner2` & `card.html?profile=partner2` (Ansarullah)
   - Each partner can share their own personalized URL on their physical business card, NFC tag, Instagram / LinkedIn bio, or resume.

2. **Mobile Floating Action Bar (Thumb-Friendly)**:
   - Persistent quick-action bar at the bottom on all smartphones with instant **Save Contact** and **WhatsApp Direct** buttons.

3. **Instant QR Code Scanner**:
   - Tap "QR Code" (top bar or card) to pop up a high-resolution QR code. Clients can point their phone camera at your screen to instantly open your personal card!

4. **Save Contact to Mobile Phone (`.vcf` / vCard 3.0)**:
   - One-click button that dynamically generates a standard vCard file (`.vcf`).
   - When tapped on iOS (iPhone / Apple Contacts) or Android, it immediately prompts the user to **"Add to Contacts"** with your exact name, phone number, email, company, and title.

5. **Direct WhatsApp Chat Integration**:
   - Tapping "Chat on WhatsApp" automatically targets the active partner's WhatsApp phone number with a pre-filled, personalized greeting.

6. **Working Fields & Capabilities**:
   - Shared showcase of your core expertise (Web Engineering, UI/UX Design, Mobile Solutions, Brand Identity) with key deliverables pills.

7. **Timeline Project Gallery & Case Study Lightbox**:
   - Interactive chronological timeline showcasing your joint works with year milestones, tags, key metrics, and thumbnails.
   - Filterable by categories: *All*, *Web Platforms & SaaS*, *Mobile Solutions*, *Brand & Identity*.
   - Clicking any project opens an in-depth modal with the project background, joint responsibilities, and direct WhatsApp inquiry button.

---

## 🛠️ How to Customize Your Details

All profile information, services, and projects are managed in a single file: **[`data.js`](data.js)**.

### 1. Update Partner 1 Details
In `data.js`, look for `siteConfig.partners.partner1`:
- Change `name`, `role`, `company`, `location`, `bio`.
- Set your phone number:
  - `phoneDisplay`: formatted number shown on screen (e.g. `+91 98765 43210`)
  - `phoneRaw`: digits with country code for phone calls (e.g. `+919876543210`)
  - `whatsapp`: digits only with country code (e.g. `919876543210`)
- Set your `email`, `website`, and `avatar` image URL.
- Add your personal social links (LinkedIn, GitHub, Instagram, Twitter/X).

### 2. Update Partner 2 Details
In `data.js`, look for `siteConfig.partners.partner2` and edit with your partner's details.

### 3. Add or Modify Working Fields
In `data.js`, edit `siteConfig.workingFields` array to reflect your services and capabilities.

### 4. Add or Modify Timeline Works
In `data.js`, edit `siteConfig.timelineWorks` array to add your past and present projects, client names, year, tags, and metrics.

---

## 🚀 How to View Locally

Simply double-click **`index.html`** to open it in any web browser (Google Chrome, Microsoft Edge, Safari, Firefox). No installation or build command is required!

---

## 🌐 Free Hosting & Deployment

You can host this website completely free in 1 minute using any of the following:
- **GitHub Pages**: Push this folder to a GitHub repository and turn on GitHub Pages in the repository settings.
- **Vercel**: Drag and drop this folder onto [vercel.com](https://vercel.com).
- **Netlify**: Drag and drop this folder onto [netlify.com/drop](https://app.netlify.com/drop).
