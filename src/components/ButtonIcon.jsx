const ButtonIcon = ({ handleCart, src, alt }) => {
  return (
    <div onClick={handleCart} className="p-2 rounded-full shadow-md cursor-pointer bg-slate-50">
      <img src={src} alt={alt} className="w-4 md:w-6" />
    </div>
  )
}

export default ButtonIcon
