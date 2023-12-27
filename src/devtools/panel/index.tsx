import { createRoot } from "react-dom/client"

import { Code } from "../components/Code"
import { PresenceTree, RootTree } from "../components/Tree"
import {
  useYorkieSeletedDataContext,
  YorkieSeletedDataProvider
} from "../contexts/YorkieSeletedData"
import {
  useYorkieSourceContext,
  YorkieSourceProvider
} from "../contexts/YorkieSource"
import { CloseIcon } from "../icons"

const Panel = () => {
  const { currentDocKey, root, presences } = useYorkieSourceContext()
  const {
    selectedPresence,
    setSelectedPresence,
    selectedNode,
    setSelectedNode
  } = useYorkieSeletedDataContext()

  return (
    <div className="yorkie-devtools">
      <div className="yorkie-root content-wrap">
        <div className="title">{currentDocKey || "Document"}</div>
        <div className="content">
          <RootTree data={root} />
          {selectedNode && (
            <div className="selected-content">
              <div className="selected-title">
                {selectedNode.id}
                <button
                  className="selected-close-btn"
                  onClick={() => {
                    setSelectedNode(null)
                  }}>
                  <CloseIcon />
                </button>
              </div>
              <Code
                code={JSON.stringify(selectedNode.value, null, 2)}
                language="json"
                withLineNumbers
              />
            </div>
          )}
        </div>
      </div>
      <div className="yorkie-presence content-wrap">
        <div className="title">Presence</div>
        <div className="content">
          <PresenceTree data={presences} />
          {selectedPresence && (
            <div className="selected-content">
              <div className="selected-title">
                {selectedPresence.key}
                <button
                  className="selected-close-btn"
                  onClick={() => {
                    setSelectedPresence(null)
                  }}>
                  <CloseIcon />
                </button>
              </div>
              <Code
                code={JSON.stringify(selectedPresence.value, null, 2)}
                language="json"
                withLineNumbers
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PanelApp() {
  return (
    <YorkieSourceProvider>
      <YorkieSeletedDataProvider>
        <Panel />
      </YorkieSeletedDataProvider>
    </YorkieSourceProvider>
  )
}

const root = createRoot(document.getElementById("root"))
root.render(<PanelApp />)
