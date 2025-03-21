const MenuToggle = ({ button, imagen }) => {
  return (
    <button onClick={button}>
      <img src={`${imagen}`} alt="" className="w-4 md:w-6 cursor-pointer" />
    </button>
  )
}

export default MenuToggle;