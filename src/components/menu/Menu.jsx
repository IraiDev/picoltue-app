import { useEffect, useState } from 'react'
import OnOutsiceClick from 'react-outclick'

const Menu = ({ className, menuButton, icon, children }) => {
  const [showMenu, toggleMenu] = useState(false)

  useEffect(() => {
    return null // desmontar menu para evitar warning
  }, [showMenu])

  return (
    <OnOutsiceClick onOutsideClick={() => toggleMenu(false)}>
      <button
        className={`${className} transition duration-500`}
        onClick={() => toggleMenu(!showMenu)}
      >
        {icon}
        {menuButton}
      </button>
      <section
        onClick={() => toggleMenu(false)}
        className={`
            fixed animate__animated animate__faster z-20
            ${showMenu ? 'animate__fadeIn' : 'hidden'}
            `}
      >
        {children}
      </section>
    </OnOutsiceClick >
  )
}

export default Menu
