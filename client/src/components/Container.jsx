function Container({children}){
  return(
    <div className="row justify-content-center mt-5">
    <div className="col-md-6 col-lg-5">
      <div className="card shadow-lg p-4 border-0 rounded-4">
        <div className="card-body">
          {children}
        </div>
      </div>
    </div>
  </div>  )
}

export default Container