async function loadGitHubImages(username, repo, folderPath, containerId) {
    const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${folderPath}`;
    const container = document.getElementById(containerId);
  
    if (!container) return;
  
    try {
      const response = await fetch(apiUrl);
      const files = await response.json();
  
      files.forEach(file => {
        if (file.type === 'file' && /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(file.name)) {
          const img = document.createElement('img');
          img.src = file.download_url;
          img.alt = file.name;
          img.style.width = '100%';
          img.style.padding = '0 16px';
          img.style.marginBottom = '16px';
          img.style.objectFit = 'contain';
          img.style.boxSizing = 'border-box';
          container.appendChild(img);
        }
      });
  
      if (container.children.length === 0) {
        container.textContent = '이미지를 찾을 수 없습니다.';
      }
    } catch (e) {
      console.error("GitHub 이미지 불러오기 실패:", e);
    }
  }
  
loadGitHubImages('dearsecret', 'incheon-office-rental', 'images', 'github-image-gallery');