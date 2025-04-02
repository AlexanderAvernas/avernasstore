import React from 'react'

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Användarvillkor</h1>

      <section className="mb-6">
        <p className="text-m mb-2">
          Margareta Avernäs följer Konsumentverkets rekommendationer. Du kan läsa mer här{' '}
          <a href="https://www.konsumentverket.se/" className="text-blue-500 underline">
            https://www.konsumentverket.se/
          </a>
        </p>
        <p className="text-m mb-2">
          Du måste vara över 18 år för att beställa varor från Margareta Avernäs.
        </p>
        <p className="text-m mb-2">Persondata sparas enligt GDPR-lagen.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Priser</h2>
        <p className="text-m mb-2">
          Priset som gäller är det som finns angivet den dag kunden gör sin beställning. Vi reserverar oss för
          uppenbara prisfelmärkningar eller feltolkningar.
        </p>
        <p className="text-m mb-2">
          Vi reserverar oss för eventuella felskrivningar, produktförändringar och prisjusteringar.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Ångerrätt</h2>
        <p className="text-m mb-2">
          Du har enligt distansavtalslagen rätt att returnera beställd felfri vara. Meddelande om detta ska
          lämnas så snart som möjligt, dock senast inom 14 dagar från det att varan mottagits. Maila i så fall till{' '}
          <a href="mailto:info@margaretaavernas.se" className="text-blue-500 underline">
            info@margaretaavernas.se
          </a>
        </p>
        <p className="text-m mb-2">
          Observera att ångerrätten inte gäller specialbeställda smycken med text eller uttalad personlig prägel.
        </p>
        <p className="text-m mb-2">
          Smycket skall levereras oanvänt i sin originalförpackning.
        </p>
        <p className="text-m mb-2">Du står själv för returfrakten.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Frakt och leveranser</h2>
        <p className="text-m mb-2">
          Leveranstiden kan variera beroende på när din order kommer in samt om smycket redan finns klart på lager
          eller ej.
        </p>
        <p className="text-m mb-2">
          För färdiga smycken tar det ca 5 arbetsdagar, övriga beställningar som ej är klara vid beställning
          mellan 1-4 veckor.
        </p>
        <p className="text-m mb-2">
          Om du vill ha snabbare leverans med anledning av speciellt tillfälle så skicka ett mail till{' '}
          <a href="mailto:info@margaretaavernas.se" className="text-blue-500 underline">
            info@margaretaavernas.se
          </a>{' '}
          så ska vi försöka möta ditt önskemål.
        </p>
      </section>
    </div>
  )
}

export default Terms
