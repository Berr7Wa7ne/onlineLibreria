import React from 'react';
import search from '../../assets/search.svg';
import book from '../../assets/book.svg';
import comment from '../../assets/comment.svg';
import shakespeare from '../../assets/shakespeare.svg';

const OurResources = () => {
  return (
    <div className="">
      <h2 className="text-center font-sf-pro-rounded text-3xl text-[orange]">
        Our <span className="font-courgette text-[purple]">resources</span>
      </h2>

      <div className="md:flex justify-between items-center mt-14 space-x-4">
        {/* Researchers */}
        <div className="flex flex-col items-center text-center mb-10">
          <img className="w-20 mb-2" src={search} alt="researchers" />
          <a href="https://example.com/researchers" target="_blank" rel="noopener noreferrer">
            <h3 className="text-blue-600 text-xl font-courgette">Researchers</h3>
          </a>
          <p className="text-gray-600 dark:text-white text-[14px]">
            Register online <br /> Discover tools and manage alerts <br /> Learn about how to access
          </p>
        </div>

        {/* Librarian */}
        <div className="flex flex-col items-center text-center mb-10">
          <img className="w-20 mb-2" src={book} alt="librarian" />
          <a href="/login" target="_blank" rel="noopener noreferrer">
            <h3 className="text-blue-600 text-xl font-courgette">Librarian</h3>
          </a>
          <p className="text-gray-600 dark:text-white text-[14px]">
            Manage your account <br /> View products and solutions <br /> Find resources and support
          </p>
        </div>

        {/* Societies */}
        <div className="flex flex-col items-center text-center mb-10">
          <img className="w-20 mb-2" src={comment} alt="societies" />
          <a href="https://example.com/societies" target="_blank" rel="noopener noreferrer">
            <h3 className="text-blue-600 text-xl font-courgette">Societies</h3>
          </a>
          <p className="text-gray-600 dark:text-white text-[14px]">
            Publish with Wiley <br /> Explore our resource library <br /> Learn about topics and trends
          </p>
        </div>

        {/* Authors */}
        <div className="flex flex-col items-center text-center mb-6">
          <img className="w-20 mb-2" src={shakespeare} alt="authors" />
          <a href="https://example.com/authors" target="_blank" rel="noopener noreferrer">
            <h3 className="text-blue-600 text-xl font-courgette">Authors</h3>
          </a>
          <p className="text-gray-600 dark:text-white text-[14px]">
            Submit a paper <br /> Track your article <br /> Learn about Open Access
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurResources;
