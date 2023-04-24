import logo_transparent from "./assets/logo_transparent.png";
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Navbar,
  NavbarBrand
} from "reactstrap";


class App extends React.Component {

  state = {
    data: [], //para mirar el JSON de arriba cambiar por data
    comentarios: [], //para mirar el JSON de arriba cambiar por data
    modalActualizar: false,
    modalInsertar: false,
    modalComentario: false,
    form: {
      id: "",
      nombre: "",
      descripcion: "",
      valor_unitario: "",
      ean: "",
      marca: "",
      cantidad: "",
      imagen: "",
    },
  };

  componentDidMount() {
    this.loadData()
  }

  loadData(){
    axios.get("http://localhost:8080/api/productos")
      .then(response => 
        response.data)
      .then(data => { 
        this.setState({ data });
    });
  }

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarModalComentario = () => {
    this.setState({
      modalComentario: true,
    });
  };

  cerrarModalComentario = () => {
    this.setState({ modalComentario: false });
  };

  editar = (dato) => {
    axios.put("http://localhost:8080/api/productos/" + dato.id, dato).then(() => {
        this.loadData();
    });
    this.setState({ modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
    axios.delete("http://localhost:8080/api/productos/" + dato.id).then(() => {
      this.loadData();
    });
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    delete valorNuevo.id
    axios.post("http://localhost:8080/api/productos", valorNuevo).then(() => {
        this.loadData();
    });
  }

  handleSearch = (value) => {
    axios.get("http://localhost:8080/api/productos",value)
      .then(response => 
        response.data)
      .then(data => { 
        this.setState({ data });
    });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  seleccionarProducto = (producto) => {
    this.setState({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      valorunitario: producto.valorunitario,
      ean: producto.ean,
      marca: producto.marca,
      cantidad: producto.cantidad,
      imagen: producto.imagen
    });
  };

  insertarComentario = () => {
    console.log("this.state.data;",this.state)
    this.setState(this.cerrarModalComentario());
  }

  agregarComentario = () => {
    const comentarios = [...this.state.comentarios];

    axios.put("http://localhost:8080/api/comentarios" + this.state.id, {
        comentarios: comentarios,
      })
      .then(() => {
        this.loadData();
      });
  };

  render() {
    // const { productos, comentarios } = this.state;

    return (
      <>
        <Navbar className="my-2">
          <NavbarBrand href="/">
            <img
              alt="logo_transparent"
              src={logo_transparent}
              style={{
                height: 90,
                width: 90
              }}
            />
          </NavbarBrand>
        </Navbar>
        <Container className="d-flex flex-column-reverse">
          <div>
            <form>
              <input
                type="text"
                placeholder="Buscar..."
                onChange={(e) => this.handleSearch(e.target.value)}
              />
            </form>
          </div>
        </Container>
        <Container className="d-flex flex-column-reverse">
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del producto</th>
                <th>Descripción del producto</th>
                <th>Precio</th>
                <th>Ean</th>
                <th>Marca</th>
                <th>Cantidad</th>
                <th>Imágen</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.descripcion}</td>
                  <td>{dato.valor_unitario}</td>
                  <td>{dato.ean}</td>
                  <td>{dato.marca}</td>
                  <td>{dato.cantidad}</td>
                  <td>{dato.imagen}</td>
                  <td>
                    <Button color="primary" onClick={() => this.mostrarModalComentario(dato)}>Comentarios</Button>{" "}
                    <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)}>Editar</Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre del producto:
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Descripción del producto:
              </label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.descripcion}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precio del producto:
              </label>
              <input
                className="form-control"
                name="valor_unitario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.valor_unitario}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Ean:
              </label>
              <input
                className="form-control"
                name="ean"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.ean}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Marca del producto:
              </label>
              <input
                className="form-control"
                name="marca"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.marca}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Cantidad del producto:
              </label>
              <input
                className="form-control"
                name="cantidad"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.cantidad}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Imágen:
              </label>
              <input
                className="form-control"
                name="imagen"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.imagen}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar nombre del producto</h3></div>
          </ModalHeader>

          <ModalBody>

            <FormGroup>
              <label>
                Nombre del producto:
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Descripción del producto:
              </label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precio del producto:
              </label>
              <input
                className="form-control"
                name="valor_unitario"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Ean:
              </label>
              <input
                className="form-control"
                name="ean"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Marca del producto:
              </label>
              <input
                className="form-control"
                name="marca"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cantidad del producto:
              </label>
              <input
                className="form-control"
                name="cantidad"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Imágen:
              </label>
              <input
                className="form-control"
                name="imagen"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalComentario}>
          <ModalHeader>
            <div><h3>Comentario del producto</h3></div>
          </ModalHeader>
          <ModalBody>
            {this.state.comentarios.map((dato) => (
                <tr key={dato.comentario}>
                  <td>{dato.comentario}</td>
                </tr>
            ))}
            {/* <ul>
              {comentarios.map((comentario, index) => (
                <li key={index}>{comentario}</li>
              ))}
            </ul> */}
            <FormGroup>
              <label>
                Comentario del producto:
              </label>
              <input
                className="form-control"
                name="comentario"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.agregarComentario()}
            >
              Agregar comentario
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalComentario()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

      </>
    );
  }
}
export default App;

