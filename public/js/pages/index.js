import { $, $$ } from "../lib/utils.js";
import errorsManager from "../partials/errors.js";

const startRename = ({ nameCell, currentEntryId }) => {
  if (nameCell.isContentEditable) return;

  const placeCaretAtEnd = (el) => {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(el);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const originalName = nameCell.textContent;

  const restablish = () => {
    nameCell.textContent = originalName;
    nameCell.contentEditable = "false";
    return;
  };

  nameCell.contentEditable = "true";
  nameCell.focus();
  placeCaretAtEnd(nameCell);

  const handleKeyDown = e => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        nameCell.blur();
        removeEventListener("keydown", handleKeyDown);
        break;
    
      case "Escape":
        restablish();
        break;
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  nameCell.addEventListener("blur", async () => {
    try {
      const newName = nameCell.textContent.trim();

      if (!newName || newName === originalName) {
        restablish();
        return;
      };

      const response = await fetch(`/entries/${currentEntryId}/rename`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newName: nameCell.textContent.trim(),
        })
      });

      console.log(await response.json()); // Debug
    } catch (error) {
      console.error(error);
    } finally {
      nameCell.contentEditable = "false";
    }
  }, { once: true });
};





const menuManager = {
  menu: $("#menu"),
  menuDelete: $("#delete", menu),
  menuEdit: $("#edit", menu),
  timer: null,

  open(x, y, entryId) {
    this.menu.dataset.currentEntryId = entryId;
    this.menuDelete.action = `/entries/${entryId}/delete`;
    const menuRect = this.menu.getBoundingClientRect();

    if (x + menuRect.width > window.innerWidth) {
      x = window.innerWidth - menuRect.width;
    }

    if (y + menuRect.height > window.innerHeight) {
      y = window.innerHeight - menuRect.height;
    }

    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
    menu.style.display = "block";
  },

  close() {
    this.menu.style.display = "none";
  },

  bindEvents() {
    menuManager.menuEdit.addEventListener("click", () => {
      const currentEntryId = menuManager.menu.dataset.currentEntryId;
      const nameCell = $(`.entry[data-entry-id="${currentEntryId}"]>${tableManager.nameCellsSelector}`);
      startRename({ nameCell, currentEntryId });
    });
  },
};





const tableManager = {
  table: $("table"),
  nameCellsSelector: "td:nth-child(2)",
  
  bindEvents() {
    this.table.addEventListener("click", e => {
      const entry = e.target.closest(".entry");
      if (!entry) return;

      if (e.target.matches(this.nameCellsSelector)) {
        menuManager.timer = setTimeout(() => {
          startRename({
            nameCell: e.target,
            currentEntryId: entry.dataset.entryId,
          });
        }, 600);
      }
    });

    this.table.addEventListener("contextmenu", e => {
      e.preventDefault();
      e.stopPropagation();
      clearTimeout(menuManager.timer);

      const entry = e.target.closest(".entry");
      if (!entry) return;
      menuManager.open(e.clientX, e.clientY, entry.dataset.entryId);
    });
  },
};





const dialogManager = {
  dialog: $("dialog"),
  showBtn: $("#showDialog"),
  closeBtns: $$(".closeDialog"),
  form: $("#createForm"),

  closeDialog() {
    this.dialog.close();
    errorsManager.errorsUl.replaceChildren();
    $("input", this.form).value = "";
  },
  
  bindEvents() {
    this.dialog.addEventListener("click", e => {
      if (e.target == this.dialog) this.closeDialog();
    });

    this.showBtn.addEventListener("click", () => this.dialog.showModal());

    this.closeBtns.forEach(closeBtn => {
      closeBtn.addEventListener("click", () => this.closeDialog());
    });

    this.form.addEventListener("submit", async e => {
      e.preventDefault();
      errorsManager.errorsUl.replaceChildren();

      const pathParts = window.location.pathname.split("/").filter(Boolean);
      const parentId = Number(pathParts[1]);

      const payload = {
        ...Object.fromEntries(new FormData(this.form).entries()),
        parentId: parentId ? parentId : null,
      };

      try {
        const res = await fetch(this.form.action, {
          method: this.form.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (res.ok && data.ok) {
          this.closeDialog();
          return window.location.reload();
        }

        data.errors.forEach(error => {
          const li = document.createElement("li");
          li.textContent = error.msg || String(error);
          errorsManager.errorsUl.appendChild(li);
        });
        
      } catch (error) {
        console.error(`An error ocurred:\n${error}`);
      }
    });
  },
};





const fileFormManager = {
  form: $("#file-form"),

  bindEvents() {
    this.form.addEventListener("submit", async e => {
      e.preventDefault();

      const pathParts = window.location.pathname.split("/").filter(Boolean);
      const parentId = Number(pathParts[1]);

      const formData = new FormData(this.form);
      if (parentId) formData.append("parentId", parentId);

      try {
        const res = await fetch(this.form.action, {
          method: this.form.method,
          body: formData
        });

        const data = await res.json();

        if (res.ok && data.ok) return window.location.reload();

        data.errors.forEach(error => console.error(error.msg || String(error)));
      } catch (error) {
        
      }
    });
  },
};





const globalManager = {
  bindEvents() {
    document.addEventListener("click", e => {
      menuManager.close();
    });

    document.addEventListener("contextmenu", e => {
      menuManager.close();
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") menuManager.close();
    });

    let startX, startY;

    document.addEventListener("mousedown", e => {
      startX = e.clientX;
      startY = e.clientY;
    });

    document.addEventListener("mousemove", e => {
      if (
        Math.abs((e.clientX - startX) > 4) ||
        Math.abs((e.clientY - startY) > 4)
      ) {
        clearTimeout(menuManager.timer);
      }
    });

    document.addEventListener("DOMContentLoaded", e => {
      errorsManager.errorsUl = $("#errors");
    });
  },
}





const init = () => {
  menuManager.bindEvents();
  tableManager.bindEvents();
  dialogManager.bindEvents();
  globalManager.bindEvents();
  fileFormManager.bindEvents();
};

init();