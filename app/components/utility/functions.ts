export function getImageMetadata(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const resolution = { width: img.width, height: img.height };

      fetch(url)
        .then(response => {
          const fileSize = response.headers.get('content-length');
          resolve({ fileSize, resolution });
        })
        .catch(error => reject(error));
    };
    img.onerror = (error) => reject(error);
    img.src = url;
  });
}