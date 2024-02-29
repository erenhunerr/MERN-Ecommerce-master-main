import React from "react";
import Tables from "./Tables";
import useFetch from "../../hooks/useFetch";
import Loading from "../Loading";


const Index = ({ user }) => {
  const { data, loading, error, reFetchUser } = useFetch("/order/getAllOrder");

  return (
    <div class="p-4 sm:ml-64">
      <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">

        <div class="flex items-center justify-center mb-4 rounded dark:bg-gray-800">
          {loading && <Loading />}
          {!loading &&
            <Tables user={user} data={data} reFetchUser={reFetchUser}></Tables>}
        </div>
      </div>
    </div>
  );
};

export default Index;
