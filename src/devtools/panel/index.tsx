import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import { PresenceTree, RootTree } from "../components/Tree"

const Panel = () => {
  const [document, setDocument] = useState("Document")
  const [root, setRoot] = useState([
    { id: "0:00:0", key: "root", type: "YORKIE_OBJECT", value: {} }
  ])
  const [presences, setPresences] = useState([])
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      console.log("panel receive message ✅", message)

      setPresences(
        message.clients.map((client) => ({
          ...client,
          id: client.clientID,
          type: "USER"
        }))
      )
      if (message.root) {
        setRoot([{ ...message.root, key: "root" }])
      }
      if (message.docKey) {
        setDocument(message.docKey)
      }
    })
  }, [])

  return (
    <div className="yorkie-devtools">
      <div className="yorkie-root content-wrap">
        <div className="title">{document}</div>
        <div className="content">
          <RootTree data={root} />
        </div>
      </div>
      <div className="yorkie-presence content-wrap">
        <div className="title">Presence</div>
        <div className="content">
          <PresenceTree data={presences} />
        </div>
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<Panel />)
