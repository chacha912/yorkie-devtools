import { useEffect } from "react"
import { createRoot } from "react-dom/client"

const Panel = () => {
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      console.log("panel receive message ✅", message)
    })
  }, [])

  return (
    <>
      <h2>Yorkie Panel</h2>
    </>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<Panel />)
