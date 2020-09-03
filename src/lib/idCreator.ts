let id: number = parseInt(window.localStorage.getItem("_idMax") || "0") || 0;
function idCreator() {
  id++;
  return id;
}

export default idCreator;
