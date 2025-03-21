const Container = ({ children, className }) => {
  return (
    <section className={`${className} max-w-[1540px] mx-auto py-16 md:py-20`}>
      {children}
    </section>
  )
}

export default Container
