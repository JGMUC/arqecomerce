import React from 'react';
import axios from "axios";
import {
	Container,
} from "reactstrap";

class ProductList extends React.Component {
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
			<Container className="d-flex flex-column-reverse">
			<div className='container-items'>
				{this.state.data.map((product) => (
					<div className='item' key={product.id}>
						<figure>
							<img
							src={`https://ecommerce-bucket-img.s3.sa-east-1.amazonaws.com/${product.imagen.replace(' ','+')}`}
							className="img-fixed-size"
							/>
						</figure>
						<div className='info-product'>
							<h2>{product.nombre}</h2>
							<p className='price'>${product.valor_unitario}</p>
							<button onClick={() => this.onAddProduct(product)}>Añadir al carrito</button>
						</div>
					</div>
				))}
			</div>
			</Container>
		);
	}
}

export default ProductList;