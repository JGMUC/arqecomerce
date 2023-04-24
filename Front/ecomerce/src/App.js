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
      imagen: "",
    },
  };

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    fetch('http://localhost:8080/api/productos')
      .then(response => response.json())
      .then(data => {
        const productos = data.map(item => {
          return {
            id: item.id,
            nombre: item.nombre,
            descripcion: item.descripcion,
            valor_unitario: item.valor_unitario,
            ean: item.ean,
            marca: item.marca,
            imagen: item.imagen
          };
        });
        this.setState({ data }); // Se actualiza el estado con los datos obtenidos
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

  cerrarModalInsertar = () => {
    this.setState({ modalComentario: false });
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
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].descripcion = dato.descripcion;
        arreglo[contador].valor_unitario = dato.valor_unitario;
        arreglo[contador].ean = dato.ean;
        arreglo[contador].marca = dato.marca;
        arreglo[contador].imagen = dato.imagen;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  insertarComentario = () => {
    console.log("this.state.data;",this.state.data)
    // var valorNuevo = { ...this.state.form };
    // valorNuevo.id = this.state.data.length + 1;
    // var lista = this.state.data;
    // lista.push(valorNuevo);
    this.setState(this.cerrarModalInsertar());
  }

  handleSearch = (value) => {
    var [searchTerm, setSearchTerm] = useState("");
    setSearchTerm(value);
    // aquí puedes hacer algo con la búsqueda, como enviarla a un servidor o actualizar una lista de resultados
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };



  componentDidMount() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    axios.get("http://localhost:8080/api/productos").then((res) => {
      this.setState({ productos: res.data });
    });
  }

  seleccionarProducto = (producto) => {
    this.setState({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      valorunitario: producto.valorunitario,
      ean: producto.ean,
      marca: producto.marca,
      imagen: producto.imagen
    });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const producto = {
      id: this.state.id,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      valorunitario: this.state.valorunitario,
      ean: this.state.ean,
      marca: this.state.marca,
      imagen: this.state.imagen
    };

    if (producto.id === 0) {
      axios.post("http://localhost:8080/api/productos", producto).then(() => {
        this.obtenerProductos();
      });
    } else {
      axios.put("http://localhost:8080/api/productos" + producto.id, producto).then(() => {
        this.obtenerProductos();
      });
    }

    this.limpiarFormulario();
  };

  limpiarFormulario = () => {
    this.setState({
      id: 0,
      nombre: "",
      descripcion: "",
      valorunitario: "",
      ean: "",
      marca: "",
      imagen: "",
    });
  };

  eliminarProducto = (id) => {
    axios.delete("http://localhost:8080/api/productos" + id).then(() => {
      this.obtenerProductos();
    });
  };

  agregarComentario = (comentario) => {
    const comentarios = [...this.state.comentarios, comentario];

    axios
      .put("http://localhost:8080/api/productos" + this.state.id, {
        comentarios: comentarios,
      })
      .then(() => {
        this.obtenerProductos();
      });
  };












  render() {
    const { productos, comentarios } = this.state;

//     return (
//       <div>
//         <h1>Lista de Productos</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Nombre</th>
//               <th>Descripción</th>
//               <th>Valor Unitario</th>
//               <th>EAN</th>
//               <th>Marca</th>
//               <th>Imagen</th>
//               <th>Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {productos.map((producto) => (
//               <tr key={producto.id}>
//                 <td>{producto.nombre}</td>
//                 <td>{producto.descripcion}</td>
//                 <td>{producto.valorunitario}</td>
//                 <td>{producto.ean}</td>
//                 <td>{producto.marca}</td>
//             <td>
//               <img src={producto.imagen} alt={producto.nombre} />
//             </td>
//             <td>
//               <button onClick={() => this.seleccionarProducto(producto)}>Editar</button>
//               <button onClick={() => this.eliminarProducto(producto.id)}>Eliminar</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     <h2>{this.state.id === 0 ? "Agregar Producto" : "Editar Producto"}</h2>
//     <form onSubmit={this.handleSubmit}>
//       <label>
//         Nombre:
//         <input type="text" name="nombre" value={this.state.nombre} onChange={this.handleChange} />
//       </label>
//       <br />
//       <label>
//         Descripción:
//         <textarea name="descripcion" value={this.state.descripcion} onChange={this.handleChange}></textarea>
//       </label>
//       <br />
//       <label>
//         Valor Unitario:
//         <input type="number" name="valorunitario" value={this.state.valorunitario} onChange={this.handleChange} />
//       </label>
//       <br />
//       <label>
//         EAN:
//         <input type="text" name="ean" value={this.state.ean} onChange={this.handleChange} />
//       </label>
//       <br />
//       <label>
//         Marca:
//         <input type="text" name="marca" value={this.state.marca} onChange={this.handleChange} />
//       </label>
//       <br />
//       <label>
//         Imagen:
//         <input type="text" name="imagen" value={this.state.imagen} onChange={this.handleChange} />
//       </label>
//       <br />
//       <button type="submit">{this.state.id === 0 ? "Agregar" : "Actualizar"}</button>
//       <button type="button" onClick={this.limpiarFormulario}>
//         Limpiar
//       </button>
//     </form>

//     <h2>Comentarios</h2>
//     <ul>
//       {comentarios.map((comentario, index) => (
//         <li key={index}>{comentario}</li>
//       ))}
//     </ul>
//     <form onSubmit={(event) => {
//       event.preventDefault();
//       this.agregarComentario(this.state.comentario);
//       this.setState({ comentario: "" });
//     }}>
//       <label>
//         Comentario:
//         <input type="text" name="comentario" value={this.state.comentario} onChange={this.handleChange} />
//       </label>
//       <br />
//       <button type="submit">Agregar Comentario</button>
//     </form>
//   </div>
// );

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
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
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
              {/* <form onSubmit={(event) => {
                event.preventDefault();
                this.agregarComentario(this.state.comentario);
                this.setState({ comentario: "" });
              }}>
                <label>
                  Comentario:
                  <input type="text" name="comentario" value={this.state.comentario} onChange={this.handleChange} />
                </label>
                <br />
                <button type="submit">Agregar Comentario</button>
              </form> */}
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
              onClick={() => this.insertarComentario()}
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

