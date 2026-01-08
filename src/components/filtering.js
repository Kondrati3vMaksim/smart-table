export function initFiltering(elements) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  const updateIndexes = (indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      // Очищаем существующие опции (кроме первой пустой)
      const selectElement = elements[elementName];
      while (selectElement.options.length > 1) {
        selectElement.remove(1);
      }

      // Добавляем новые опции
      selectElement.append(
        ...Object.values(indexes[elementName]).map((name) => {
          const el = document.createElement("option");
          el.value = name;
          el.textContent = name;
          return el;
        })
      );
    });
  };

  const applyFiltering = (query, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === "clear") {
      const parentElement = action.parentElement;
      const inputField = parentElement.querySelector("input");
      if (inputField) {
        inputField.value = "";
        const fieldName = action.dataset.field;
        if (fieldName && state[fieldName] !== undefined) {
          state[fieldName] = "";
        }
      }
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    const filter = {};
    Object.keys(elements).forEach((key) => {
      if (elements[key] && elements[key].value) {
        if (["INPUT", "SELECT"].includes(elements[key].tagName)) {
          filter[`filter[${elements[key].name}]`] = elements[key].value;
        }
      }
    });

    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query;
  };

  return {
    updateIndexes,
    applyFiltering,
  };
}
