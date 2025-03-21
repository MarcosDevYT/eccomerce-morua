const ItemsServices = ({ title, content }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center w-72 md:w-80">
      <h3 className="font-playfart text-2xl">{ title }</h3>
      <p className="text-lg">{ content }</p>
    </div>
  )
}

export default ItemsServices
