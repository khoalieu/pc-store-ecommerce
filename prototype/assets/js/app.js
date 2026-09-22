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

const orderRows = [...document.querySelectorAll("#orderBody tr")];

if (orderRows.length > 0) {

    const orderTabs = [...document.querySelectorAll(".order-tab")];
    const orderSearch = document.getElementById("orderSearch");
    const shopFilter = document.getElementById("shopFilter");

    const resultCount = document.getElementById("resultCount");
    const totalRows = document.getElementById("totalRows");

    const rangeStart = document.getElementById("rangeStart");
    const rangeEnd = document.getElementById("rangeEnd");

    const selectAllOrders = document.getElementById("selectAll");

    const pageButtons = [
        ...document.querySelectorAll(".order-page-btn")
    ];

    let currentOrderStatus = "all";
    let currentOrderPage = 1;

    const orderPageSize = 8;

    const updateOrderTable = () => {

        const query = orderSearch
            ? orderSearch.value.trim().toLowerCase()
            : "";

        const selectedShop = shopFilter
            ? shopFilter.value
            : "";

        const matchedRows = orderRows.filter((row) => {

            const statusOk =
                currentOrderStatus === "all" ||
                row.dataset.status === currentOrderStatus;

            const shopOk =
                !selectedShop ||
                row.dataset.shop === selectedShop;

            const textOk =
                !query ||
                row.textContent.toLowerCase().includes(query);

            return statusOk && shopOk && textOk;
        });

        const totalPages = Math.max(
            1,
            Math.ceil(matchedRows.length / orderPageSize)
        );

        currentOrderPage = Math.min(
            currentOrderPage,
            totalPages
        );

        const start =
            (currentOrderPage - 1) * orderPageSize;

        const visibleRows = new Set(
            matchedRows.slice(
                start,
                start + orderPageSize
            )
        );

        orderRows.forEach((row) => {
            row.hidden = !visibleRows.has(row);
        });

        if (resultCount) {
            resultCount.textContent = matchedRows.length;
        }

        if (totalRows) {
            totalRows.textContent = matchedRows.length;
        }

        if (rangeStart) {
            rangeStart.textContent =
                matchedRows.length > 0
                    ? start + 1
                    : 0;
        }

        if (rangeEnd) {
            rangeEnd.textContent =
                Math.min(
                    start + orderPageSize,
                    matchedRows.length
                );
        }

        const previousButton =
            document.getElementById("prevPage");

        const nextButton =
            document.getElementById("nextPage");


        if (previousButton) {
            previousButton.disabled =
                currentOrderPage === 1;
        }

        if (nextButton) {
            nextButton.disabled =
                currentOrderPage === totalPages;
        }

        pageButtons.forEach((button) => {

            if (
                button.id === "prevPage" ||
                button.id === "nextPage"
            ) {
                return;
            }

            const pageNumber =
                Number(button.textContent);

            button.classList.toggle(
                "is-active",
                pageNumber === currentOrderPage
            );

            button.hidden =
                pageNumber > totalPages;
        });

        const visibleRowList = [...visibleRows];

        const checkedRows = visibleRowList.filter((row) => {
            const checkbox =
                row.querySelector(".row-check");

            return checkbox && checkbox.checked;
        });


        if (selectAllOrders) {

            selectAllOrders.checked =
                visibleRowList.length > 0 &&
                checkedRows.length === visibleRowList.length;

            selectAllOrders.indeterminate =
                checkedRows.length > 0 &&
                checkedRows.length < visibleRowList.length;
        }
    };

    orderTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            orderTabs.forEach((item) => {
                item.classList.remove("is-active");
            });

            tab.classList.add("is-active");

            currentOrderStatus =
                tab.dataset.status;

            currentOrderPage = 1;

            updateOrderTable();
        });
    });

    if (orderSearch) {
        orderSearch.addEventListener("input", () => {
            currentOrderPage = 1;
            updateOrderTable();
        });
    }

    if (shopFilter) {
        shopFilter.addEventListener("change", () => {
            currentOrderPage = 1;
            updateOrderTable();
        });
    }

    if (selectAllOrders) {
        selectAllOrders.addEventListener("change", () => {
            orderRows
                .filter((row) => !row.hidden)
                .forEach((row) => {
                    const checkbox =
                        row.querySelector(".row-check");
                    if (checkbox) {
                        checkbox.checked =
                            selectAllOrders.checked;
                    }
                });
        });
    }

    document
        .querySelectorAll(".row-check")
        .forEach((checkbox) => {
            checkbox.addEventListener(
                "change",
                updateOrderTable
            );
        });

    const previousButton =
        document.getElementById("prevPage");

    if (previousButton) {

        previousButton.addEventListener("click", () => {
            if (currentOrderPage > 1) {
                currentOrderPage--;
                updateOrderTable();
            }
        });
    }

    const nextButton = document.getElementById("nextPage");

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            currentOrderPage++;
            updateOrderTable();
        });
    }

    pageButtons
        .filter((button) =>
            button.id !== "prevPage" &&
            button.id !== "nextPage"
        )
        .forEach((button) => {

            button.addEventListener("click", () => {
                currentOrderPage = Number(button.textContent);
                updateOrderTable();
            });
        });

    updateOrderTable();
}

