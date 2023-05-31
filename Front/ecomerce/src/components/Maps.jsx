import React from 'react';
// import { data } from '../data';
import axios from "axios";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

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
		data: [],
	}

	onAddProduct = (product) => {
		const { allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal } = this.props;

		if (allProducts.find((item) => item.id === product.id)) {
			const products = allProducts.map((item) =>
				item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
			);
			setTotal(total + product.price * product.quantity);
			setCountProducts(countProducts + product.quantity);
			return setAllProducts([...products]);
		}

		setTotal(total + product.price * product.quantity);
		setCountProducts(countProducts + product.quantity);
		setAllProducts([...allProducts, product]);
	};

	loadData() {
		axios.get("http://localhost:8080/api/productos")
			.then(response =>
				response.data)
			.then(data => {
				this.setState({ data });
			});
	}

	componentDidMount() {
		this.loadData()
	}

	render() {
		return (
			<LoadScript
            googleMapsApiKey=""
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              { /* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
          </LoadScript>
		);
	}
}

export default Maps;