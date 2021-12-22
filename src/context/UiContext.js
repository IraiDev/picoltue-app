import { createContext, useState } from 'react'
import { useToggle } from '../hooks/useToggle'

export const UiContext = createContext()

const UiProvider = ({ children }) => {

  const [showSidebar, toggleSidebar] = useToggle(false)
  const [ShowLoading, toggleLoading] = useState(false)

  return (
    <UiContext.Provider value={{
      toggleSidebar,
      showSidebar,
      ShowLoading,
      toggleLoading
    }}>
      {children}
    </UiContext.Provider>
  )
}
export default UiProvider
