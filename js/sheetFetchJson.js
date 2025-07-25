export async function fetchGoogleSheetJson(sheetUrl) {
  try {
    const idMatch = sheetUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!idMatch) throw new Error('Invalid spreadsheet URL: cannot find ID');
    const spreadsheetId = idMatch[1];
    const gidMatch = sheetUrl.match(/[?&]gid=(\d+)/);
    const gid = gidMatch ? gidMatch[1] : '0';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error('Failed to fetch CSV data');
    const csvText = await response.text();
    let rows = csvText.trim().split(/\r?\n/).map(row => row.split(','));
    while (rows.length && rows[0].every(cell => cell.trim() === '')) {
      rows.shift();
    }
    if (rows.length === 0) return [];
    let firstNonEmptyColIndex = 0;
    const colCount = rows[0].length;
    for (let col = 0; col < colCount; col++) {
      const isEmptyCol = rows.every(row => {
        return (row[col] || '').trim() === '';
      });

      if (isEmptyCol) {
        firstNonEmptyColIndex++;
      } else {
        break;
      }
    }
    if (firstNonEmptyColIndex > 0) {
      rows = rows.map(row => row.slice(firstNonEmptyColIndex));
    }
    return rows; 
  } catch (error) {
    console.error(error);
    return null;
  }
}


function isGoogleDriveLink(url) {
  return /https:\/\/drive\.google\.com\/(file\/d\/|open\?id=)/.test(url);
}

function convertDriveLinkToDirectUrl(url) {
  const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  const fileId = idMatch ? idMatch[1] : null;
  if (!fileId) return null;
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

// 배열 행 데이터 형태에 맞게 수정
function convertDriveLinksInAllColumns(data) {
  return data.map(row => 
    row.map(cell => {
      if (cell && isGoogleDriveLink(cell)) {
        const directUrl = convertDriveLinkToDirectUrl(cell);
        return directUrl || cell;
      }
      return cell;
    })
  );
}

export async function fetchAndConvertGoogleSheet(sheetUrl) {
  const data = await fetchGoogleSheetJson(sheetUrl);
  if (!data) return null;
  return convertDriveLinksInAllColumns(data);
}

export async function renderImagesFromSheet(sheetUrl) {
  const loading = document.getElementById('loading');
  const container = document.getElementById('image-container');

  loading.style.display = 'block';
  container.style.display = 'none';
  container.innerHTML = ''; // 이전 이미지 제거

  const rawData = await fetchAndConvertGoogleSheet(sheetUrl);
  if (!rawData) {
    loading.textContent = '데이터를 불러오지 못했습니다.';
    return;
  }

  // 배열 형태이므로 각 행의 각 셀을 순회
  const safeImages = rawData
    .flat()
    .filter(val => typeof val === 'string' && val.startsWith('https://drive.google.com/uc?export=view&id='));

  if (safeImages.length === 0) {
    loading.textContent = '표시할 이미지가 없습니다.';
    return;
  }

  safeImages.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Image';
    img.style.width = '200px';
    img.style.margin = '10px';
    img.loading = 'lazy';
    img.onerror = () => {
      img.style.display = 'none';
    };
    container.appendChild(img);
  });

  loading.style.display = 'none';
  container.style.display = 'flex';
}

