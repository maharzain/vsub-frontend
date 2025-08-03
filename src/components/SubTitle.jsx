import React from 'react'
import { useMediaQuery } from 'react-responsive';

const SubTitle = ({children, size}) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 640px)'
  });

  size = isMobile? size/1.6 : size
  return (
    <h2 style={{fontSize: `${size}rem`}} className='sm:leading-[2rem] text-dimGray font-light'>{children}</h2>
  )
}

export default SubTitle