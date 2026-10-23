/* ===== COMPANY DETAILS — fill these in and the whole site updates ===== */
const MCG = {
  email: "",          // e.g. "talent@marvadengroup.com" — powers the contact buttons and the chat bubble
  phone: "",          // e.g. "+1 301 555 0100"
  linkedin: "",       // company LinkedIn URL
  formEndpoint: "",   // optional: Formspree/Getform URL so forms (and résumé files) are delivered without email
  // Open roles shown in "Current openings". Leave empty to show the "send your résumé" message.
  // { title: "Epic Analyst (Ambulatory)", type: "Contract", location: "Remote", area: "Healthcare IT & EHR" }
  jobs: []
};
/* ====================================================================== */

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  /* Contact details */
  const soon = t => `<span class="muted">${t} coming soon</span>`;
  $$("[data-email]").forEach(el => (el.innerHTML = MCG.email ? `<a href="mailto:${MCG.email}">${MCG.email}</a>` : soon("Email")));
  $$("[data-phone]").forEach(el => (el.innerHTML = MCG.phone ? `<a href="tel:${MCG.phone.replace(/[^\d+]/g, "")}">${MCG.phone}</a>` : soon("Phone")));
  $$("[data-linkedin]").forEach(a => { if (MCG.linkedin) { a.href = MCG.linkedin; a.hidden = false; } });
  $$("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

  /* Header + mobile menu */
  const top = $("[data-top]");
  const onScroll = () => top.classList.toggle("solid", scrollY > 8);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });
  const burger = $("[data-burger]"), menu = $("[data-menu]");
  const setMenu = open => { burger.setAttribute("aria-expanded", String(open)); menu.hidden = !open; document.body.classList.toggle("menu-open", open); };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", e => { if (e.key === "Escape" && !menu.hidden) { setMenu(false); burger.focus(); } });

  /* Hero showcase. Each scene: white wipe down, then the panel slides in from a corner, headline lines
     sharpen one by one, artwork slides in from the opposite side and zooms, and the label types itself. */
  const stage = $("[data-stage]"), scenes = $$(".scene", stage), wipe = $(".wipe", stage);
  const dots = $(".dots"), pauseBtn = $("[data-pause]");
  const SCENE_MS = 5600, WIPE_MS = 450;
  let current = -1, timer = null, typer = null, paused = reduceMotion;

  scenes.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.setAttribute("aria-label", `Show slide ${i + 1} of ${scenes.length}`);
    b.addEventListener("click", () => { go(i); schedule(); });
    dots.append(b);
  });

  const typeLabel = scene => {
    clearInterval(typer);
    const el = $(".typed", scene); if (!el) return;
    const text = el.dataset.text, label = el.parentElement;
    if (reduceMotion) { el.textContent = text; return; }
    el.textContent = ""; let n = 0;
    setTimeout(() => {
      if (!scene.classList.contains("on")) return;
      label.classList.add("typing");
      typer = setInterval(() => {
        el.textContent = text.slice(0, ++n);
        if (n >= text.length) { clearInterval(typer); setTimeout(() => label.classList.remove("typing"), 900); }
      }, 55);
    }, scene.classList.contains("sc-logo") ? 1100 : 1300);
  };

  // Clips load only when their scene first appears (WebM first, MP4 for Safari).
  const playVideos = scene => {
    $$("video", stage).forEach(v => { if (!scene.contains(v)) v.pause(); });
    $$("video", scene).forEach(v => {
      if (!v.dataset.loaded) {
        ["webm", "mp4"].forEach(ext => {
          const src = document.createElement("source");
          src.src = `${v.dataset.clip}.${ext}`; src.type = `video/${ext}`; v.append(src);
        });
        v.dataset.loaded = "1"; v.load();
      }
      v.currentTime = 0;
      if (!paused && !reduceMotion) v.play().catch(() => {});
    });
  };

  const show = i => {
    scenes.forEach(s => s.classList.remove("on", "play"));
    current = (i + scenes.length) % scenes.length;
    const scene = scenes[current];
    scenes.forEach((s, k) => s.setAttribute("aria-hidden", String(k !== current)));
    [...dots.children].forEach((d, k) => { if (k === current) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
    scene.classList.add("on");
    playVideos(scene);
    void scene.offsetWidth;            // restart transitions from the "before" state
    scene.classList.add("play");
    typeLabel(scene);
  };

  const go = i => {
    if (reduceMotion || current === -1) { show(i); return; }
    wipe.classList.add("down");         // white sheet sweeps down over the current scene
    setTimeout(() => { show(i); wipe.classList.remove("down"); }, WIPE_MS);
  };

  const schedule = () => { clearTimeout(timer); if (!paused) timer = setTimeout(() => { go(current + 1); schedule(); }, SCENE_MS); };
  const setPaused = p => {
    paused = p; stage.classList.toggle("paused", p);
    $$("video", stage).forEach(v => { if (p) v.pause(); else if (v.closest(".scene.on")) v.play().catch(() => {}); });
    pauseBtn.setAttribute("aria-pressed", String(p));
    pauseBtn.setAttribute("aria-label", p ? "Play slideshow" : "Pause slideshow");
    schedule();
  };
  pauseBtn.addEventListener("click", () => setPaused(!paused));
  show(0); setPaused(paused);
  $(".showcase").addEventListener("focusin", () => clearTimeout(timer));
  $(".showcase").addEventListener("focusout", schedule);
  document.addEventListener("visibilitychange", () => (document.hidden ? clearTimeout(timer) : schedule()));

  /* Industry carousel arrows */
  const track = $(".trust-track");
  $$("[data-scroll]").forEach(b => b.addEventListener("click", () =>
    track.scrollBy({ left: Number(b.dataset.scroll) * (track.clientWidth * 0.8), behavior: reduceMotion ? "auto" : "smooth" })));

  /* Openings */
  const jobsEl = $("[data-jobs]");
  if (MCG.jobs.length) {
    jobsEl.innerHTML = `<ul class="jobs">${MCG.jobs.map(j => `
      <li><div><b>${j.title}</b><span>${[j.area, j.location].filter(Boolean).join(" · ")}</span></div>
      <em>${j.type || ""}</em>
      <a href="#contact" class="btn btn-small" data-apply="${j.title}">Apply</a></li>`).join("")}</ul>`;
    jobsEl.addEventListener("click", e => {
      const a = e.target.closest("[data-apply]"); if (!a) return;
      chooseAudience("talent"); $("#t-role").value = a.dataset.apply;
    });
  }

  /* Contact: hiring vs. looking for work */
  const tabs = $$("[role=tab]");
  const chooseAudience = who => {
    tabs.forEach(t => {
      const on = t.dataset.audience === who;
      t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1;
      $("#" + t.getAttribute("aria-controls")).hidden = !on;
    });
  };
  tabs.forEach(t => {
    t.addEventListener("click", () => chooseAudience(t.dataset.audience));
    t.addEventListener("keydown", e => {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      const next = tabs[(tabs.indexOf(t) + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
      chooseAudience(next.dataset.audience); next.focus();
    });
  });
  $$("[data-audience-link]").forEach(a => a.addEventListener("click", () => chooseAudience(a.dataset.audienceLink)));

  /* Forms */
  const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const MAX_FILE = 5 * 1024 * 1024;
  $$("form[data-form]").forEach(form => {
    const status = $(".form-status", form);
    const fieldError = (el, msg) => {
      const err = $("#" + el.id + "-err"); if (err) err.textContent = msg;
      el.setAttribute("aria-invalid", String(Boolean(msg))); return !msg;
    };
    const validate = el => {
      if (el.type === "file") {
        const f = el.files[0];
        if (!f) return fieldError(el, "");
        if (!/\.(pdf|docx?)$/i.test(f.name)) return fieldError(el, "Please attach a PDF or Word document.");
        return fieldError(el, f.size > MAX_FILE ? "Please keep the file under 5 MB." : "");
      }
      if (el.required && !el.value.trim()) return fieldError(el, "This field is required.");
      if (el.type === "email" && el.value && !emailOk(el.value)) return fieldError(el, "Please enter a valid email address.");
      return fieldError(el, "");
    };
    const fields = $$("input:not([type=checkbox]), textarea, select", form);
    fields.forEach(el => {
      el.addEventListener("blur", () => el.value && validate(el));
      // Re-check a flagged field as soon as it changes, so its error clears while typing rather than on
      // blur - otherwise the layout shifts during the click on Submit and the click misses the button.
      ["input", "change"].forEach(type => el.addEventListener(type, () => {
        if (el.getAttribute("aria-invalid") === "true") validate(el);
      }));
    });
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const bad = fields.filter(el => !validate(el));
      if (bad.length) { bad[0].focus(); status.textContent = "Please fix the highlighted fields."; return; }
      const data = new FormData(form);
      const kind = form.dataset.form === "client" ? "Staffing request" : "Candidate";
      const button = $("button[type=submit]", form);
      if (MCG.formEndpoint) {
        button.disabled = true; status.textContent = "Sending…";
        try {
          const r = await fetch(MCG.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: data });
          if (!r.ok) throw new Error();
          form.reset(); status.textContent = "Thank you! We'll be in touch within one business day.";
        } catch { status.textContent = "Sorry, that didn't send. Please try again or email us."; }
        button.disabled = false;
      } else if (MCG.email) {
        const lines = [...data.entries()].filter(([, v]) => typeof v === "string" && v.trim()).map(([k, v]) => `${k}: ${v}`);
        const resume = data.get("resume");
        if (resume && resume.name) lines.push("", `(Please attach your résumé: ${resume.name})`);
        location.href = `mailto:${MCG.email}?subject=${encodeURIComponent(`${kind} — ${data.get("name") || ""}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
        status.textContent = "Your email app has opened with your details — just press send" + (resume && resume.name ? " (attach your résumé first)." : ".");
      } else {
        status.textContent = "Thank you! Online submissions open soon — please check back shortly.";
      }
    });
  });

  /* Process accordion: one open at a time */
  $$(".step").forEach(d => d.addEventListener("toggle", () => {
    if (d.open) $$(".step").forEach(o => { if (o !== d) o.open = false; });
  }));

  /* Chat bubble */
  $("[data-chat]").addEventListener("click", () => {
    if (MCG.email) location.href = `mailto:${MCG.email}?subject=${encodeURIComponent("Hello from your website")}`;
    else { $("#contact").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); $("#c-name").focus({ preventScroll: true }); }
  });

  /* Reveal on scroll */
  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach(el => io.observe(el));
  } else $$(".reveal").forEach(el => el.classList.add("in"));
})();
