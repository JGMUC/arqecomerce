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


class App extends React.Component {

  state = {
    data: [], //para mirar el JSON de arriba cambiar por data
    modalActualizar: false,
    modalInsertar: false,
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
  componentDidMount(){
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
            imagen:item.imagen
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
                value={this.state.form.nombre}
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
                value={this.state.form.descripcion}
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
      </>
    );
  }
}
export default App;

