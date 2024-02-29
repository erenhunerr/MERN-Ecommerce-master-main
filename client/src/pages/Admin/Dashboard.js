import React from "react";
import Index from "../../components/Admin/Index";
import Sidebar from "../../components/Admin/Sidebar";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";

function Dashboard() {
  const { data, loading, error, reFetchUser } = useFetch("/user/getUser");

  return (
    <>
      <Sidebar></Sidebar>
      {loading && <Loading />}
      {!loading &&
        <Index user={data} reFetchUser={reFetchUser}></Index>}
    </>
  );
}

export default Dashboard;
