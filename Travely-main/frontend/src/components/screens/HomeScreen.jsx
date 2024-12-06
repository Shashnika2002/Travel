import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import Product from "../market/Product";
import LoadingBox from "../market/LoadingBox";
import MessageBox from "../market/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default function HomeScreen() {
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.response?.data?.message || err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Anastacia</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {product.map((item) => (
              <Col key={item.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={item}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
