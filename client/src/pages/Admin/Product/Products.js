import React from 'react'
import Sidebar from '../../../components/Admin/Sidebar'
import ProductIndex from './ProductIndex'
import useFetch from '../../../hooks/useFetch';
import Loading from '../../../components/Loading';

function Products() {
    const { data, loading, error, reFetchUser } = useFetch("/product/getAllProduct");
    return (
        <>
            <Sidebar></Sidebar>
            {loading && <Loading />}
            {!loading &&
                <ProductIndex data={data} reFetchUser={reFetchUser}></ProductIndex>}
        </>
    )
}

export default Products