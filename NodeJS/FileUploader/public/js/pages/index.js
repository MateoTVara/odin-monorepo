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
  menuDownload: $("a", menu),
  timer: null,

  open(x, y, entryId, entryType) {
    this.menu.dataset.currentEntryId = entryId;
    this.menuDelete.action = `/entries/${entryId}/delete`;
    this.menuDownload.href = `/${entryType === 'file' ? 'files' : 'folders'}/${entryId}/download`;
    const menuRect = this.menu.getBoundingClientRect();

    if (x + menuRect.width > window.innerWidth) {
      x = window.innerWidth - menuRect.width;
    }

    if (y + menuRect.height > window.innerHeight) {
      y = window.innerHeight - menuRect.height;
    }

    this.menu.style.left = `${x}px`;
    this.menu.style.top = `${y}px`;
    this.menu.classList.add("opened");
  },

  close() {
    this.menu.classList.remove("opened");
  },

  bindEvents() {
    this.menuEdit.addEventListener("click", () => {
      const currentEntryId = this.menu.dataset.currentEntryId;
      const nameCell = $(`.entry[data-entry-id="${currentEntryId}"]>${tableManager.nameCellsSelector}`);
      startRename({ nameCell, currentEntryId });
    });

    this.menuDelete.addEventListener("click", async e => {
      e.preventDefault();
      const entryId = this.menu.dataset.currentEntryId;
      try {
        const response = await fetch(this.menuDelete.action, {
          method: 'POST'
        });
        const data = await response.json();

        if (data.ok) {
          const entryRow = $(`.entry[data-entry-id="${entryId}"]`);
          entryRow.remove();
          menuManager.close();
        }
      } catch (error) {
        console.error("Delete failed:", error);
      }
    });
  },
};





const tableManager = {
  table: $("#table"),
  nameCellsSelector: "span:nth-child(2)",
  
  bindEvents() {
    this.table.addEventListener("click", e => {
      const entry = e.target.closest(".entry");
      if (!entry) return;

      if (e.target.tagName === "BUTTON") {
        e.stopPropagation();
        menuManager.open(e.clientX, e.clientY, entry.dataset.entryId, entry.dataset.entryType);
        return;
      }

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
      menuManager.open(e.clientX, e.clientY, entry.dataset.entryId, entry.dataset.entryType);
    });
  },
};





const dialogManager = {
  dialog: $("dialog"),
  showBtns: $$(".show-dialog"),
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

    this.showBtns.forEach(btn => {
      btn.addEventListener("click", () => this.dialog.showModal());
    });

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
  forms: $$(".file-form"),

  bindEvents() {
    this.forms.forEach(form => {
      const fileInput = $("input[type='file']", form);
      const submitBtn = $("button[type='submit']", form);

      // Handle file selection
      fileInput.addEventListener("change", async e => {
        if (!fileInput.files.length) return;

        const pathParts = window.location.pathname.split("/").filter(Boolean);
        const parentId = Number(pathParts[1]);

        const formData = new FormData(form);
        if (parentId) formData.append("parentId", parentId);

        try {
          const res = await fetch(form.action, {
            method: form.method,
            body: formData
          });

          const data = await res.json();

          if (res.ok && data.ok) {
            fileInput.value = '';
            return window.location.reload();
          }

          data.errors.forEach(error => console.error(error.msg || String(error)));
        } catch (error) {
          console.error("Upload failed:", error);
        }
      });

      // Keep submit functionality for the main form
      form.addEventListener("submit", async e => {
        if (form.closest("#actions")) return; // Skip for actions menu forms

        e.preventDefault();

        const pathParts = window.location.pathname.split("/").filter(Boolean);
        const parentId = Number(pathParts[1]);

        const formData = new FormData(form);
        if (parentId) formData.append("parentId", parentId);

        try {
          const res = await fetch(form.action, {
            method: form.method,
            body: formData
          });

          const data = await res.json();

          if (res.ok && data.ok) {
            $("input", form).value = '';
            return window.location.reload();
          }

          data.errors.forEach(error => console.error(error.msg || String(error)));
        } catch (error) {
          console.error("Upload failed:", error);
        }
      });
    });
  },
};





const actionsManager = {
  actions: $("#actions"),
  toggleBtn: $("#actions > button"),
  actionsMenu: $(".actions-menu"),

  bindEvents() {
    this.toggleBtn.addEventListener("click", e => {
      this.actionsMenu.classList.toggle("opened");
    });
  }
};





const globalManager = {
  bindEvents() {
    document.addEventListener("click", e => {
      if (e.target.closest("#menu")) return;
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
  actionsManager.bindEvents();
};

init();