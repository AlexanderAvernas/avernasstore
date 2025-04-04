import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white py-6 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Om</h1>
        <p className="text-lg leading-relaxed">
          Smyckesdesignern Margareta Avernäs formger och tillverkar sina smycken för hand i
          återvunnet silver. Hon drivs av nyfikenheten och glädjen i att se en bit silver
          börja leva och formas av en gaslåga och sina egna händer. Hon fascineras av processen
          att få vara med från en tanke om en form till ett färdigt föremål.
        </p>
      </div>
      <div className="max-w-4xl mx-auto text-center mt-4 mb-4">
        <p className="text-lg leading-relaxed">
          Hennes vision är att skapa tidlösa, spännande och lekfulla smycken som väcker intresse och
          ger inspiration. Vid sidan av sina egna kollektioner gör hon även personliga kundbeställningar.
          Margareta är baserad i Stockholm och varumärket har funnits sedan år 2016.
        </p>
      </div>

      <p className="italic mt-4 text-center text-gray-500 mb-6">“Jag strävar efter ett hållbart resultat där kvalitet går före kvantitet.”</p>

      <div className="flex flex-col md:flex-row gap-4 items-center max-w-3xl mx-auto">
        {/* Images */}
        <div className="md:w-1/2 w-full">
          <Image src="/about.jpg" alt="Handmade Jewelry 1" width={300} height={200} className="w-full h-auto object-cover" />
        </div>
        <div className="md:w-1/2 w-full">
          <Image src="/about2.jpg" alt="Handmade Jewelry 2" width={300} height={200} className="w-full h-auto object-cover" />
        </div>
      </div>
    </div>
  );
}
