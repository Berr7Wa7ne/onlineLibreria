import React from "react";
import Profile1 from '../../assets/Profile1.png';
import Profile2 from '../../assets/Profile2.png';
import Profile3 from '../../assets/Profile3.png';

const ReviewSection = () => {
  // Sample reviews data (Replace with dynamic data if needed)
  const reviews = [
    {
      id: 1,
      name: "Ahmad Saugi",
      review: "Engaging plot, vivid characters; a captivating read that lingers in your thoughts.",
      image: Profile1,
      career: "College Student"
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "Thought-provoking narrative and rich prose. A must-read for any avid book lover!",
      image: Profile2,
      career: "School Student"
    },
    {
      id: 3,
      name: "Michael Lee",
      review: "Immersive storytelling! An enriching literary experience worth savoring and sharing.",
      image: Profile3,
      career: "ERP Developer"
    },
  ];

  return (
    <section className="py-16 ">
      {/* Subheader */}
      <h2 className="text-center font-sf-pro-rounded text-3xl text-[orange]">
        Others <span className="font-courgette text-[purple]">reviews</span>
      </h2>

      {/* Flex Container for Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-6 md:px-20 mt-14">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3 text-center">
            {/* Profile Image */}
            <img
              src={review.image}
              alt={review.name}
              className="w-[149px] h-[149px] mx-auto rounded-full mb-8"
            />

            {/* Review Text */}
            <p className="text-gray-600 dark:text-white mt-2 text-[16px] mb-8">{review.review}</p>
            
            {/* Reviewer Name */}
            <h3 className="text-xl text-blue-600 font-semibold [16px] mb-8">{review.name}</h3>
            
            {/* Career Description */}
            <h3 className="text-xl font-semibold [16px] mb-8">{review.career}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
