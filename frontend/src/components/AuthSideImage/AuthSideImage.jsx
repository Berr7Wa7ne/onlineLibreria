import React from 'react';
import LibraryReg from '../../assets/library-reg.jpg'

const AuthSideDesign = () => {
  return (
    <div className="relative flex justify-center items-center w-full h-full">
      <img
        src={LibraryReg}
        alt="Image"
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};

export default AuthSideDesign;
