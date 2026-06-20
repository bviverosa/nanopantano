import React from "react";
import { Button, Container, Card, Form, ListGroup, Row, Col, Alert } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import axios from "axios";

class Administrator extends React.Component {
  state = {
    sessions: [],
    selectedSession: null,
    mensajes: [],
    prompt: "",
    loading: false,
    error: null,
    redirectToLogin: false,
  };

  componentDidMount() {
    const usuario_id = localStorage.getItem("usuario_id");
    if (!usuario_id) {
      this.setState({ redirectToLogin: true });
      return;
    }
    this.loadSessions(usuario_id);
  }

  loadSessions = async (usuario_id) => {
    try {
      const response = await axios.get("/api/sesiones", { params: { usuario_id } });
      this.setState({ sessions: response.data, error: null });
      if (response.data.length > 0 && !this.state.selectedSession) {
        this.selectSession(response.data[0]);
      }
    } catch (error) {
      console.info(error);
      this.setState({ error: "No se pudieron cargar las sesiones." });
    }
  };

  selectSession = async (session) => {
    this.setState({ selectedSession: session, mensajes: [], loading: true, error: null });
    try {
      const response = await axios.get(`/api/sesiones/${session.sesion_id}/mensajes`);
      this.setState({ mensajes: response.data, loading: false });
    } catch (error) {
      console.info(error);
      this.setState({ error: "No se pudieron cargar los mensajes.", loading: false });
    }
  };

  createSession = async () => {
    const usuario_id = localStorage.getItem("usuario_id");
    if (!usuario_id) {
      this.setState({ redirectToLogin: true });
      return;
    }

    try {
      const response = await axios.post("/api/sesiones", {
        usuario_id,
        titulo: `Chat ${new Date().toLocaleString()}`,
      });
      this.setState({ sessions: [response.data, ...this.state.sessions] });
      this.selectSession(response.data);
    } catch (error) {
      console.info(error);
      this.setState({ error: "No se pudo crear la sesión." });
    }
  };

  sendPrompt = async () => {
    const { prompt, selectedSession } = this.state;
    const usuario_id = localStorage.getItem("usuario_id");

    if (!prompt.trim()) {
      this.setState({ error: "Escribe un prompt para generar imágenes." });
      return;
    }
    if (!usuario_id) {
      this.setState({ redirectToLogin: true });
      return;
    }

    this.setState({ loading: true, error: null });
    try {
      const response = await axios.post("/api/generate-image", {
        sesion_id: selectedSession?.sesion_id,
        usuario_id,
        prompt,
      });
      const { session, message } = response.data;
      await this.loadSessions(usuario_id);
      if (session?.sesion_id === selectedSession?.sesion_id) {
        const newMessages = [...this.state.mensajes, message];
        this.setState({ mensajes: newMessages });
      } else {
        this.selectSession(session);
      }
      this.setState({ prompt: "", loading: false });
    } catch (error) {
      console.info(error);
      this.setState({ error: "Error al generar la imagen con GenAI.", loading: false });
    }
  };

  render() {
    const { sessions, selectedSession, mensajes, prompt, loading, error, redirectToLogin } = this.state;

    if (redirectToLogin) {
      return <Navigate to="/" />;
    }

    return (
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Sesiones</Card.Title>
                <Button variant="success" className="w-100 mb-3" onClick={this.createSession}>
                  Nueva sesión
                </Button>
                {sessions.length === 0 ? (
                  <div>No hay sesiones disponibles.</div>
                ) : (
                  <ListGroup>
                    {sessions.map((session) => (
                      <ListGroup.Item
                        key={session.sesion_id}
                        action
                        active={selectedSession?.sesion_id === session.sesion_id}
                        onClick={() => this.selectSession(session)}
                      >
                        {session.titulo}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>Chat de imagenes</Card.Title>
                {error ? <Alert variant="danger">{error}</Alert> : null}
                <div className="mb-3">
                  <Form.Group>
                    <Form.Label>Prompt</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={prompt}
                      onChange={(event) => this.setState({ prompt: event.target.value })}
                      placeholder="Describe la imagen que quieres generar..."
                    />
                  </Form.Group>
                </div>
                <Button variant="primary" disabled={loading || !selectedSession} onClick={this.sendPrompt}>
                  {loading ? "Generando..." : "Generar imagen"}
                </Button>
              </Card.Body>
            </Card>

            {selectedSession ? (
              <Card className="mt-3">
                <Card.Body>
                  <Card.Title>Mensajes de la sesión</Card.Title>
                  {mensajes.length === 0 ? (
                    <div>No hay mensajes aún.</div>
                  ) : (
                    <ListGroup>
                      {mensajes.map((mensaje) => (
                        <ListGroup.Item key={mensaje.mensaje_id} className={mensaje.remitente === "assistant" ? "bg-light" : ""}>
                          <div className="d-flex justify-content-between">
                            <strong>{mensaje.remitente === "assistant" ? "IA" : "Usuario"}</strong>
                            <small>{new Date(mensaje.created_at).toLocaleString()}</small>
                          </div>
                          <div>{mensaje.contenido}</div>
                          {mensaje.imagen_url ? (
                            <img src={mensaje.imagen_url} alt="Generada" className="img-fluid mt-2" />
                          ) : null}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            ) : (
              <Card className="mt-3">
                <Card.Body>
                  <p>Selecciona una sesión para ver su historial de mensajes.</p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Administrator;