import React from "react";
import logo from "./logo.svg";
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

const data = [
  { id: 1, nombreproducto: "Jarron de barro", descripcionproducto: "Este es un Jarron de barro de prueba" , precio: "200.000"},
  { id: 2, nombreproducto: "Manilla", descripcionproducto: "Las manillas son muy representativas de la region" , precio: "20.000"},
  { id: 3, nombreproducto: "Collar de palma", descripcionproducto: "Este collar es realizado por los artesanos de colombia" , precio: "50.000"}
];

class App extends React.Component {

  state = {
    data: [], //para mirar el JSON de arriba cambiar por data
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombreproducto: "",
      descripcionproducto: "",
      precio: "",
    },
  };

  loadData() {
    fetch('https://localhost:35729/productos')
      .then(response => response.json())
      .then(data => {
        const productos = data.map(item => {
          return {
            id: item.id,
            nombreproducto: item.nombreproducto,
            descripcionproducto: item.descripcionproducto,
            precio: item.precio
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

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].nombreproducto = dato.nombreproducto;
        arreglo[contador].descripcionproducto = dato.descripcionproducto;
        arreglo[contador].precio = dato.precio;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
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

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
      <Navbar className="my-2" color="dark" dark>
        <NavbarBrand href="/">
          <img
            alt="logo"
            src="../assets/logo_transparent.svg"
            style={{
              height: 40,
              width: 40
            }}
          />
        </NavbarBrand>
      </Navbar>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre del producto</th>
                <th>Descripción del producto</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombreproducto}</td>
                  <td>{dato.descripcionproducto}</td>
                  <td>{dato.precio}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
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
                name="nombreproducto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombreproducto}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
              Descripción del producto: 
              </label>
              <input
                className="form-control"
                name="descripcionproducto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.descripcionproducto}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Precio del producto: 
              </label>
              <input
                className="form-control"
                name="precio"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.precio}
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
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
              Nombre del producto: 
              </label>
              <input
                className="form-control"
                name="nombreproducto"
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
                name="descripcionproducto"
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
                name="precio"
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
      </>
    );
  }
}
export default App;

