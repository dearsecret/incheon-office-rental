function getUsedColumnIndexes(rows) {
    const used = new Set();
    rows.forEach(row => row.c.forEach((cell, i) => {
      if (cell?.v) used.add(i);
    }));
    return [...used].sort((a, b) => a - b);
  }
  
function parseRowsToLists(data) {
    const rows = data.table.rows;
    const cols = data.table.cols;
    const indexes = getUsedColumnIndexes(rows);
  
    const header = indexes.map(i => cols[i]?.label ?? "");
    const body = rows.map(row => indexes.map(i => row.c[i]?.v ?? ""));
    return [header, ...body];
  }
  
function renderTable(data) {
    const table = document.createElement("table");
    table.className = "sheet-table";
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
  
    data.forEach((row, i) => {
      const tr = document.createElement("tr");
      row.forEach(cell => {
        const el = document.createElement(i === 0 ? "th" : "td");
        el.textContent = cell;
        tr.appendChild(el);
      });
      (i === 0 ? thead : tbody).appendChild(tr);
    });
  
    table.append(thead, tbody);
    document.getElementById("sheet-table-wrapper").appendChild(table);
  }
  
fetch(sheetUrl)
    .then(res => res.text())
    .then(txt => {
      const match = txt.match(/setResponse\(([\s\S]+?)\);/);
      if (!match) throw new Error("시트 로딩 실패");
      const json = JSON.parse(match[1]);
      const parsed = parseRowsToLists(json);
      renderTable(parsed);
    })
    .catch(console.error);