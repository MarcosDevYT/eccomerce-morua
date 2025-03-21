import Button from "../../Button"
import Container from "../Container"



const Hero = () => {
  return (
    <Container className="min-h-screen flex">
      <article className="py-2 pr-8 lg:my-auto">
        <img src="../carrousel-img.png" className="max-w-8 h-32" alt="Botones del carrousel ficticios" />
      </article>
      <article className="w-full flex flex-col lg:flex-row lg:justify-between gap-16">
        <div className="flex flex-col gap-12 lg:gap-20 max-w-xl">
          <h3 className="text-lg lg:text-xl">Landing Page<br />por Marcos Morua | 2025</h3>

          <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-playfart">
            Icónicos antes. <br />
            Icónicos ahora.
          </h1>

          <p className="lg:text-lg max-w-md">
            Ecommerce con navegación completa entre categorías, visualización de productos y detalles. 
            La funcionalidad del carrito de compras y proceso de checkout todavia no funcionan.
          </p>

          <Button href={"/category"} text={"Comprar Ahora"} />
        </div>
        <figure className="relative max-h-[650px] lg:w-1/2">
          <div className="absolute w-full h-full border-8 rounded-2xl right-10 top-10"></div>
          <div className="z-10 bg-black/30 absolute rounded-2xl w-full h-full"></div>
          <img src="../hero.png" className="relative w-full h-full rounded-2xl object-cover" alt="Sala de estar" />
        </figure>
      </article>
    </Container>
  )
}

export default Hero
