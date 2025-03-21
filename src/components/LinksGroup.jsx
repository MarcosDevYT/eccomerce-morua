import RevealText from "./RevealText";

const LinksGroup = ({ list, title }) => {

  return (
    <ul className="flex flex-col gap-4 p-4">
      <li className="text-2xl mb-2 md:text-4xl">{title}</li>
      {list.map((item, index) => (
        <li key={index} className="text-xl h-6 overflow-hidden">
          <RevealText to={item.link} text={item.title} />
        </li>
      ))}
    </ul>
  )
}

export default LinksGroup
