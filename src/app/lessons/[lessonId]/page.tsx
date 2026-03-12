import Link from "next/link";
import notFound from "@/app/notFound"; 
import PricingPlans from "@/app/(components)/pricingPlans";
import WhyOurLessons from "@/app/(components)/whyOurLessons";
import Steps from "@/app/(components)/steps";

//defining the lessons data:

const lessonsData = [
  {
    id: "1",
    name: "Conversational Lessons",
    description: "Practice speaking through a variety of topics",
    details:
      "Focus on fluency, pronunciation, and colloquial expressions. Ideal for students who want to travel or socialize.",
    features: ["50 min lessons", "Vocabulary lists", "Audio recordings"],
  },
  {
    id: "2",
    name: "General Lessons",
    description: "Cover speaking, grammar and vocabulary.",
    details:
      "A structured approach to learning the language foundations. We cover all four skills: reading, writing, listening, and speaking.",
    features: ["50 min lessons", "Materials included", "Homework assignments"],
  },
  {
    id: "3",
    name: "Exams",
    description: "Official Ramon Llull & Generalitat de Catalunya exams",
    details:
      "Intensive preparation for official certifications. We focus on exam techniques, time management, and specific exam contents.",
    features: [
      "50 min lessons",
      "Mocking exams included",
      "Correction included",
    ],
  },
];

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = lessonsData.find((item) => item.id === lessonId);

  //Handle cases where the ID doesn't exist (e.g. /lessons/999)
  if (!lesson) {
    return notFound();
  }

  return (
    <div className="mx-auto mt-16 text-center lg:text-lg">
      {/*
       */}{" "}
      <Link
        href="/lessons"
        className="font-bold underline hover:text-blue-500 text-lg"
      >
        Back to Lessons
      </Link>
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 justify-center mx-auto p-8 2xl:w-[50%]">
        <div className="fkex flex-col text-center">
          <h1 className="text-4xl font-bold my-6">{lesson.name}</h1>
          <p className="2xl:text-2xl">{lesson.description}</p>
          <div className="p-8">
            <ul className="2xl:text-2xl">
              {lesson.features.map((feature) => (
                <li>{feature}</li>
              ))}
            </ul>
          </div>
           <button className="inline-flex items-center rounded-full bg-amber-400 px-6 py-3 text-lg 2xl:text-3xl font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition-colors">
              <a href="#pricing-plans">Choose Your Package</a> 
           </button> 
        </div>
        <img src={"/conversational.jpg"} className="mx-auto w-full 2xl:max-w-[90%]"></img>
      </div>

      {/*why our lessons*/}
      <div>
        <h2 className="font-bold">Why {lesson.name}</h2>
        <p className="2xl:text-2xl">{lesson.details}</p>
        <WhyOurLessons />
      </div>

      {/*steps*/}
     <div className="p-15">
        <h2>Get Started</h2>
        <div className="2xl:text-2xl grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center items-center mt-10 w-[60%] mx-auto">
           <Steps />
           <img src={"/getstarted.jpg"}></img>
        </div>
        
      </div>
      {/*packages*/}
      <div>
          <h2 id="pricing-plans">Choose Your Plan</h2>
          <PricingPlans />
      </div>
    </div>
  );
}
