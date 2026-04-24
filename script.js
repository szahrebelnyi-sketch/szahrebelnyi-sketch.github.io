const internalLinkSelector = 'a[href$=".html"], a[href="index.html"]';
const sharedVisualPages = new Set(["index.html", "contact.html"]);
const navLinks = [
  { href: "index.html", label: "About" },
  { href: "case-studies.html", label: "Case Studies" },
  { href: "services.html", label: "Services" },
  { href: "contact.html", label: "Contact" },
];
const networkVisualMarkup = `
<svg class="hero-network-svg" viewBox="0 0 760 760" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <pattern id="grid-squares" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0V32" stroke="rgba(13,13,13,0.08)" stroke-width="1" />
    </pattern>
    <path id="flow-a" d="M120 620H260V490H388V380" />
    <path id="flow-b" d="M260 682V544H388V380" />
    <path id="flow-c" d="M144 300H288V380H388" />
    <path id="flow-d" d="M648 474H536V380H388" />
    <path id="flow-e" d="M420 116V246H388V380" />
    <path id="flow-f" d="M630 312H520V380H388" />
  </defs>
  <rect x="36" y="40" width="684" height="664" fill="url(#grid-squares)" />
  <path d="M120 620H260V490H388V380" class="network-link" />
  <path d="M260 682V544H388V380" class="network-link" />
  <path d="M144 300H288V380H388" class="network-link" />
  <path d="M648 474H536V380H388" class="network-link" />
  <path d="M420 116V246H388V380" class="network-link" />
  <path d="M630 312H520V380H388" class="network-link" />
  <path d="M230 412H142V530" class="network-link" />
  <path d="M520 380H630V312" class="network-link" />
  <text x="84" y="608" class="network-label">Strategy</text>
  <text x="572" y="518" class="network-label">Design</text>
  <text x="102" y="288" class="network-label">Content</text>
  <text x="382" y="102" class="network-label">System</text>
  <text x="566" y="300" class="network-label">Growth</text>
  <circle cx="388" cy="380" r="6" class="network-node network-node-accent network-node-center" />
  <circle cx="120" cy="620" r="4" class="network-node" />
  <circle cx="260" cy="620" r="4" class="network-node" />
  <circle cx="260" cy="490" r="4" class="network-node network-node-accent" />
  <circle cx="260" cy="682" r="4" class="network-node" />
  <circle cx="460" cy="544" r="4" class="network-node" />
  <circle cx="144" cy="300" r="4" class="network-node" />
  <circle cx="288" cy="204" r="4" class="network-node" />
  <circle cx="420" cy="116" r="4" class="network-node" />
  <circle cx="536" cy="474" r="4" class="network-node" />
  <circle cx="648" cy="474" r="4" class="network-node" />
  <circle cx="610" cy="430" r="4" class="network-node" />
  <circle cx="630" cy="312" r="4" class="network-node" />
  <circle cx="142" cy="530" r="4" class="network-node" />
  <circle r="5" class="network-pulse">
    <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
      <mpath href="#flow-a" xlink:href="#flow-a" />
    </animateMotion>
  </circle>
  <circle r="4" class="network-pulse network-pulse-accent">
    <animateMotion dur="8.5s" repeatCount="indefinite" rotate="auto">
      <mpath href="#flow-b" xlink:href="#flow-b" />
    </animateMotion>
  </circle>
  <circle r="4" class="network-pulse">
    <animateMotion dur="6.2s" repeatCount="indefinite" rotate="auto">
      <mpath href="#flow-c" xlink:href="#flow-c" />
    </animateMotion>
  </circle>
  <circle r="3.5" class="network-pulse network-pulse-accent">
    <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
      <mpath href="#flow-d" xlink:href="#flow-d" />
    </animateMotion>
  </circle>
  <circle r="4" class="network-pulse">
    <animateMotion dur="6.8s" repeatCount="indefinite" rotate="auto">
      <mpath href="#flow-e" xlink:href="#flow-e" />
    </animateMotion>
  </circle>
  <circle r="3.5" class="network-pulse network-pulse-accent">
    <animateMotion dur="7.6s" repeatCount="indefinite" rotate="auto">
      <mpath href="#flow-f" xlink:href="#flow-f" />
    </animateMotion>
  </circle>
</svg>
`;

