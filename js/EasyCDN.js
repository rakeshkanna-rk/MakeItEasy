function EasyCDN(jsonPath) {
  fetch(jsonPath)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to fetch ${jsonPath}`);
      return response.json();
    })
    .then(({ css = [], js = [] }) => {
      css.forEach(href => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
        console.log(`Loaded CSS: ${href}`);
      });

      js.forEach(src => {
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        document.body.appendChild(script);
        console.log(`Loaded JS: ${src}`);
      });
    })
    .catch(error => console.error("Error loading assets:", error));
}
