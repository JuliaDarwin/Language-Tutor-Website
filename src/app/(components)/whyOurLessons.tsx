"use client";

export default function WhyOurLessons(){

    const reasons = [
  {
    text: "We follow the official Common European Framework of Reference",
    img: "/cefr.webp",
  },
  {
    text: "We will provide you all the materials online downloadable",
    img: "/material.jpg",
  },
  {
    text: "All our tutors are native from Barcelona with neutral accent",
    img: "/onlinetutor.jpg",
  },
  {
    text: "Live sessions all online from the comfort of your home",
    img: "/allonline.jpg",
  },
];
    return(
         
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 2xl:gap-20 justify-center mt-8 w-[70%] sm:w-[90%] 2xl:w-[80%] 2xl:text-2xl mx-auto">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col p-2  bg-white rounded hover:scale-105 transform transition-transform">
                <img src={reason.img} alt="feature" className="w-full  h-1/2"/>
                <p className="flex-1 flex items-center justify-center text-center p-3 text-black">{reason.text}</p>
            </div>
          ))}
        </div>
    )
}