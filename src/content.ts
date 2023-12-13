window.addEventListener("message", (event) => {
  const message = event.data as Record<string, unknown>
  if (message?.source === "yorkie-devtools-document") {
    console.log("content script relay message", message)
    // Relay messages from the yorkie document to the panel
    chrome.runtime.sendMessage(message)
  }
})
