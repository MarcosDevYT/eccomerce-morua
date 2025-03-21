
import { ayudaLinks, redesSociales, volverLinks } from "../../../data"
import LinksGroup from "../LinksGroup"
import Container from "./Container"

const Footer = () => {

  

  return (
    <footer className="px-6 py-20 md:px-16 lg:px-28 bg-[#191919] text-white">
      <Container className={"flex flex-wrap justify-center lg:justify-start items-center gap-8 md:gap-20"}>
        <article className="w-56 xl:w-72">
          <img src="../logo.svg" className="w-56 xl:w-72" alt="Logo" />
          <p className="text-center">©2025 Hecho por Marcos Morua</p>
        </article>
        <nav className="flex flex-wrap place-content-center gap-12 md:gap-20">
          <LinksGroup list={volverLinks} title={"Volver a"} />
          <LinksGroup list={ayudaLinks} title={"Ayuda"} />
          <LinksGroup list={redesSociales} title={"Redes Sociales"} />
        </nav>
      </Container>
    </footer>
  )
}

export default Footer