const transactionRows = [...document.querySelectorAll("#transactionBody tr")];

if (transactionRows.length > 0) {
  const transactionTabs = [...document.querySelectorAll(".transaction-tab")];
  const transactionSearch = document.getElementById("transactionSearch");
  const paymentMethodFilter = document.getElementById("paymentMethodFilter");
  const transactionResultCount = document.getElementById("transactionResultCount");
  const transactionTotalRows = document.getElementById("transactionTotalRows");
  const transactionRangeStart = document.getElementById("transactionRangeStart");
  const transactionRangeEnd = document.getElementById("transactionRangeEnd");
  const selectAllTransactions = document.getElementById("selectAllTransactions");
  const transactionPageButtons = [...document.querySelectorAll(".transaction-page-btn")];
  const transactionPrevPage = document.getElementById("transactionPrevPage");
  const transactionNextPage = document.getElementById("transactionNextPage");

  let currentTransactionStatus = "all";
  let currentTransactionPage = 1;
  const transactionPageSize = 8;

  const updateTransactionTable = () => {
    const query = transactionSearch ? transactionSearch.value.trim().toLowerCase() : "";
    const selectedMethod = paymentMethodFilter ? paymentMethodFilter.value : "";

    const matchedRows = transactionRows.filter((row) => {
      const statusOk = currentTransactionStatus === "all" || row.dataset.status === currentTransactionStatus;
      const methodOk = !selectedMethod || row.dataset.method === selectedMethod;
      const textOk = !query || row.textContent.toLowerCase().includes(query);
      return statusOk && methodOk && textOk;
    });

    const totalPages = Math.max(1, Math.ceil(matchedRows.length / transactionPageSize));
    currentTransactionPage = Math.min(currentTransactionPage, totalPages);

    const start = (currentTransactionPage - 1) * transactionPageSize;
    const visibleRows = new Set(matchedRows.slice(start, start + transactionPageSize));

    transactionRows.forEach((row) => {
      row.hidden = !visibleRows.has(row);
    });

    if (transactionResultCount) transactionResultCount.textContent = matchedRows.length;
    if (transactionTotalRows) transactionTotalRows.textContent = matchedRows.length;
    if (transactionRangeStart) transactionRangeStart.textContent = matchedRows.length ? start + 1 : 0;
    if (transactionRangeEnd) transactionRangeEnd.textContent = Math.min(start + transactionPageSize, matchedRows.length);

    if (transactionPrevPage) transactionPrevPage.disabled = currentTransactionPage === 1;
    if (transactionNextPage) transactionNextPage.disabled = currentTransactionPage === totalPages;

    transactionPageButtons.forEach((button) => {
      if (button.id === "transactionPrevPage" || button.id === "transactionNextPage") return;
      const pageNumber = Number(button.textContent);
      button.classList.toggle("is-active", pageNumber === currentTransactionPage);
      button.hidden = pageNumber > totalPages;
    });

    const visibleRowList = [...visibleRows];
    const checkedRows = visibleRowList.filter((row) => row.querySelector(".transaction-row-check")?.checked);

    if (selectAllTransactions) {
      selectAllTransactions.checked = visibleRowList.length > 0 && checkedRows.length === visibleRowList.length;
      selectAllTransactions.indeterminate = checkedRows.length > 0 && checkedRows.length < visibleRowList.length;
    }
  };

  transactionTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      transactionTabs.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });

      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      currentTransactionStatus = tab.dataset.transactionStatus || "all";
      currentTransactionPage = 1;
      updateTransactionTable();
    });
  });

  transactionSearch?.addEventListener("input", () => {
    currentTransactionPage = 1;
    updateTransactionTable();
  });

  paymentMethodFilter?.addEventListener("change", () => {
    currentTransactionPage = 1;
    updateTransactionTable();
  });

  selectAllTransactions?.addEventListener("change", () => {
    transactionRows.filter((row) => !row.hidden).forEach((row) => {
      const checkbox = row.querySelector(".transaction-row-check");
      if (checkbox) checkbox.checked = selectAllTransactions.checked;
    });
  });

  document.querySelectorAll(".transaction-row-check").forEach((checkbox) => {
    checkbox.addEventListener("change", updateTransactionTable);
  });

  transactionPrevPage?.addEventListener("click", () => {
    if (currentTransactionPage > 1) {
      currentTransactionPage--;
      updateTransactionTable();
    }
  });

  transactionNextPage?.addEventListener("click", () => {
    currentTransactionPage++;
    updateTransactionTable();
  });

  transactionPageButtons
    .filter((button) => button.id !== "transactionPrevPage" && button.id !== "transactionNextPage")
    .forEach((button) => {
      button.addEventListener("click", () => {
        currentTransactionPage = Number(button.textContent);
        updateTransactionTable();
      });
    });

  updateTransactionTable();
}

