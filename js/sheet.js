import { fetchGoogleSheetJson} from './sheetFetchJson.js'

function renderTableFromJson(headers, data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; 

  const table = document.createElement('table');
  table.className = 'sheet-table';
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  data.forEach(row => {
    const tr = document.createElement('tr');
    headers.forEach((_, idx) => {
      const td = document.createElement('td');
      td.textContent = row[idx] || '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  container.appendChild(table);
}

async function loadSheetAndRender(sheetUrl, containerId = 'sheet-table-wrapper') {
  const rows = await fetchGoogleSheetJson(sheetUrl);
  if (!rows || rows.length < 2) {
    document.getElementById(containerId).textContent = '시트 데이터를 불러올 수 없습니다.';
    return;
  }
  const [headers, ...data] = rows;
  renderTableFromJson(headers, data, containerId);
}


loadSheetAndRender(sheetUrl);


