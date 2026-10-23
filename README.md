# Marvaden Consulting Group

Website for Marvaden Consulting Group, an IT and healthcare technology staffing firm serving employers and job seekers (remote, local and nationwide). Its visual style follows the reference site the client supplied: an auto-playing title-card hero, a centred mission card, an industry carousel, bold dark service cards, a blue-to-teal call to action with expandable process steps, and a floating chat button.

Static HTML, CSS and JavaScript. No build step.

## Update the details
Everything editable is at the top of `script.js` (`MCG`):

- `email`, `phone`, `linkedin`: shown in Contact and the footer. Until set, they show "coming soon". The chat bubble emails you once `email` is set; before that it jumps to the contact form.
- `formEndpoint`: optional [Formspree](https://formspree.io) or Getform URL. With it, both forms (including résumé files) are delivered directly. Without it but with `email`, forms open the visitor's email app.
- `jobs`: open roles for "Current openings", e.g.
  `{ title: "Epic Analyst (Ambulatory)", type: "Contract", location: "Remote", area: "Healthcare IT & EHR" }`.
  "Apply" pre-fills the job seeker form.

Services, industries, engagement models and process steps are in `index.html`.

## Media credits
Hero video clips (trimmed and compressed in `media/`):
- Digital network grid: Pexels video 12595752, used under the [Pexels License](https://www.pexels.com/license/) (free for commercial use).
- "Information technology specialist in data center": [Mixkit](https://mixkit.co/free-stock-video/information-technology-specialist-in-data-center-23218/), used under the Mixkit Stock Video Free License.

Don't add iStock/Getty preview files (watermarked `*_adpp_is` downloads). Buy the licence and use the clean file.

## Notes
- No client logos are used. Four hero scenes use the licensed clips above; the rest are colour panels and drawn icons that can be swapped for real photos later.
- No client counts or testimonials are shown. Add them only when they're real.
- Accessibility: keyboard-operable slideshow with a pause button, tabs, accordion and carousel; checked with axe-core.

## Run locally
`python3 -m http.server 8000`, then open http://localhost:8000.

## Deploy
Vercel: Add New → Project → import the repo → Framework "Other" → Deploy.
