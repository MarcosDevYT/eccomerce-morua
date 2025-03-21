import Container from "./Layout/Container"


const LoadingContainer = ({ loading, error }) => {

    return (
      <Container className="text-center py-28">

        {loading ? (
          <>
            <p className="text-5xl font-playfart font-medium mb-6">Cargando...</p>
            <p>Espere un momento por favor...</p>
          </>
        ) : error ? ( 
          <>
            <p className="text-2xl font-playfart font-semibold">Error al cargar los Productos</p>
              <p>{error}</p>
          </>
        ) : ""}
      </Container>
    )
  
}

export default LoadingContainer
