
import Link from "next/link"


export default function About(){
    return (
        <>
        <header className="p-4 relative h-60 bg-[url('/aboutbackground.jpg')] text-center">
       
        </header>
        <main className="2xl:w-[70%] mx-auto">
            <h1 className="2xl:text-4xl">About Pordon as a teacher</h1>
            <div className="flex flex-col sm:flex-row items-center mt-10 mx-15">
                <img src={"/teacher.jpeg"} className="m-4 h-50" alt="teacher pordon"></img>
                <p className="justify-center xl:text-xl 2xl:text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem atque, exercitationem sequi architecto ex magni maiores dolore veritatis eligendi. Quaerat eaque rerum illum aperiam vel facere quidem delectus atque doloremque!</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center mt-10 mx-15">
                <p className="hidden sm:block sm:justify-center lg:text-lg 2xl:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem atque, exercitationem sequi architecto ex magni maiores dolore veritatis eligendi. Quaerat eaque rerum illum aperiam vel facere quidem delectus atque doloremque!</p>
                <img src={"/teacher.jpeg"} className="m-4 h-50" alt="teacher pordon"></img>
                <p className="sm:hidden justify-center lg:text-lg 2xl:text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem atque, exercitationem sequi architecto ex magni maiores dolore veritatis eligendi. Quaerat eaque rerum illum aperiam vel facere quidem delectus atque doloremque!</p>
            </div>

            <hr className="mx-20 my-10 border-2"></hr>
            <div className="mb-30 text-center ">
                <h2 className="m-4 mb-5 2xl:text-2xl">Start your learning here</h2>
                <Link href="/lessons"><button className="bg-yellow-100 text-black 2xl:text-3xl hover:bg-yellow-300 p-2 px-4 border-2 font-bold">Get started</button></Link>
            </div>
        </main>
        
        </>
     
    )
}