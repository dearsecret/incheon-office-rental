async function fetchAndConvertGoogleSheet(sheetUrl) {
    const data = await fetchGoogleSheetJson(sheetUrl);
    if (!data) return null;
    return convertDriveLinksInAllColumns(data);
  }
  

async function fetchGoogleSheetJson(sheetUrl) {
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
  
      const rows = csvText.trim().split('\n').map(row => row.split(','));
      const headers = rows[0];
      const data = rows.slice(1).map(row => {
        const obj = {};
        headers.forEach((key, i) => {
          obj[key] = row[i] || '';
        });
        return obj;
      });
      return data;
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
  
function convertDriveLinksInAllColumns(data) {
    return data.map(item => {
      Object.keys(item).forEach(col => {
        const val = item[col];
        if (val && isGoogleDriveLink(val)) {
          const directUrl = convertDriveLinkToDirectUrl(val);
          if (directUrl) item[col] = directUrl;
        }
      });
      return item;
    });
  }