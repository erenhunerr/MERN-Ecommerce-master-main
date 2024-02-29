import React from 'react'
import Sidebar from '../../../components/Admin/Sidebar'
import UserIndex from './UserIndex'
import Loading from '../../../components/Loading';
import useFetch from '../../../hooks/useFetch';

function Users() {
    const { data, loading, error, reFetchUser } = useFetch("/user/getUser");

    return (
        <>
            <Sidebar></Sidebar>
            {loading && <Loading />}
            {!loading &&
                <UserIndex data={data} reFetchUser={reFetchUser}></UserIndex>}
        </>
    )
}

export default Users