import React from 'react';
// import { data } from '../data';
import axios from "axios";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";


const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

class Maps extends React.Component {
    state = {
        form: [],
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = {
            nombre: event.target.nombre.value,
            direccion: event.target.direccion.value,
            metodoPago: event.target.metodoPago.value,
        };
        this.setState({ form });
    };

    render() {
        return (
            <>
            <Container className="d-flex flex-column-reverse">

                <LoadScript
                    googleMapsApiKey="AIzaSyAwB0kxB-CPnhtjFHjFCQflPm4lOuxl53E"
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                    >
                    </GoogleMap>
                </LoadScript>
                <FormGroup>
                    <label>
                        Nombre:
                        <input className="form-control" type="text" name="nombre" />
                    </label>
                    <br />
                    <label>
                        Dirección:
                        <input className="form-control" type="text" name="direccion" />
                    </label>
                    <br />
                    <label>
                        Método de pago:
                        <select className="form-control" name="metodoPago">
                            <option value="tarjeta">Tarjeta de crédito</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </label>
                    <br />
                    <Button
                            color="primary"
                            onClick={() => this.editar(this.state.form)}>
                        Pagar
                    </Button>
                </FormGroup>
            </Container>
            </>
        );
    }
}

export default Maps;