import React from 'react'
import { useMediaQuery } from 'react-responsive'

const Title = ({children, bold, size}) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 640px)'
  });

  size = isMobile? size/1.8 : size

  return (
    <h1 style={{fontSize: `${size}rem`, fontWeight: `${bold? "bold":""}`}} className={`leading-none text-dimGray`}>{children}</h1>
  )
}

export default Title