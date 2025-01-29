function includeHTML(callback) {
  const elements = document.querySelectorAll('[data-include]');
  const promises = Array.from(elements).map(async (el) => {
    const file = el.getAttribute('data-include');
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Error fetching ${file}`);
      const html = await response.text();
      el.innerHTML = html;
    } catch (error) {
      console.error(`Failed to load ${file}:`, error);
    }
  });

  // Execute callback when all includes are complete
  Promise.all(promises).then(callback).catch((error) => {
    console.error("Error loading HTML fragments:", error);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  includeHTML(() => {
    console.log("All fragments loaded");
    initFooterScripts(); // This will now work
  });
});
