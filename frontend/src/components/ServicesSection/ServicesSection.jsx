import React from "react";
import Left from "../../assets/Left.png";
import Right from "../../assets/Right.png";

const Services = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      {/* Subheader */}
      <h2 className="text-center font-sf-pro-rounded text-3xl text-[orange]">
        Our <span className="font-courgette text-[purple]">services</span>
      </h2>

      <div className="mt-14">
      {/* First Flex Container (Image Left, Text Right) */}
      <div className="md:flex justify-between gap-8 px-6">
        {/* Left Side (Image) */}
        <div className="md:w-[600px] md:h-[399]">
          <img
            src={Left}
            alt="Service One"
            className="w-full rounded-lg"
          />
        </div>

        {/* Right Side (Text) */}
        <div className="md:w-1/2 md:text-left text-center">
          <h3 className="text-2xl font-semibold mb-4 font-quicksand"><span className="font-courgette text-blue-600">Rent</span> your favorite book <br /> 
          fairly easy on <span className="font-courgette text-blue-600">Oline Library!</span></h3>
          <p className="text-gray-600 dark:text-white">
          Viewing, rent, and organize your favorite books has <br />never been easier. An integrated digital library rent <br />that’s simple to use, Lidia lets you spend less time <br />managing your work and more time actually doing it!<br /><br />
          Effortless rentals, personalized shelves—Online Library <br /> transforms book management, enhancing your <br />reading experience~
          </p>
        </div>
      </div>

{/* Second Flex Container (Image Right, Text Left) */}
<div className="md:flex justify-between gap-8 px-6 md:px-20 mt-12">
  {/* Right Side (Image) - Always comes first on mobile */}
  <div className="md:w-[600px] md:h-[399] order-1 md:order-2">
    <img
      src={Right}
      alt="Service Two"
      className="w-full rounded-lg"
    />
  </div>

  {/* Left Side (Text) */}
  <div className="md:w-1/2 mt-4 order-2 md:order-1 md:text-left text-center">
    <h3 className="text-2xl font-semibold mb-4 font-quicksand">
      Quick Book Rentals:<br />
      <span className="font-courgette text-blue-600">Dive</span> into <span className="font-courgette text-blue-600">Reading</span> Instantly
    </h3>
    <p className="text-gray-600 dark:text-white">
      Discover instant literary delight. Access a vast library, <br />
      borrow your favorite reads, and dive into captivating <br />
      stories within minutes. Reading made quick and easy, <br />
      just a click away!<br /><br />
      Unlock a world of stories effortlessly.<br />
      Browse genres, choose, rent in minutes. <br />
      Seamlessly manage your reading adventures <br />
      with our intuitive platform~
    </p>
  </div>
</div>

      </div>
    </section>
  );
};

export default Services;
