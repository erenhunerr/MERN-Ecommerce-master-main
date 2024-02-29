import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from "axios";

function Tables({ user, data, reFetchUser }) {
  const handleEditOrder = async (item) => {
    try {
      if (
        window.confirm(
          `Siparişi ${item.status === "pending" ? "onaylamak" : ""
          } istediğinize emin misiniz ?`
        )
      ) {
        await axios.put(`/order/updateStatusOrder`, item);
        reFetchUser();
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleDeleteOrder = async (item) => {
    try {
      if (window.confirm("Siparişi silmek istediğinize emin misiniz ?")) {
        await axios.delete(`/order/deleteOrder/${item._id}`, item);
        reFetchUser();
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              ürün Adı
            </th>
            <th scope="col" class="px-6 py-3">
              Toplam Fiyat
            </th>
            <th scope="col" class="px-6 py-3">
              Kullanıcı Adı
            </th>
            <th scope="col" class="px-6 py-3">
              Durum
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {order.products[0].name}
            </th>
            <td class="px-6 py-4">{order.total}</td>
            <td class="px-6 py-4">
              {user.map((i) =>
                i._id === order.user_id ? i.name : ""
              )}
            </td>
            {order.status === "approved" ? (
              <td class="px-6 py-4">Onaylandı</td>
            ) : (
              <td class="px-6 py-4">Beklemede</td>

            )}

            <td class="px-6 py-4 text-right">
              {order.status === "approved" ?
                (<td class="font-bold text-green-600 ">Sipariş Onaylandı</td>)
                :
                (<Link
                  onClick={() => handleEditOrder(order)}
                  class="font-bold text-green-600  hover:underline"
                >
                  Onayla
                </Link>)}

            </td>
            <td class="px-6 py-4 text-right">
              <Link
                onClick={() => handleDeleteOrder(order)}
                class="font-bold text-red-600 dark:text-red-500 hover:underline"
              >
                Sil
              </Link>
            </td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
