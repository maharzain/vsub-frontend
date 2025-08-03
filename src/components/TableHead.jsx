import React from "react";

const TableHead = ({headOne , headTwo , headThree , headFour}) => {
  return (
    <ul className='text-primary-font bg-lightPurple flex mt-6 px-10 py-4 rounded-md'>
      {headOne &&<li className='border-l-2 border-tableBorder pl-2 w-[26%] ml-14'>{headOne}</li>}
      {headTwo && <li className='border-l-2 border-tableBorder pl-2 w-[31%]'>{headTwo}</li>}
      {headThree && <li className='border-l-2 border-tableBorder pl-2 w-[0%]'>{headThree}</li>}
      {headFour && <li className='border-x-2 border-tableBorder pl-2 pr-2'>{headFour}</li>}
    </ul>
  );
};

export default TableHead;