function renderSiteHeader() {
  const currentPage = normalizePageName(window.location.pathname);
  const navMarkup = navLinks
    .map(({ href, label }) => {
      const isActive = normalizePageName(href) === currentPage;
      return `<a class="topbar-link${isActive ? " is-active" : ""}" href="${href}">${label}</a>`;
    })
    .join("");

  document.querySelectorAll("site-header").forEach((host) => {
    host.innerHTML = `
      <header class="topbar">
        <div class="page topbar-inner">
          <a class="brand" href="index.html" aria-label="Go to homepage">
            <img class="brand-logo" src="LOGO_ZD_LOGO_ZD_Black.png" alt="Zahrebelnyi logo" />
            <div class="brand-text">
              <span class="brand-primary">Zahrebelnyi</span>
            </div>
          </a>
          <nav class="topbar-nav" aria-label="Primary navigation">
            ${navMarkup}
          </nav>
        </div>
      </header>
    `;
  });
}

function injectNetworkVisuals() {
  const hosts = document.querySelectorAll("[data-network-visual]");
  if (!hosts.length) return;
  hosts.forEach((host) => {
    host.innerHTML = networkVisualMarkup;
  });
}

function normalizePageName(pathname) {
  const cleanPath = pathname.split("#")[0].split("?")[0];
  const pageName = cleanPath.substring(cleanPath.lastIndexOf("/") + 1);
  return pageName || "index.html";
}

function isSharedVisualPage(pathname) {
  return sharedVisualPages.has(normalizePageName(pathname));
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "absolute";
  helper.style.left = "-9999px";
  document.body.appendChild(helper);
  helper.select();

  try {
    return document.execCommand("copy");
  } finally {
    helper.remove();
  }
}

function bindCopyEmail() {
  const emailButton = document.querySelector("[data-copy-email]");
  if (!(emailButton instanceof HTMLButtonElement)) return;

  const email = emailButton.dataset.copyEmail;
  if (!email) return;

  const originalLabel = (emailButton.textContent || email).trim();
  let resetTimer = null;

  const syncEmailWidth = () => {
    const probe = document.createElement("span");
    const computed = window.getComputedStyle(emailButton);
    probe.style.position = "absolute";
    probe.style.visibility = "hidden";
    probe.style.pointerEvents = "none";
    probe.style.whiteSpace = "nowrap";
    probe.style.font = computed.font;
    probe.style.fontSize = computed.fontSize;
    probe.style.fontWeight = computed.fontWeight;
    probe.style.letterSpacing = computed.letterSpacing;
    probe.style.textTransform = computed.textTransform;
    probe.style.lineHeight = computed.lineHeight;
    document.body.appendChild(probe);

    probe.textContent = originalLabel;
    const originalWidth = Math.ceil(probe.getBoundingClientRect().width);
    probe.textContent = "Copied";
    const copiedWidth = Math.ceil(probe.getBoundingClientRect().width);
    probe.remove();

    emailButton.style.width = `${Math.max(originalWidth, copiedWidth)}px`;
  };

  syncEmailWidth();

  if (document.fonts?.ready) {
    document.fonts.ready.then(syncEmailWidth).catch(() => {});
  }

  window.addEventListener("resize", syncEmailWidth);

  emailButton.addEventListener("click", async () => {
    const copied = await copyTextToClipboard(email);
    if (!copied) return;

    emailButton.classList.add("copied");
    emailButton.textContent = "Copied";

    if (resetTimer) {
      window.clearTimeout(resetTimer);
    }

    resetTimer = window.setTimeout(() => {
      emailButton.classList.remove("copied");
      emailButton.textContent = originalLabel || email;
    }, 1200);
  });
}

