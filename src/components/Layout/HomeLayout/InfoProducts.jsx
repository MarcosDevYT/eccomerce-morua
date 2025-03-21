
import Button from "../../Button"
import Container from "../Container"


const InfoProducts = () => {
  return (
    <Container className="justify-between items-center flex flex-col gap-12 md:flex-row-reverse">
      <article className="flex flex-col gap-12 lg:gap-20 max-w-xl lg:w-2xl justify-center items-start">
          <h3 className="text-lg lg:text-xl">Drip Table y Rely Chair<br />por Hee Weling</h3>

          <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-playfart">
            Soluciones <br />
            Sostenibles
          </h1>

          <p className="lg:text-lg max-w-md">
            La colección Florido se compone de distintos modelos, cada uno disponible en una amplia variedad de colores para adaptarse a tu estilo.
          </p>

          <Button href={"/category"} text={"Catalogo"} />
      </article>
      <article className="max-w-xl lg:max-w-2xl">
        <figure className="relative">
          <img src="../silla-info.png" className="w-3/4" alt="" />
          <div className="absolute top-1/2 -translate-y-1/2 bg-black/30 w-3/4 h-full" />
          <div className="absolute top-1/2 -translate-y-1/2 right-5 w-5/12 rounded-full overflow-hidden">
            <img src="/silla-info-zoom.png" alt="" />
          </div>
        </figure>
      </article>
    </Container>
  )
}

export default InfoProducts
