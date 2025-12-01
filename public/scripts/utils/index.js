const $ = (selector) => {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.log(error)
  }
};

/**
 * Sets up a filterable dropdown for the given input element.
 * @param {HTMLInputElement} input - The input element to attach the dropdown to.
 * @param {HTMLDialogElement} dialog - The ID of the dialog element containing the dropdown buttons.
 * @param {string} containerClass - The class name of the container holding the dropdown buttons.
 * @param {string} dataId - The data attribute name used to store the ID of the selected item.
 */
const setupFilterDropdown = (input, dialog, containerClass, dataId) => {
  const buttonsContainer = $(`div.${containerClass}`);
  const buttons = document.querySelectorAll(`.${containerClass} > button`);
  const addButton = input.nextElementSibling;

  addButton.addEventListener('click', () => {
    dialog.showModal();
  });

  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close();
  });

  input.addEventListener('focus', () => {
    buttonsContainer.style.display = 'block';
  });

  input.addEventListener('blur', () => {
    buttonsContainer.style.display = 'none';

    const id = input.dataset[dataId];
    if (!id) {
      input.value = '';
    } else if (id) {
      const selectedButton = [...buttons].find(btn => btn.dataset[dataId] === id);
      input.value = selectedButton.textContent;
    }
  });

  input.addEventListener('input', () => {
    const items = [...buttons].map(btn => ({
      id: btn.getAttribute(`data-${dataId}`),
      title: btn.textContent,
    }));
    const query = input.value.toLowerCase();
    const filteredItems = items.filter(item => {
      return item.title.toLowerCase().includes(query);
    });
    buttonsContainer.replaceChildren(
      ...filteredItems.map(item => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = item.title;
        button.dataset[dataId] = item.id;
        button.addEventListener('mousedown', () => {
          input.value = button.textContent;
          input.dataset[dataId] = button.dataset[dataId];
        });
        return button;
      })
    );
  });

  buttons.forEach(btn => {
    btn.addEventListener('mousedown', () => {
      input.value = btn.textContent;
      input.dataset[dataId] = btn.dataset[dataId];
    });
  });
}
  
export { $, setupFilterDropdown }