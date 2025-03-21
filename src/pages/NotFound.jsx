import Button from "../components/Button"
import Container from "../components/Layout/Container"


const NotFound = () => {
  return (
    <main >
      <Container className={"min-h-screen text-center flex flex-col gap-8 items-center justify-center"}>
        <h3 className="text-4xl font-bold font-playfart">
          404 Pagina no encontrada
        </h3>

        <Button href={"/"} text={"Volver al Inicio"} />
      </Container>
    </main>
  )
}

export default NotFound
