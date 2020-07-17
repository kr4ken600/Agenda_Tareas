import React, { Component } from "react";
import "../estilos/muestra.css";


class muestra extends Component {
  state = {
    activacion: false,
  }
  render() {
    return (
      <div id="page-top">
        <nav
          className={this.state.activacion ? "navbar navbar-expand-lg navbar-light fixed-top py-3 navbar-scrolled" : "navbar navbar-expand-lg navbar-light fixed-top py-3"}
          id="mainNav"
        >
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">Recuerda Tareas</a>
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto my-2 my-lg-0">
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="/login">
                    <i className="fas fa-sign-in-alt"/> Inicia Sesión
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="/signup">
                    <i className="fas fa-user-plus"/> Registrate
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header className="masthead">
          <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center text-center">
              <div className="col-lg-10 align-self-end">
                <h1 className="text-uppercase text-white font-weight-bold">
                  Tu agenda de tareas y actividades
                </h1>
                <hr className="divider my-4" />
              </div>
              <div className="col-lg-8 align-self-baseline">
                <p className="text-white-75 font-weight-light mb-5">
                  Una pagina donde puedes registrar tus tareas escolares o tus
                  actividades más importantes. Todo al alcance de tu telefono o
                  computadora.
                </p>
                <a
                  className="btn btn-primary btn-xl js-scroll-trigger"
                  href="#about"
                >
                  Conoce más
                </a>
              </div>
            </div>
          </div>
        </header>

        <section className="page-section bg-primary" id="about">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h1 className="text-white mt-0">¡Todo lo que necesitas!</h1>
                <hr className="divider light my-4" />
                <p className="text-white-50 mb-4">
                  Olvidate de la libreta y papel y comienza a registrar tus
                  tareas de una forma más facil y accesible. Ten siempre tus
                  tareas organizadas por fecha para que nunca olvides
                  realizarlas a tiempo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section bg-light" id="services">
          <div className="container">
            <h1 className="text-center mt-0">A Tu Servicio</h1>
            <hr className="divider my-4" />
            <div className="row">
              <div className="col-lg-4 col-md-6 text-center">
                <div className="mt-5">
                  <i className="fas fa-4x fa-gem text-primary mb-4"></i>
                  <h3 className="h4 mb-2">Excelente Para Estudiantes</h3>
                  <p className="text-muted mb-0">
                    Mantente siempre al tanto de tus tareas y nunca pierdas el
                    control.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 text-center">
                <div className="mt-5">
                  <i className="fas fa-4x fa-clock text-primary mb-4"></i>
                  <h3 className="h4 mb-2">Puntualidad</h3>
                  <p className="text-muted mb-0">
                    Por la forma en la que se organizan tus tareas, siempre
                    podras realizarlas con anticipacion.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 text-center">
                <div className="mt-5">
                  <i className="fas fa-4x fa-gamepad text-primary mb-4"></i>
                  <h3 className="h4 mb-2">Control</h3>
                  <p className="text-muted mb-0">
                    Toma el control de tus tiempos y organiza todas tus
                    actividades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section bg-dark text-white">
          <div className="container text-center">
            <h1 className="mb-4">Version Beta</h1>
            <p className="mb-0">
              El servicio aun se encuentra en fase Beta, pero es una excelente
              herramienta para agendar tus tareas y poder recordar todas tus
              actividades.
            </p>
            <br></br>
            <br></br>
            <div className="row">
              <div className={window.screen.width < 768 ? "col-md seperarBTN" : "col-md"}>
                <a className="btn btn-primary btn-xl" href="/login">
                  <i className="fas fa-sign-in-alt"/> Inicia Sesión
                </a>
              </div>
              <div className="col-md">
                <a className="btn btn-secondary btn-xl" href="/signup">
                  <i className="fas fa-user-plus"/> Registrate
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-white py-5">
          <div className="container">
            <div className="small text-center text-muted">
              Copyright © 2020 - Recuerda Tareas
            </div>
          </div>
        </footer>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.bundle.min.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js"></script>

        <script src="js/scripts.js"></script>
      </div>
    );
  }
}

export default muestra;

