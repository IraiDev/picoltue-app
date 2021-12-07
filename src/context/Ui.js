import { createContext, useState } from 'react'

export const UiContext = createContext()

export const UiProvider = ({ children }) => {

  const [sidebar, setSidebar] = useState(true)

  const toggleSidebar = () => setSidebar(!sidebar)

  return (
    <UiContext.Provider value={{
      toggleSidebar,
      sidebar
    }}>
      {children}
    </UiContext.Provider>
  )
}
