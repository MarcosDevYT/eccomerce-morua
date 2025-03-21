

import { categoriasData } from "../../../../data"
import Container from "../Container"
import TitleSection from "../../TitleSection"
import LinkRouter from "../../LinkRouter"

const Categorias = () => {

  return (
    <Container>
      <TitleSection title={"Categorias"}/>

      <article className="grid grid-cols-2 gap-4">
        {categoriasData.map((item, index) => (
          <LinkRouter to={`/category/${item.categoria}`}
            className={`relative cursor-pointer max-w-[705px] max-h-[318px] rounded-lg overflow-hidden ${
                        index === 0 ? "row-span-2 max-h-[650px]" : ""}`}
            key={index}>
              <div className="absolute top-0 left-0 w-full h-full bg-black/30"/>
              <img src={item.imagen} alt={item.categoria} className="w-full h-full object-cover" />
              <h3 className="absolute bottom-2 left-4 text-xl md:text-2xl lg:text-3xl text-white">{item.categoria}</h3>
          </LinkRouter>
        ))}
      </article>
    </Container>
  )
}

export default Categorias
