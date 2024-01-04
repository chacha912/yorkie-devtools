import type { FullSDKToPanelMessage } from "./protocol"

window.addEventListener("message", (event) => {
  const message = event.data as Record<string, unknown>
  if (message?.source === "yorkie-devtools-sdk") {
    console.log("💌 msg from sdk", message)
    // Relay messages from the yorkie sdk to the panel
    chrome.runtime.sendMessage(message as FullSDKToPanelMessage)
  }
})
