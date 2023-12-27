import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type CurrentSourceContext = {
  currentDocKey: string | null
  root: any
  presences: any
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

  const value = useMemo(
    () => ({ currentDocKey, setCurrentDocKey, root, presences }),
    [currentDocKey, setCurrentDocKey, root, presences]
  )

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      console.log("panel receive message ✅")
      setPresences(
        message.clients.map((client) => ({
          ...client,
          id: client.clientID,
          type: "USER"
        }))
      )
      if (message.root) {
        setRoot([
          { ...message.root, key: RootKey, id: RootPath, path: RootPath }
        ])
      }
      if (message.docKey) {
        setCurrentDocKey(message.docKey)
      }
    })
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
