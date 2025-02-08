document.querySelector(".scrape-btn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab) {
      const url = currentTab.url;
      const truncatedUrl = url.length > 35 ? url.substring(0, 35) + "..." : url;
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = url;
      link.textContent = truncatedUrl;
      link.target = "_blank";
      listItem.appendChild(link);
      const referenceLinks = document.getElementById("reference-links");
      referenceLinks.insertBefore(listItem, referenceLinks.firstChild);
    } else {
      console.error("No active tab found");
    }
  });
});
