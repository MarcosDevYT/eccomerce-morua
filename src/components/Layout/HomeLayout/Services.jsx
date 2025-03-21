import { ServicesItems } from "../../../../data"
import Button from "../../Button"
import ItemsServices from "../../ItemsServices"
import TitleSection from "../../TitleSection"
import Container from "../Container"



const Services = () => {
  return (
    <Container className={"flex flex-col items-center justify-center gap-12"}>
      <TitleSection title={"Nuestras Ventajas"} />
      <article className="flex flex-wrap gap-16 mb-4 items-center justify-center">
        {ServicesItems.map((item, index) => (
          <ItemsServices key={index} title={item.title} content={item.content} />
        ))}
      </article>
      <Button href={"/category"} text={"Descubre Mas Productos"}/>
    </Container>
  )
}

export default Services
