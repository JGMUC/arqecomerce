import logo_transparent from "./assets/logo_transparent.png";
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AWS from 'aws-sdk';



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
AWS.config.update({
  accessKeyId: `${process.env.REACT_APP_AKI}`,
  secretAccessKey: `${process.env.REACT_APP_SAK}`,
});

class App extends React.Component {
  selectedFile
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
    formComent: {
      comentario: "",
    },
  };

  componentDidMount() {
    this.loadData()
  }
  uploadFileToS3 = (file) => {
    const s3 = new AWS.S3();
    const params = {
      Bucket: 'arqsoftbucketjgmcdm',
      Key: file.name,
      Body: file,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Archivo cargado exitosamente:', data.Location);
      }
    });
  };
  loadData() {
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

  mostrarModalComentario = (dato) => {
    this.loadDataComent(dato)
    this.setState({
      form: dato,
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
    valorNuevo.imagen = this.selectedFile.name
    axios.post("http://localhost:8080/api/productos", valorNuevo).then(() => {
      this.loadData();
    });
    this.uploadFileToS3(this.selectedFile)
    this.setState({ modalInsertar: false });
  }

  handleSearch = (value) => {
    axios.get("http://localhost:8080/api/productos/" + value)
      .then(response =>
        response.data)
      .then(data => {
        this.setState({ data: [data] });
      });
  };

  handleChange = (e) => {
    if (e.target.name === 'imagen') {
      this.selectedFile = e.target.files[0];
    } else {
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value,
        },
      });
    }
  }

  handleChangeComentario = (e) => {
    this.setState({
      formComent: {
        ...this.state.formComent,
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
    this.setState(this.cerrarModalComentario());
  }

  agregarComentario = (dato) => {
    const comentarios = this.state.formComent.comentario
    let newDate = new Date()
    axios.post("http://localhost:8080/api/comentarios", {
      idproducto: dato,
      comentario: comentarios,
      fecha: newDate,
    })
      .then(() => {
        this.loadData();
      });
    this.setState({ modalComentario: false });
  };

  loadDataComent(dato) {
    axios.get("http://localhost:8080/api/comentarios/" + dato.id)
      .then(response =>
        response.data)
      .then(data => {
        this.setState({ comentarios: data });
      });
  }

  render() {

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
                <th>Imágen Render</th>
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
                  {/* <td>{dato.imagen}</td> */}

                  <td>
                    <img
                      src={`https://arqsoftbucketjgmcdm.s3.us-east-2.amazonaws.com/${dato.imagen.replace(' ','+')}`}
                      className="img-fixed-size"
                    />
                  </td>
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
                onChange={this.handleFileChange}
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
            <div><h3>Insertar nuevo producto</h3></div>
          </ModalHeader>

          <ModalBody>

            <FormGroup>
              <label>
                Nombre del producto:
              </label>
              <input
                className="form-control-small"
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
                className="form-control-small"
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
                className="form-control-small"
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
                className="form-control-small"
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
                className="form-control-small"
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
                className="form-control-small"
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
                type="file"
                accept="image/*"
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
            <Table>
              <thead>
                <tr>
                  <th>Comentario</th>
                </tr>
              </thead>
              <tbody>
                {this.state.comentarios.map((dato) => (
                  <tr key={dato.comentario}>
                    <td>{dato.comentario}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <FormGroup>
              <label>
                Comentario del producto:
              </label>
              <input
                className="form-control"
                name="comentario"
                type="text"
                onChange={this.handleChangeComentario}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.agregarComentario(this.state.form.id)}
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

