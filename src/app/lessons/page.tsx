import Link from "next/link"

export default function Lessons(){
    
    return (
        <>
        <header className="p-4 relative h-60 bg-[url('/lessonsbg.png')] text-center">
       
        </header>
        <main className="mx-15">
            <h1>Lesson Types</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-6xl my-16 2xl:gap-20 2xl:max-w-[60%]">
                {/* First lesson type */}
                <div className="lg:text-lg bg-gray-100 ring-1 ring-gray-300 grid grid-rows-[1fr_auto] rounded-xl p-8 gap-6 text-center hover:scale-105 transform transition-transform">
                    <div className=" grid grid-rows-[auto_auto_auto_1fr] gap-y-5">
                        <p className="text-[var(--blue)] text-lg xl:text-2xl font-bold">Conversational</p>
                        <p className="text-4xl text-black font-bold">28$<span className="text-base">/lesson</span></p>
                        <p className="text-black">Practice speaking through a variety of topics</p>
                        <ul className="text-black">
                            <li>
                                <span aria-hidden className="text-green-700 mr-2">&#10003;</span>
                                50 min lessons</li>
                            <li><span aria-hidden className="text-green-700 mr-2">&#10003;</span>
                                Vocabulary lists</li>
                        </ul>
                        </div>
                        <Link href="/lessons/1" className="text-center text-[var(--blue)] mt-5 p-2 bg-[var(--lightblue)]/20 rounded-md hover:bg-[var(--blue)]/80 hover:text-white">Learn More</Link>
                    
                </div>
                {   /* Second lesson type */}
                <div className="lg:text-lg relative text-center bg-gray-800 text-white ring-2 ring-[var(--lightblue)] p-8 grid grid-rows-[1fr_auto] gap-6 rounded-xl scale-105 hover:scale-115 transform transition-transform">
                    <div className="absolute -top-3 right-3 bg-linear-to-r from-[var(--lightblue)] to-[var(--blue)] rounded-full px-3 py-1 text-xs font-bold text-white ">Most Popular
                    </div>
                    <div className="grid grid-rows-[auto_auto_auto_1fr] gap-y-5">
                        <p className="text-[var(--lightblue)] text-lg font-bold text-center xl:text-2xl">General</p>
                        <p className="text-4xl font-bold">30$<span className="text-base">/lesson</span></p>
                        <p>Cover speaking, grammar and vocabulary.</p>
                        <ul>
                            <li><span aria-hidden className="text-green-700 mr-2">&#10003;</span>
                                50 min lessons</li>
                            <li><span aria-hidden className="text-green-700 mr-2">&#10003;</span>
                            Materials included</li>
                        </ul>
                     </div>
                    <Link href="/lessons/2" className="text-center mt-5 p-2 bg-linear-to-r from-[var(--lightblue)] to-[var(--blue)] text-white rounded-md">Learn More</Link>
                    
                </div>

                {   /* Third lesson type */ }
                <div className="lg:text-lg text-center bg-gray-100 ring-1 ring-gray-300 grid grid-rows-[1fr_auto] rounded-xl p-8 gap-6 hover:scale-105 transform transition-transform">
                    <div className="grid grid-rows-[auto_auto_auto_1fr] gap-y-5">
                        <p className="text-[var(--blue)] text-lg font-bold text-center xl:text-2xl">Exams</p>
                        <p className="text-4xl text-black font-bold">35$<span className="text-base">/lesson</span></p>
                        <p className="text-black">Official Ramon Llull & Generalitat de Catalunya exams</p>
                        <ul className="text-black">
                            <li><span aria-hidden className="text-green-700 mr-2">&#10003;</span>
                            50 min lessons</li>
                            <li><span aria-hidden className="text-green-700 mr-2">&#10003;</span>
                            Mocking exams included</li>
                        </ul>
                        </div>
                        <Link href="/lessons/3" className="text-center text-[var(--blue)] mt-5 p-2 bg-[var(--lightblue)]/20 rounded-md hover:bg-[var(--blue)]/80 hover:text-white">Learn More</Link>
                    
                </div>
            </div>
            <div className="text-center mx-auto mt-20">
                <h2>You want something different?</h2>
                <div className="flex flex-col gap-4 items-center">
                    <p className="lg:text-lg">Leave us a message with your request and we will get back to you as soon as possible!</p>
                    <Link href="/contact" 
                    className="inline-flex items-center rounded-full bg-amber-400 px-6 py-3 text-lg 2xl:text-3xl font-semibold text-slate-950 shadow-sm hover:bg-amber-300 transition-colors">
                    Contact us</Link>
                </div>
                
            </div>
          </main>
        </>

    )
}