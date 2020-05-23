import React from 'react'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import ProductList from '../components/Index/ProductList'
import ProductPagination from '../components/Index/ProductPagination'


function Home({ products, totalPages }) {
  return (
    <>
    <ProductList products={products} />
    <ProductPagination totalPages={totalPages} />
    </>
  )
}

Home.getInitialProps = async (ctx) => {
  const page = ctx.query.page ? ctx.query.page : '1'
  const size = 6
  const payload = { params: {page, size}}
  // fetch  data on server
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url, payload);
  return response.data;
  // return response data as an object
  // this object will be merged with existing props
}

export default Home;
