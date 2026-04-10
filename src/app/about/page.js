import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white py-6 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Om</h1>
        {/* <p className="text-lg leading-relaxed">Välkommen hit!</p> */}
      </div>
      <div className="max-w-4xl mx-auto text-center mt-4 mb-4">
        <p className="text-lg leading-relaxed">
          Jag heter Margareta och är utbildad smyckessmed. Det är jag som
          formger och tillverkar alla smycken du hittar här.
        </p>

        <p className="text-lg leading-relaxed">
          Mitt intresse för smycken i alla former och material har alltid
          funnits, men det är i silvret jag hittat min passion. När jag skapar
          mina smycken drivs jag av glädjen i att se en bit silver börja leva
          och formas av en gaslåga och mina egna händer. Min inspiration hittar
          jag i min omgivning, i naturen och i människor jag möter.
        </p>
        <br />
        <p className="text-lg leading-relaxed">
          Varje kreation är handgjord vilket gör den unik i sig själv. Hoppas du
          hittar ett smycke du kommer att tycka om länge.
        </p>
      </div>

      <p className="italic mt-4 text-center text-gray-500 mb-6">Margareta</p>

      <div className="flex flex-col md:flex-row gap-4 items-center max-w-3xl mx-auto">
        {/* Images */}
        <div className="md:w-1/2 w-full">
          <Image
            src="/AboutNew2.JPEG"
            alt="Handmade Jewelry 1"
            width={300}
            height={200}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="md:w-1/2 w-full">
          <Image
            src="/AboutNew.JPEG"
            alt="Handmade Jewelry 2"
            width={300}
            height={200}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}
