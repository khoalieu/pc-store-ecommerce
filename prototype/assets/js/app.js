const selectAll = (selector, scope = document) => [...scope.querySelectorAll(selector)];

selectAll("[data-menu-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
        const target = document.querySelector(button.dataset.menuToggle);
        if (!target) return;
        const open = target.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(open));
    });
});

selectAll("[data-sidebar-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
        const shell = document.querySelector(".shell");
        if (!shell) return;
        const open = shell.classList.toggle("is-sidebar-open");
        button.setAttribute("aria-expanded", String(open));
    });
});

selectAll("[role='tablist']").forEach((tablist) => {
    const tabs = selectAll("[role='tab']", tablist);
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((item) => item.setAttribute("aria-selected", "false"));
            selectAll("[role='tabpanel']").forEach((panel) => {
                panel.hidden = true;
            });
            tab.setAttribute("aria-selected", "true");
            const panel = document.getElementById(tab.getAttribute("aria-controls"));
            if (panel) panel.hidden = false;
        });
    });
});

selectAll("[data-modal-open]").forEach((button) => {
    button.addEventListener("click", () => {
        const dialog = document.getElementById(button.dataset.modalOpen);
        if (dialog?.showModal) dialog.showModal();
    });
});

selectAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () => button.closest("dialog")?.close());
});

selectAll(".build-slot[data-signal]").forEach((slot) => {
    slot.addEventListener("click", () => {
        selectAll(".build-slot[data-signal]").forEach((item) => item.classList.remove("is-active"));
        slot.classList.add("is-active");
        const signal = slot.dataset.signal;
        selectAll("[data-telemetry]").forEach((card) => {
            const active = card.dataset.telemetry === signal || card.dataset.telemetry === "all";
            card.style.opacity = active ? "1" : ".58";
        });
        const live = document.querySelector("[data-live-signal]");
        if (live) live.textContent = `Đang xem tín hiệu: ${slot.dataset.label}`;
    });
});

selectAll("[data-dropdown]").forEach((button) => {
    button.addEventListener("click", () => {
        const menu = document.getElementById(button.dataset.dropdown);
        if (!menu) return;
        const open = !menu.hidden;
        menu.hidden = open;
        button.setAttribute("aria-expanded", String(!open));
    });
});

// User dropdown toggle (admin profile pages)
const userDropdownTrigger = document.querySelector('.user-dropdown > a');
const userDropdown = document.querySelector('.user-dropdown');
if (userDropdownTrigger && userDropdown) {
  userDropdownTrigger.addEventListener('click', function(e) { 
    e.preventDefault(); 
    userDropdown.classList.toggle('open'); 
  });
  document.addEventListener('click', function(e) { 
    if (!userDropdown.contains(e.target)) userDropdown.classList.remove('open'); 
  });
}

// Keyboard navigation for legacy Shop/Admin tabs. Buyer state lives in buyer.js modules.
selectAll("[role=tablist]").forEach(list => list.addEventListener("keydown", event => {
 const tabs=selectAll("[role=tab]",list);const index=tabs.indexOf(document.activeElement);
 if(index<0 || !["ArrowLeft","ArrowRight","Home","End"].includes(event.key)) return;
 event.preventDefault();const next=event.key==="Home"?0:event.key==="End"?tabs.length-1:(index+(event.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
 tabs[next].focus();tabs[next].click();
}));
