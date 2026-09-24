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

// User dropdown toggle
document.addEventListener('click', function (e) {
    const trigger = e.target.closest('.user-dropdown > a');

    if (trigger) {
        e.preventDefault();

        const dropdown = trigger.closest('.user-dropdown');

        if (!dropdown) return;

        document.querySelectorAll('.user-dropdown.open').forEach(item => {
            if (item !== dropdown) {
                item.classList.remove('open');
            }
        });

        dropdown.classList.toggle('open');
        return;
    }

    if (!e.target.closest('.user-dropdown')) {
        document.querySelectorAll('.user-dropdown.open')
            .forEach(item => item.classList.remove('open'));
    }
});

//add sidebar admin
(async function initSharedComponent() {
    const sidebarHost = document.querySelector('[data-sidebar-host]');

    const currentFile =
        (window.location.pathname.split('/').pop() || '').toLowerCase();

    const adminBasePath =
        window.location.pathname.split('/admin/')[0] || '';

    const sharedSidebarUrl =
        `${adminBasePath}/admin/sidebar.html`;

    try {
        const res = await fetch(sharedSidebarUrl, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(
                `Không tải được sidebar.html (HTTP ${res.status})`
            );
        }

        const buffer = await res.arrayBuffer();
        const html = new TextDecoder('utf-8').decode(buffer);

        const doc = new DOMParser().parseFromString(
            html,
            'text/html'
        );

        const serviceBar = doc.querySelector('.service-bar');
        const topbar = doc.querySelector('.topbar');
        const headerHost = document.getElementById('header-host');

        if (headerHost && serviceBar && topbar) {
            headerHost.replaceWith(serviceBar, topbar);
        }

        const sidebar = doc.querySelector('.sidebar');

        if (sidebarHost && sidebar) {
            sidebarHost.replaceWith(sidebar);
        }

        // Tất cả link trong component dùng chung phải được tính tương đối
        // với admin/sidebar.html, không phụ thuộc trang đang mở nằm trong
        // admin/ecosystem hay các thư mục con khác.
        const sharedComponents = [
            serviceBar,
            topbar,
            sidebar
        ].filter(Boolean);

        const sharedLinks = [
            ...new Set(
                sharedComponents.flatMap((component) => [
                    ...component.querySelectorAll('a')
                ])
            )
        ];

        sharedLinks.forEach((link) => {

            link.removeAttribute('aria-current');

            const rawHref =
                link.getAttribute('href') || '';

            if (
                rawHref &&
                !rawHref.startsWith('#') &&
                !rawHref.startsWith('http://') &&
                !rawHref.startsWith('https://') &&
                !rawHref.startsWith('mailto:') &&
                !rawHref.startsWith('tel:')
            ) {
                const resolvedLink = new URL(
                    rawHref,
                    new URL(
                        sharedSidebarUrl,
                        window.location.origin
                    )
                );

                link.setAttribute(
                    'href',
                    `${resolvedLink.pathname}${resolvedLink.search}${resolvedLink.hash}`
                );
            }

            const hrefPath = (link.getAttribute('href') || '')
                .split('#')[0]
                .split('?')[0]
                .toLowerCase();

            const href = hrefPath
                ? hrefPath.split('/').pop()
                : '';

            if (
                href &&
                href !== '#' &&
                href === currentFile
            ) {
                link.setAttribute(
                    'aria-current',
                    'page'
                );
            }
        });

        document
            .querySelectorAll('[data-sidebar-toggle]')
            .forEach((button) => {

                if (button.dataset.sidebarBound === '1') {
                    return;
                }

                button.dataset.sidebarBound = '1';

                button.addEventListener('click', () => {

                    const shell =
                        document.querySelector('.shell');

                    if (!shell) {
                        return;
                    }

                    const open =
                        shell.classList.toggle(
                            'is-sidebar-open'
                        );

                    button.setAttribute(
                        'aria-expanded',
                        String(open)
                    );
                });
            });

    } catch (err) {

        console.warn(
            '[PCMatch] Không nạp được sidebar.html',
            err
        );
    }
})();

document.addEventListener("DOMContentLoaded", function () {

    const points = document.querySelectorAll(".chart-points circle");

    const tooltip = document.getElementById("chartTooltip");
    const tooltipTime = document.getElementById("tooltipTime");
    const tooltipRevenue = document.getElementById("tooltipRevenue");
    const tooltipFee = document.getElementById("tooltipFee");

    const chartContainer = document.querySelector(".chart-container");

    if (!points.length || !tooltip || !chartContainer) {
        return;
    }

    points.forEach(point => {

        point.addEventListener("mouseenter", function () {

            tooltipTime.textContent = this.dataset.time;
            tooltipRevenue.textContent = this.dataset.revenue;
            tooltipFee.textContent = this.dataset.fee;

            tooltip.classList.add("show");

            const pointRect = this.getBoundingClientRect();
            const containerRect =
                chartContainer.getBoundingClientRect();

            const pointX =
                pointRect.left -
                containerRect.left +
                pointRect.width / 2;

            const pointY =
                pointRect.top -
                containerRect.top;

            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;

            let left = pointX - tooltipWidth / 2;
            let top = pointY - tooltipHeight - 14;

            if (left < 5) {
                left = 5;
            }

            if (left + tooltipWidth >
                chartContainer.clientWidth - 5) {

                left =
                    chartContainer.clientWidth -
                    tooltipWidth -
                    5;
            }

            if (top < 5) {
                top = pointY + 18;
            }

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        });

        point.addEventListener("mouseleave", function () {
            tooltip.classList.remove("show");
        });

    });

});
// Keyboard navigation for legacy Shop/Admin tabs. Buyer state lives in buyer.js modules.
selectAll("[role=tablist]").forEach(list => list.addEventListener("keydown", event => {
    const tabs = selectAll("[role=tab]", list);
    const index = tabs.indexOf(document.activeElement);
    if (index < 0 || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus();
    tabs[next].click();
}));
