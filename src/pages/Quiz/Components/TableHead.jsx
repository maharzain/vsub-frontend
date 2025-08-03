import React from "react";

const TableHead = ({ headOne, headTwo, headThree }) => {
  return (
    <ul className='flex text-primary-font bg-lightPurple mt-6 px-2 sm:px-10 py-4 rounded-md'>
      <li className='w-28 border-l-2 border-tableBorder pl-2 sm:ml-10'>{headOne}</li>
      <li className='w-[38rem] border-l-2 border-tableBorder pl-2'>
        {headTwo}
      </li>
      <li className='border-l-2 border-tableBorder pl-2 sm:mr-20'>{headThree}</li>
    </ul>
  );
};

export default TableHead;