const returnRows = [...document.querySelectorAll("#returnBody tr")];

if (returnRows.length > 0) {
  const returnTabs = [...document.querySelectorAll(".return-tab")];
  const returnSearch = document.getElementById("returnSearch");
  const returnShopFilter = document.getElementById("returnShopFilter");
  const returnResultCount = document.getElementById("returnResultCount");
  const returnTotalRows = document.getElementById("returnTotalRows");
  const returnRangeStart = document.getElementById("returnRangeStart");
  const returnRangeEnd = document.getElementById("returnRangeEnd");
  const selectAllReturns = document.getElementById("selectAllReturns");
  const returnPageButtons = [...document.querySelectorAll(".return-page-btn")];
  const returnPrevPage = document.getElementById("returnPrevPage");
  const returnNextPage = document.getElementById("returnNextPage");

  let currentReturnStatus = "all";
  let currentReturnPage = 1;
  const returnPageSize = 8;

  const updateReturnTable = () => {
    const query = returnSearch ? returnSearch.value.trim().toLowerCase() : "";
    const selectedShop = returnShopFilter ? returnShopFilter.value : "";

    const matchedRows = returnRows.filter((row) => {
      const statusOk = currentReturnStatus === "all" || row.dataset.status === currentReturnStatus;
      const shopOk = !selectedShop || row.dataset.shop === selectedShop;
      const textOk = !query || row.textContent.toLowerCase().includes(query);
      return statusOk && shopOk && textOk;
    });

    const totalPages = Math.max(1, Math.ceil(matchedRows.length / returnPageSize));
    currentReturnPage = Math.min(currentReturnPage, totalPages);

    const start = (currentReturnPage - 1) * returnPageSize;
    const visibleRows = new Set(matchedRows.slice(start, start + returnPageSize));

    returnRows.forEach((row) => {
      row.hidden = !visibleRows.has(row);
    });

    if (returnResultCount) returnResultCount.textContent = matchedRows.length;
    if (returnTotalRows) returnTotalRows.textContent = matchedRows.length;
    if (returnRangeStart) returnRangeStart.textContent = matchedRows.length ? start + 1 : 0;
    if (returnRangeEnd) returnRangeEnd.textContent = Math.min(start + returnPageSize, matchedRows.length);

    if (returnPrevPage) returnPrevPage.disabled = currentReturnPage === 1;
    if (returnNextPage) returnNextPage.disabled = currentReturnPage === totalPages;

    returnPageButtons.forEach((button) => {
      if (button.id === "returnPrevPage" || button.id === "returnNextPage") return;
      const pageNumber = Number(button.textContent);
      button.classList.toggle("is-active", pageNumber === currentReturnPage);
      button.hidden = pageNumber > totalPages;
    });

    const visibleRowList = [...visibleRows];
    const checkedRows = visibleRowList.filter((row) => row.querySelector(".return-row-check")?.checked);

    if (selectAllReturns) {
      selectAllReturns.checked = visibleRowList.length > 0 && checkedRows.length === visibleRowList.length;
      selectAllReturns.indeterminate = checkedRows.length > 0 && checkedRows.length < visibleRowList.length;
    }
  };

  returnTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      returnTabs.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });

      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      currentReturnStatus = tab.dataset.returnStatus || "all";
      currentReturnPage = 1;
      updateReturnTable();
    });
  });

  returnSearch?.addEventListener("input", () => {
    currentReturnPage = 1;
    updateReturnTable();
  });

  returnShopFilter?.addEventListener("change", () => {
    currentReturnPage = 1;
    updateReturnTable();
  });

  selectAllReturns?.addEventListener("change", () => {
    returnRows.filter((row) => !row.hidden).forEach((row) => {
      const checkbox = row.querySelector(".return-row-check");
      if (checkbox) checkbox.checked = selectAllReturns.checked;
    });
  });

  document.querySelectorAll(".return-row-check").forEach((checkbox) => {
    checkbox.addEventListener("change", updateReturnTable);
  });

  returnPrevPage?.addEventListener("click", () => {
    if (currentReturnPage > 1) {
      currentReturnPage--;
      updateReturnTable();
    }
  });

  returnNextPage?.addEventListener("click", () => {
    currentReturnPage++;
    updateReturnTable();
  });

  returnPageButtons
    .filter((button) => button.id !== "returnPrevPage" && button.id !== "returnNextPage")
    .forEach((button) => {
      button.addEventListener("click", () => {
        currentReturnPage = Number(button.textContent);
        updateReturnTable();
      });
    });

  updateReturnTable();
}