function bindServiceToggles() {
  const groups = document.querySelectorAll("[data-toggle-group]");
  if (!groups.length) return;

  groups.forEach((group) => {
    if (!(group instanceof HTMLElement)) return;

    const toggleButtons = Array.from(group.querySelectorAll("[data-service-toggle]")).filter(
      (button) => button instanceof HTMLButtonElement
    );
    const stage = group.querySelector("[data-service-stage]");
    if (!toggleButtons.length || !(stage instanceof HTMLElement)) return;

    const panels = Array.from(stage.querySelectorAll("[data-service-panel]")).filter(
      (panel) => panel instanceof HTMLElement
    );
    const panelHideTimers = new Map();
    let stageHeightTimer = 0;
    let transitionToken = 0;
    let scrollAnimationFrame = 0;
    const smoothScrollToSectionTop = (duration = 720) => {
      const topbar = document.querySelector(".topbar");
      const headerHeight = topbar instanceof HTMLElement ? topbar.offsetHeight : 68;
      const topOffset = 12;
      const targetTop = Math.max(group.getBoundingClientRect().top + window.scrollY - headerHeight - topOffset, 0);
      const startTop = window.scrollY;
      const distance = targetTop - startTop;

      if (Math.abs(distance) < 2) return;

      if (scrollAnimationFrame) {
        window.cancelAnimationFrame(scrollAnimationFrame);
      }

      const startTime = window.performance.now();
      const easeInOutCubic = (progress) => {
        if (progress < 0.5) {
          return 4 * progress * progress * progress;
        }

        return 1 - Math.pow(-2 * progress + 2, 3) / 2;
      };

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startTop + distance * easedProgress);

        if (progress < 1) {
          scrollAnimationFrame = window.requestAnimationFrame(step);
          return;
        }

        scrollAnimationFrame = 0;
      };

      scrollAnimationFrame = window.requestAnimationFrame(step);
    };

    panels.forEach((panel) => {
      const items = Array.from(panel.querySelectorAll("li"));
      const lastIndex = Math.max(items.length - 1, 0);

      items.forEach((item, index) => {
        if (!(item instanceof HTMLElement)) return;
        item.style.setProperty("--service-item-delay", String(index));
        item.style.setProperty("--service-item-out-delay", String(lastIndex - index));
      });
    });

    const clearHideTimer = (panel) => {
      const existingTimer = panelHideTimers.get(panel);
      if (existingTimer) {
        window.clearTimeout(existingTimer);
        panelHideTimers.delete(panel);
      }
    };

    const clearStageHeightTimer = () => {
      if (stageHeightTimer) {
        window.clearTimeout(stageHeightTimer);
        stageHeightTimer = 0;
      }
    };

    const lockStageHeight = () => {
      stage.style.height = `${stage.offsetHeight}px`;
    };

    const animateStageHeight = (nextHeight, onComplete) => {
      clearStageHeightTimer();
      stage.style.height = `${Math.max(nextHeight, 0)}px`;

      stageHeightTimer = window.setTimeout(() => {
        stageHeightTimer = 0;
        onComplete?.();
      }, 430);
    };

    const leavePanel = (panel) => {
      clearHideTimer(panel);
      panel.classList.remove("is-active");
      panel.classList.add("is-leaving");

      const itemCount = panel.querySelectorAll("li").length;
      const hideDelay = Math.max(240, (Math.max(itemCount - 1, 0) * 55) + 300);

      const timer = window.setTimeout(() => {
        panel.classList.remove("is-leaving");
        panel.hidden = true;
        panelHideTimers.delete(panel);
      }, hideDelay);

      panelHideTimers.set(panel, timer);
      return hideDelay;
    };

    const closeStage = (panel) => {
      clearHideTimer(panel);
      clearStageHeightTimer();
      lockStageHeight();
      panel.classList.remove("is-active", "is-leaving");
      stage.classList.remove("is-active");
      stage.classList.add("is-closing");

      window.requestAnimationFrame(() => {
        animateStageHeight(0, () => {
          panel.hidden = true;
          stage.classList.remove("is-closing");
          stage.hidden = true;
          stage.setAttribute("aria-hidden", "true");
          stage.style.height = "";
          panelHideTimers.delete(panel);
        });
      });
      return 430;
    };

    const setExpandedState = (activeKey) => {
      transitionToken += 1;
      const currentToken = transitionToken;
      const currentPanel = panels.find(
        (panel) => !panel.hidden || panel.classList.contains("is-active") || panel.classList.contains("is-leaving")
      );

      toggleButtons.forEach((toggleButton) => {
        const isActive = toggleButton.dataset.serviceKey === activeKey;
        toggleButton.setAttribute("aria-expanded", String(isActive));
        toggleButton.closest(".content-card")?.classList.toggle("is-expanded", isActive);
      });

      const enterNextPanel = () => {
        if (currentToken !== transitionToken) return;
        const isOpeningFromClosedState = !currentPanel;

        stage.hidden = !activeKey;
        stage.setAttribute("aria-hidden", String(!activeKey));
        stage.classList.remove("is-closing");

        panels.forEach((panel) => {
          const isTarget = panel.dataset.servicePanel === activeKey;
          clearHideTimer(panel);

          if (!isTarget) {
            panel.classList.remove("is-active", "is-leaving");
            panel.hidden = true;
            return;
          }

          panel.hidden = false;
          panel.classList.remove("is-leaving");

          window.requestAnimationFrame(() => {
            if (currentToken !== transitionToken) return;
            panel.classList.add("is-active");

            if (isOpeningFromClosedState) {
              stage.style.height = "0px";
              animateStageHeight(stage.scrollHeight, () => {
                if (currentToken !== transitionToken) return;
                stage.style.height = "";
              });
              return;
            }

            stage.style.height = "";
          });
        });

        stage.classList.toggle("is-active", Boolean(activeKey));
      };

      if (currentPanel && currentPanel.dataset.servicePanel !== activeKey) {
        if (!activeKey) {
          closeStage(currentPanel);
          return;
        }

        const leaveDelay = leavePanel(currentPanel);
        window.setTimeout(enterNextPanel, leaveDelay);
        return;
      }

      enterNextPanel();
    };

    setExpandedState("");

    toggleButtons.forEach((toggleButton) => {
      toggleButton.addEventListener("click", () => {
        const serviceKey = toggleButton.dataset.serviceKey || "";
        const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
        const nextKey = isExpanded ? "" : serviceKey;
        const wasExpanded = toggleButtons.some((button) => button.getAttribute("aria-expanded") === "true");
        
        setExpandedState(nextKey);

        const isOpening = !wasExpanded && Boolean(nextKey);
        const isClosing = wasExpanded && !nextKey;

        if (isOpening || isClosing) {
          window.requestAnimationFrame(() => {
            smoothScrollToSectionTop(720);
          });
        }
      });
    });
  });
}

