/* Reusable admin controls: time range popover and selectable table rows. */
(() => {
    const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[char]));

    const actionIcon = (action) => {
        if (/^(Duyệt|Kích hoạt|Áp dụng)/i.test(action)) {
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        }
        if (/^(Tạm ẩn|Tạm tắt)/i.test(action)) {
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 5.2A10.8 10.8 0 0 1 12 5c6 0 9 7 9 7a16 16 0 0 1-2.1 3M6.6 6.6C4.3 8.2 3 12 3 12s3 7 9 7a9.7 9.7 0 0 0 3.4-.6" stroke-linecap="round"/></svg>`;
        }
        if (/^Xóa$/i.test(action)) {
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7M10 11v5M14 11v5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        }
        if (/^(Từ chối|Từ chối \/)/i.test(action)) {
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8.5 8.5 7 7m0-7-7 7" stroke-linecap="round"/></svg>`;
        }
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8" stroke-linecap="round"/></svg>`;
    };

    const initTimeFilters = () => {
        document.querySelectorAll(".page-actions .button--secondary").forEach((trigger) => {
            if (trigger.dataset.timeReady === "1") return;
            trigger.dataset.timeReady = "1";
            trigger.classList.add("time-filter-trigger");
            trigger.setAttribute("aria-haspopup", "dialog");
            trigger.setAttribute("aria-expanded", "false");

            const wrapper = document.createElement("div");
            wrapper.className = "time-filter";
            trigger.parentNode.insertBefore(wrapper, trigger);
            wrapper.appendChild(trigger);

            const label = trigger.querySelector("span") || trigger;
            label.setAttribute("data-time-label", "");

            const popover = document.createElement("div");
            popover.className = "reusable-popover time-popover";
            popover.setAttribute("role", "dialog");
            popover.setAttribute("aria-label", "Chọn khoảng thời gian");
            popover.innerHTML = `
                <div class="time-popover__quick" role="group" aria-label="Khoảng thời gian nhanh">
                    ${["Tất cả", "Hôm nay", "7 ngày qua", "30 ngày qua", "Tháng này", "Quý này", "Năm nay"].map((item, index) => `<button class="time-chip${index === 0 ? " is-active" : ""}" type="button" data-time-value="${escapeHtml(item)}">${escapeHtml(item)}</button>`).join("")}
                </div>
                <div class="time-popover__modes" role="group" aria-label="Đơn vị thời gian">
                    <button class="is-active" type="button" data-time-mode>Ngày</button>
                    <button type="button" data-time-mode>Tháng</button>
                    <button type="button" data-time-mode>Năm</button>
                </div>
                <label class="time-popover__field"><span>Từ ngày</span><input type="date" data-time-start></label>
                <label class="time-popover__field"><span>Đến ngày</span><input type="date" data-time-end></label>
                <button class="time-popover__apply" type="button" data-time-apply>Áp dụng khoảng</button>
            `;
            wrapper.appendChild(popover);

            const close = () => {
                wrapper.classList.remove("is-open");
                trigger.setAttribute("aria-expanded", "false");
            };
            const open = () => {
                document.querySelectorAll(".time-filter.is-open").forEach((item) => {
                    item.classList.remove("is-open");
                    item.querySelector("[data-time-label]")?.closest("button")?.setAttribute("aria-expanded", "false");
                });
                wrapper.classList.add("is-open");
                trigger.setAttribute("aria-expanded", "true");
            };

            trigger.addEventListener("click", (event) => {
                event.stopPropagation();
                wrapper.classList.contains("is-open") ? close() : open();
            });
            popover.addEventListener("click", (event) => event.stopPropagation());
            popover.querySelectorAll("[data-time-value]").forEach((button) => {
                button.addEventListener("click", () => {
                    popover.querySelectorAll("[data-time-value]").forEach((item) => item.classList.remove("is-active"));
                    button.classList.add("is-active");
                    label.textContent = button.dataset.timeValue === "Tất cả" ? "Tất cả thời gian" : button.dataset.timeValue;
                    trigger.dispatchEvent(new CustomEvent("time-filter-change", {
                        bubbles: true,
                        detail: { preset: button.dataset.timeValue }
                    }));
                    close();
                });
            });
            popover.querySelectorAll("[data-time-mode]").forEach((button) => {
                button.addEventListener("click", () => {
                    popover.querySelectorAll("[data-time-mode]").forEach((item) => item.classList.remove("is-active"));
                    button.classList.add("is-active");
                });
            });
            popover.querySelector("[data-time-apply]").addEventListener("click", () => {
                const start = popover.querySelector("[data-time-start]").value;
                const end = popover.querySelector("[data-time-end]").value;
                label.textContent = start && end ? `${start} – ${end}` : "Khoảng tùy chỉnh";
                trigger.dispatchEvent(new CustomEvent("time-filter-change", {
                    bubbles: true,
                    detail: { start, end }
                }));
                close();
            });
            wrapper._closeTimeFilter = close;
        });

        document.addEventListener("click", (event) => {
            document.querySelectorAll(".time-filter.is-open").forEach((item) => {
                if (!item.contains(event.target)) item._closeTimeFilter?.();
            });
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                document.querySelectorAll(".time-filter.is-open").forEach((item) => item._closeTimeFilter?.());
            }
        });
    };

    const initSelectableTables = () => {
        document.querySelectorAll("table[data-selectable-table]").forEach((table) => {
            if (table.dataset.selectionReady === "1") return;
            table.dataset.selectionReady = "1";

            const headCheckbox = table.querySelector("thead input[type='checkbox']");
            const rowCheckboxes = [...table.querySelectorAll("tbody input[type='checkbox']")];
            if (!headCheckbox || rowCheckboxes.length === 0) return;

            const container = table.closest("[data-selection-container]") || table.parentElement;
            const scrollWrap = table.closest(".table-scroll") || table.parentElement;
            const noun = table.dataset.selectionNoun || "bản ghi";
            const actions = (container.dataset.selectionActions || "Xử lý đã chọn").split("|").filter(Boolean);
            const bar = document.createElement("div");
            bar.className = "bulk-action-bar";
            bar.hidden = true;
            bar.innerHTML = `
                <div class="bulk-action-bar__summary"><span data-selected-count>0</span><span>${escapeHtml(noun)} đã chọn</span></div>
                <div class="bulk-action-bar__actions">
                    ${actions.map((action, index) => {
                        const isDanger = /^(Từ chối|Xóa)$/i.test(action);
                        return `<button type="button" class="bulk-action-bar__button${index === 0 ? " is-primary" : ""}${isDanger ? " is-danger" : ""}" data-bulk-action>${actionIcon(action)}<span>${escapeHtml(action)}</span></button>`;
                    }).join("")}
                </div>
                <button class="bulk-action-bar__clear" type="button" data-clear-selection aria-label="Bỏ chọn">Bỏ chọn</button>
            `;
            container.insertBefore(bar, scrollWrap);

            const count = bar.querySelector("[data-selected-count]");
            const update = () => {
                const checked = rowCheckboxes.filter((checkbox) => checkbox.checked);
                const selected = checked.length;
                count.textContent = String(selected);
                bar.hidden = selected === 0;
                headCheckbox.checked = selected > 0 && selected === rowCheckboxes.length;
                headCheckbox.indeterminate = selected > 0 && selected < rowCheckboxes.length;
                rowCheckboxes.forEach((checkbox) => checkbox.closest("tr")?.classList.toggle("is-row-selected", checkbox.checked));
                container.dispatchEvent(new CustomEvent("table-selection-change", {
                    bubbles: true,
                    detail: { selected, checkboxes: checked }
                }));
            };
            const clear = () => {
                rowCheckboxes.forEach((checkbox) => { checkbox.checked = false; });
                update();
            };

            headCheckbox.addEventListener("change", () => {
                rowCheckboxes.forEach((checkbox) => { checkbox.checked = headCheckbox.checked; });
                update();
            });
            rowCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", update));
            bar.querySelector("[data-clear-selection]").addEventListener("click", clear);
            bar.querySelectorAll("[data-bulk-action]").forEach((button) => button.addEventListener("click", () => {
                container.dispatchEvent(new CustomEvent("table-bulk-action", {
                    bubbles: true,
                    detail: { action: button.textContent.trim(), checkboxes: rowCheckboxes.filter((item) => item.checked) }
                }));
            }));
            update();
        });
    };

    const init = () => {
        initTimeFilters();
        initSelectableTables();
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
    else init();
})();
