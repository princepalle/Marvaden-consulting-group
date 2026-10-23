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
- `network-a` (digital network grid): Pexels video 12595752, used under the [Pexels License](https://www.pexels.com/license/) (free for commercial use).
- `meeting` ("Leader presents business plan to team at meeting", Mixkit 5683) and `engineers` ("Engineers setting up a data center", Mixkit 23375), used under the Mixkit Stock Video Free License.

Hero photos (`ai-meeting`, `cloud-desk`, `team-vision`, `analyst`, `team-talk`) are crops of images supplied by the site owner; only the photo areas are used, with no baked-in text or vendor logos. Keep a record of where these images came from and their licence.

Don't add iStock/Getty preview files (watermarked `*_adpp_is` downloads). Buy the licence and use the clean file.

## Notes
- No client or vendor logos are used. Each hero scene uses one of the clips or photos above.
- No client counts or testimonials are shown. Add them only when they're real.
- Accessibility: keyboard-operable slideshow with a pause button, tabs, accordion and carousel; checked with axe-core.

## Run locally
`python3 -m http.server 8000`, then open http://localhost:8000.

## Deploy
Vercel: Add New → Project → import the repo → Framework "Other" → Deploy.
