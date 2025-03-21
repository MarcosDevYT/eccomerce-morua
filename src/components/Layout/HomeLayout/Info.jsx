import Container from "../Container"

const Info = ({ className, children, barra, mensaje, icono }) => {

  return (
    <Container className="px-8 flex flex-col items-center">
      <article className={`${className} flex flex-col items-center text-center`}>
        {children}
      </article>
      <article className="mt-5 flex flex-col justify-center items-center">
        {barra ? <div className="block w-60 lg:w-80 h-1 rounded-full bg-black mt-5" /> : ""}
        {icono ? <img src={icono} className="w-10" alt="icono" /> : ""}
        {mensaje ? <p className="text-xl mt-2">{mensaje}</p>: ""}
      </article>
    </Container>
  )
}

export default Info