function bindServiceHeroRoles() {
  const stage = document.querySelector("[data-service-hero-stage]");
  if (!(stage instanceof HTMLElement)) return;

  const focusMap = [
    { toggleKey: "project-based", focusClass: "is-project-focus" },
    { toggleKey: "ongoing-support", focusClass: "is-part-time-focus" },
    { toggleKey: "full-system", focusClass: "is-full-time-focus" },
  ];

  const clearFocusClasses = () => {
    stage.classList.remove("is-project-focus", "is-part-time-focus", "is-full-time-focus");
  };

  focusMap.forEach(({ toggleKey, focusClass }) => {
    const toggleButton = document.querySelector(`[data-service-toggle][data-service-key="${toggleKey}"]`);
    if (!(toggleButton instanceof HTMLButtonElement)) return;

    const setFocused = (isFocused) => {
      clearFocusClasses();
      if (isFocused) {
        stage.classList.add(focusClass);
      }
    };

    toggleButton.addEventListener("mouseenter", () => {
      setFocused(true);
    });

    toggleButton.addEventListener("mouseleave", () => {
      setFocused(false);
    });

    toggleButton.addEventListener("focus", () => {
      setFocused(true);
    });

    toggleButton.addEventListener("blur", () => {
      setFocused(false);
    });
  });
}

function shouldHandleLink(link) {
  const href = link.getAttribute("href");

  if (!href) return false;
  if (link.target && link.target !== "_self") return false;
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) return false;

  return href.endsWith(".html") || href === "index.html";
}

document.addEventListener("click", (event) => {
  const link = event.target instanceof Element ? event.target.closest(internalLinkSelector) : null;

  if (!(link instanceof HTMLAnchorElement) || !shouldHandleLink(link)) {
    return;
  }

  const nextHref = link.getAttribute("href");
  if (!nextHref) {
    return;
  }

  const currentPage = normalizePageName(window.location.pathname);
  const nextPage = normalizePageName(nextHref);

  if (currentPage === nextPage) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const isSharedToShared = sharedVisualPages.has(currentPage) && sharedVisualPages.has(nextPage);

  if (isSharedToShared) {
    document.body.classList.add("preserve-shared-visual-outro");
    window.sessionStorage.setItem("preserve-shared-visual-intro", "1");
  } else {
    window.sessionStorage.removeItem("preserve-shared-visual-intro");
  }

  event.preventDefault();
  document.body.classList.add("is-exiting");

  window.setTimeout(() => {
    window.location.href = nextHref;
  }, 320);
});


document.addEventListener("DOMContentLoaded", () => {
  renderSiteHeader();
  injectNetworkVisuals();
  bindCopyEmail();
  bindServiceToggles();
  bindServiceHeroRoles();


  if (isSharedVisualPage(window.location.pathname)) {
    const shouldPreserveIntro = window.sessionStorage.getItem("preserve-shared-visual-intro") === "1";

    if (shouldPreserveIntro) {
      document.body.classList.add("preserve-shared-visual-intro");
      window.sessionStorage.removeItem("preserve-shared-visual-intro");
    }
  }
});
