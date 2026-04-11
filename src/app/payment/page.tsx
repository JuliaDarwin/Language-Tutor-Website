import PaymentForm from "../(components)/paymentForm";

//searchParams VE DE PRICING PLANS!! és un objecte que conté els paràmetres de la URL, en el nostre cas, el nombre de lliçons. keuy es sempre un string i el parametre en si es un numero string, per ser safe tmb ho posa com conjunt de string per si es repeteix
export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Awaiting searchParams is required in Next.js 15+
  const params = await searchParams;
  const lessons = Number(params?.lessons);
  const initialLessons = !isNaN(lessons) && lessons > 0 ? lessons : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <PaymentForm initialLessons={initialLessons} />
    </div>
  );
}