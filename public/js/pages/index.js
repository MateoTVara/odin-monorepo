import { $ } from "../lib/utils.js";

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

      const response = await fetch(`/folders/${currentEntryId}/update`, {
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

  open(x, y, folderId) {
    this.menu.dataset.currentEntryId = folderId;
    this.menuDelete.action = `/folders/${folderId}/delete`;
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

  bindMenuEvents() {
    menuManager.menuEdit.addEventListener("click", () => {
      const currentEntryId = menuManager.menu.dataset.currentEntryId;
      const nameCell = $(`.entry[data-folder-id="${currentEntryId}"]>${tableManager.nameCellsSelector}`);
      startRename({ nameCell, currentEntryId });
    });
  },
};





const tableManager = {
  table: $("table"),
  nameCellsSelector: "td:nth-child(2)",
  
  bindTableEvents() {
    this.table.addEventListener("click", e => {
      const entry = e.target.closest(".entry");
      if (!entry) return;

      if (e.target.matches(this.nameCellsSelector)) {
        menuManager.timer = setTimeout(() => {
          startRename({
            nameCell: e.target,
            currentEntryId: entry.dataset.folderId,
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
      menuManager.open(e.clientX, e.clientY, entry.dataset.folderId);
    });
  },
};





const bindGlobalEvents = () => {
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
      Math.abs(e.clientX - startX > 4) ||
      Math.abs(e.clientY - startY > 4)
    ) {
      clearTimeout(menuManager.timer);
    }
  });
};





const init = () => {
  bindGlobalEvents();
  menuManager.bindMenuEvents();
  tableManager.bindTableEvents();
};

init();