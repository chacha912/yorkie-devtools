import type { ReactNode } from "react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"

import type { SDKToPanelMessage } from "../../protocol"

type CurrentSourceContext = {
  currentDocKey: string | null
  root: any
  presences: any
  tree: any
}
const YorkieSourceContext = createContext<CurrentSourceContext | null>(null)

type Props = {
  children?: ReactNode
}
const RootPath = "$"
const RootKey = "root"
const InitialRoot = [
  {
    id: RootPath,
    path: RootPath,
    key: RootKey,
    createdAt: "0:00:0",
    type: "YORKIE_OBJECT",
    value: {}
  }
]
export function YorkieSourceProvider({ children }: Props) {
  const [currentDocKey, setCurrentDocKey] = useState<string | null>(null)
  const [root, setRoot] = useState(InitialRoot)
  const [presences, setPresences] = useState([])
  const [tree, setTree] = useState({})

  const value = useMemo(
    () => ({ currentDocKey, setCurrentDocKey, root, presences, tree }),
    [currentDocKey, setCurrentDocKey, root, presences, tree]
  )

  const handleMessage = useCallback((message: SDKToPanelMessage) => {
    console.log("✅ sdk --> content --> panel", message)
    switch (message.msg) {
      case "doc::available":
        console.log("🎃room available")
        if (message.docKey) {
          setCurrentDocKey(message.docKey)
        }
        break
      case "doc::unavailable":
        break
      case "doc::sync::full":
        break
      case "doc::sync::partial":
        console.log("🎃partial update")
        if (message.root) {
          setRoot([
            { ...message.root, key: RootKey, id: RootPath, path: RootPath }
          ])
        }
        if (message.clients) {
          setPresences(
            message.clients.map((client) => ({
              ...client,
              id: client.clientID,
              type: "USER"
            }))
          )
        }
        break
      default:
        break
    }
  }, [])

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessage)
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
    }
  }, [])

  return (
    <YorkieSourceContext.Provider value={value}>
      {children}
    </YorkieSourceContext.Provider>
  )
}

export function useYorkieSourceContext() {
  const context = useContext(YorkieSourceContext)
  if (context === null) {
    throw new Error(
      "Please use a <YorkieSourceProvider> up the component tree to use useYorkieSourceContext()"
    )
  }
  return context
}
