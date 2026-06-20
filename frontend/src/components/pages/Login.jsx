import React from "react";
import { Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      usuario_name: "",
      usuario_password: "",
      redirect: false,
      error: null,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login = async () => {
    const { usuario_name, usuario_password } = this.state;
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_name, usuario_password }),
      });
      const result = await response.json();

      if (result.status === "yes") {
        localStorage.setItem("usuario_id", result.usuario_id);
        localStorage.setItem("usuario_name", result.usuario_name);
        localStorage.setItem("usuario_type", result.tipo);
        this.setState({ redirect: true, error: null });
      } else {
        this.setState({ error: "Usuario o contraseña incorrectos." });
      }
    } catch (error) {
      this.setState({ error: "No se pudo conectar con el servidor." });
    }
  };

  render() {
    const { usuario_name, usuario_password, redirect, error } = this.state;

    if (redirect) {
      return <Navigate to="/administrator" />;
    }

    return (
      <div>
        <div className="container-fluid p-5 bg-primary text-white text-center">
          <h1>Nanopantano</h1>
          <p>Chat de imagenes con GenAI</p>
        </div>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm p-4">
                <div className="mb-3">
                  <label className="form-label">Usuario</label>
                  <input
                    name="usuario_name"
                    value={usuario_name}
                    onChange={this.handleChange}
                    placeholder="Ingrese el usuario"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    name="usuario_password"
                    value={usuario_password}
                    onChange={this.handleChange}
                    placeholder="Ingrese su contraseña"
                    type="password"
                    className="form-control"
                  />
                </div>
                {error ? <div className="alert alert-danger">{error}</div> : null}
                <button className="btn btn-primary w-100" onClick={this.login}>
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login; 