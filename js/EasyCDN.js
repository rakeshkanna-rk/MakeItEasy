function EasyCDN(jsonPath, attachToHead = false, jsDefer = false) {
  fetch(jsonPath)
    .then((res) => res.json())
    .then((data) => {
      if (data.css) {
        data.css.forEach((href) => {
          let link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = href;
          document[attachToHead ? "head" : "body"].appendChild(link);
        });
      }

      if (data.js) {
        data.js.forEach((src) => {
          let script = document.createElement("script");
          script.src = src;
          script.defer = jsDefer; // Ensures non-blocking execution
          document[attachToHead ? "head" : "body"].appendChild(script);
        });
      }
    })
    .catch((err) => console.error("Failed to load EasyCDN:", err));
}
