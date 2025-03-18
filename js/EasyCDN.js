function EasyCDN(jsonPath = "assets.json") {
    fetch(jsonPath)
      .then(response => response.json())
      .then(({ css = [], js = [] }) => {
        css.forEach(href => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = href;
          document.head.appendChild(link);
        });
  
        js.forEach(src => {
          const script = document.createElement("script");
          script.src = src;
          script.defer = true;
          document.body.appendChild(script);
        });
      })
      .catch(error => console.error("Error loading assets:", error));
  }
