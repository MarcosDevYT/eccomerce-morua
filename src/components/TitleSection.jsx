const TitleSection = ({title, className}) => {
  return (
    <h2 className={`${className} text-3xl md:text-4xl font-playfart pb-1 mb-4`}>
      {title}
    </h2>
  )
}

export default TitleSection
