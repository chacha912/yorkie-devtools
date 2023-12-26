import { createRoot } from "react-dom/client"

import { PresenceTree, RootTree } from "../components/Tree"
import {
  useYorkieSourceContext,
  YorkieSourceProvider
} from "../contexts/YorkieSource"

const Panel = () => {
  const { currentDocKey, root, presences } = useYorkieSourceContext()

  return (
    <div className="yorkie-devtools">
      <div className="yorkie-root content-wrap">
        <div className="title">{currentDocKey || "Document"}</div>
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

function PanelApp() {
  return (
    <YorkieSourceProvider>
      <Panel />
    </YorkieSourceProvider>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<PanelApp />)
