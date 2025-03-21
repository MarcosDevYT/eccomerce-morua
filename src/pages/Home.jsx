
import Categorias from "../components/Layout/HomeLayout/Categorias"
import Hero from "../components/Layout/HomeLayout/Hero"
import Info from "../components/Layout/HomeLayout/Info"
import InfoProducts from "../components/Layout/HomeLayout/InfoProducts"
import Services from "../components/Layout/HomeLayout/Services"
import TitleSection from "../components/TitleSection"
import ItemListContainer from "../containers/ItemListContainer"


const Home = () => {
  return (
    <main className="px-6 pt-16 min-h-screen md:px-16 lg:px-28">

      <Hero />
      <Info className={"max-w-lg"} barra={true} >
        <h3 className="text-2xl">
          Marcos Commerce transforma tus espacios con sillas, lámparas y decoraciones con un enfoque contemporáneo.
        </h3>
      </Info>
      <ItemListContainer title={"Productos Destacados"} destacado={true} />
      <InfoProducts />
      <Services />
      <Categorias />
      <Info className="max-w-2xl" mensaje={"Envianos un Email"} icono={"../mail-send-fill.svg"}>
        <TitleSection title={"Marcos Commerce"} className={"border-b-2 w-max"} />
        <p className="text-xl">
          ¿Tienes alguna pregunta? Estamos a tu disposición para asistirte con consultas sobre nuestros productos y brindarte soporte en tus pedidos.
        </p>
      </Info>
    </main>
  )
}

export default Home
