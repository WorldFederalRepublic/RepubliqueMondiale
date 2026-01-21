(function () {
  const STORAGE_KEY = "wf_lang";
  const btn = document.querySelector("[data-lang-toggle]");
  const saved = localStorage.getItem(STORAGE_KEY);
  const initial = saved || "fr";

  setLang(initial);

  if (btn) {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("lang") || "fr";
      const next = current === "fr" ? "en" : "fr";
      setLang(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  function setLang(lang) {
    document.documentElement.setAttribute("lang", lang);

    // 1) Simple i18n: replace textContent from data-fr / data-en
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = el.getAttribute(`data-${lang}`);
      if (val != null && val !== "") el.textContent = val;
    });

    // 2) Block i18n: show/hide elements tagged as language blocks
    document.querySelectorAll("[data-lang-block]").forEach((block) => {
      const blockLang = block.getAttribute("data-lang-block");
      block.style.display = (blockLang === lang) ? "" : "none";
    });

    // Button label
    if (btn) {
      btn.textContent = "FR / EN";
      btn.setAttribute("aria-label", lang === "fr" ? "Switch language to English" : "Passer la langue en français");
    }
  }
})();
