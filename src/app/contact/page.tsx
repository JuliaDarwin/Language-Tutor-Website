
import ContactForm  from "../(components)/contactform";

export default function ContactPage() {
    return (
       <>
       <header className="hidden sm:block p-4 relative h-60 bg-[url('/aboutbackground.jpg')] text-center">
       
        </header>
        <main>
            <div className="flex justify-center items-center mt-15 2xl:text-xl">
                <ContactForm />
            </div>
        </main>
       </>
            
       
    );
}