function EasyCDN(jsonPath, attachToHead = false, callback = null) {
  fetch(jsonPath)
    .then((res) => res.json())
    .then((data) => {
      let totalFiles = (data.css?.length || 0) + (data.js?.length || 0);
      let loadedFiles = 0;

      function checkAllLoaded(fileUrl) {
        console.log("Loaded: " + fileUrl);
        loadedFiles++;
        if (loadedFiles === totalFiles && typeof callback === "function") {
          callback();
        }
      }

      if (data.css) {
        data.css.forEach((href) => {
          let link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = href;
          link.onload = () => checkAllLoaded(href);
          document[attachToHead ? "head" : "body"].appendChild(link);
        });
      }

      if (data.js) {
        data.js.forEach((src) => {
          let script = document.createElement("script");
          script.src = src;
          script.onload = () => checkAllLoaded(src);
          document[attachToHead ? "head" : "body"].appendChild(script);
        });
      }
    })
    .catch((err) => console.error("Failed to load EasyCDN:", err));
}
