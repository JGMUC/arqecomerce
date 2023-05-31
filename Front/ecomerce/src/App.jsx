
import React from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AWS from 'aws-sdk';
// import Dropzone from 'react-dropzone';
import { Header } from './components/Header';
import ProductList from './components/ProductList';
import Admin from './components/Admin';
import Maps from './components/Maps';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";

import {
  Container,
} from "reactstrap";

AWS.config.update({
  region: "sa-east-1",
  accessKeyId: `${process.env.REACT_APP_aki}`,
  secretAccessKey: `${process.env.REACT_APP_sak}`,
});

class App extends React.Component {
  selectedFile
  state = {
    data: [],
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
    allProducts: [],
    total: 0,
    countProducts: 0
  };

  // constructor(props) {
  // 	super(props);
  // 	this.state = {
  // 		allProducts: [],
  // 		total: 0,
  // 		countProducts: 0
  // 	};
  // }

  componentDidMount() {
    this.loadData()
  }
  uploadFileToS3 = (file) => {
    const s3 = new AWS.S3();
    const params = {
      Bucket: 'ecommerce-bucket-img',
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
    // var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
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
      
      <Router>
        <>
        <Header
                allProducts={this.state.allProducts}
                setAllProducts={(newProducts) => this.setState({ allProducts: newProducts })}
                total={this.state.total}
                setTotal={(newTotal) => this.setState({ total: newTotal })}
                countProducts={this.state.countProducts}
                setCountProducts={(newCount) => this.setState({ countProducts: newCount })}
              />
          <Routes>
            <Route path="/" element={<ProductList
                allProducts={this.state.allProducts}
                setAllProducts={(newProducts) => this.setState({ allProducts: newProducts })}
                total={this.state.total}
                setTotal={(newTotal) => this.setState({ total: newTotal })}
                countProducts={this.state.countProducts}
                setCountProducts={(newCount) => this.setState({ countProducts: newCount })}
              />} />
            <Route path="/Maps" element={<Maps/>}/>
            <Route path="/Admin" element={<Admin/>} />
          </Routes>
        </>
      </Router>
    );

    // 
    //   <Header
    //     allProducts={this.state.allProducts}
    //     setAllProducts={(newProducts) => this.setState({ allProducts: newProducts })}
    //     total={this.state.total}
    //     setTotal={(newTotal) => this.setState({ total: newTotal })}
    //     countProducts={this.state.countProducts}
    //     setCountProducts={(newCount) => this.setState({ countProducts: newCount })}
    //   />
    //   <Container className="d-flex flex-column-reverse">
    //     <ProductList
    //       allProducts={this.state.allProducts}
    //       setAllProducts={(newProducts) => this.setState({ allProducts: newProducts })}
    //       total={this.state.total}
    //       setTotal={(newTotal) => this.setState({ total: newTotal })}
    //       countProducts={this.state.countProducts}
    //       setCountProducts={(newCount) => this.setState({ countProducts: newCount })}
    //     />
    //   </Container>
    //   <Container className="d-flex flex-column-reverse">
    //     <div>
    //       <form>
    //         <input
    //           type="text"
    //           placeholder="Buscar..."
    //           onChange={(e) => this.handleSearch(e.target.value)}
    //         />
    //       </form>
    //     </div>
    //   </Container>
    //   <Container className="d-flex flex-column-reverse">
    //       <Maps />
    //   </Container>
    //   <Container>
    //       <Admin />
    //   </Container>
    // </>
    // );
  }
}
export default App;

