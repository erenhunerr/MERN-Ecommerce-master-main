import axios from 'axios';
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function ProductIndex({ data, reFetchUser }) {

    const handleEditProduct = async (item) => {
        try {
            if (
                window.confirm(
                    `Ürünü ${item.status === "active" ? "pasif" : "aktif"
                    } duruma getirmek istediğinize emin misiniz ?`
                )
            ) {
                await axios.put(`/product/updateStatusProduct`, item);
                reFetchUser();
            }
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    const handleDeleteProduct = async (item) => {
        try {
            if (window.confirm("Ürünü silmek istediğinize emin misiniz ?")) {
                await axios.delete(`/product/deleteProduct/${item._id}`, item);
                reFetchUser();
            }
        } catch (error) {
            toast.error(error.response.data);
        }
    };
    return (
        <div class="p-4 sm:ml-64">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                <div class="flex items-center justify-center mb-4 rounded dark:bg-gray-800">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Ürün Adı
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Kategori
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Açıklama
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Stok
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Fiyatı
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Durumu
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((product) => (<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {product.name}
                                    </th>
                                    <td class="px-6 py-4">{product.category}</td>
                                    <td class="px-6 py-4">{product.description}</td>
                                    <td class="px-6 py-4">{product.stock}</td>
                                    <td class="px-6 py-4">{product.price}</td>
                                    {product.status === "active" ? (
                                        <td class="px-6 py-4">Aktif</td>
                                    ) : (
                                        <td class="px-6 py-4">Pasif</td>

                                    )}

                                    <td class="px-6 py-4 text-right">
                                        <Link
                                            onClick={() => handleEditProduct(product)}
                                            class="font-bold text-green-600 dark:text-red-500 hover:underline"
                                        >
                                            Aktif/Pasif
                                        </Link>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <Link
                                            onClick={() => handleDeleteProduct(product)}
                                            class="font-bold text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            Sil
                                        </Link>
                                    </td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Toaster position="top-right" />
        </div>
    )
}

export default ProductIndex