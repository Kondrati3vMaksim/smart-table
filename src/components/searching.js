export function initSearching(searchField) {
  // @todo: #5.1 — настроить компаратор
  return (query, state, action) => {
    return state[searchField]
      ? Object.assign({}, query, {
          search: state[searchField],
        })
      : query;
  };

  // @todo: #5.2 — применить компаратор
}
