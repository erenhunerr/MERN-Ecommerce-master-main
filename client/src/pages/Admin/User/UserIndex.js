import axios from 'axios';
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function UserIndex({ data, reFetchUser }) {

    const handleEditRoleUser = async (item) => {
        try {
            if (
                window.confirm(
                    `Kullancıyı admin yapmak istediğinize emin misiniz ?`
                )
            ) {
                await axios.put(`/user/updateRoleUser`, item);
                reFetchUser();
            }
        } catch (error) {
            toast.error(error.response.data);
        }
    };
    const handleEditUser = async (item) => {
        try {
            if (
                window.confirm(
                    `Kullancıyı ${item.status === "active" ? "pasif" : "aktif"
                    } duruma getirmek istediğinize emin misiniz ?`
                )
            ) {
                await axios.put(`/user/updateStatusUser`, item);
                reFetchUser();
            }
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    const handleDeleteUser = async (item) => {
        try {
            if (window.confirm("Kullancıyı silmek istediğinize emin misiniz ?")) {
                await axios.delete(`/user/deleteUser/${item._id}`, item);
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
                                        Ad Soyad
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        E-Mail
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Telefon
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Puan
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Rol
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Durum
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user) => (<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th
                                        scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {user.name}
                                    </th>
                                    <td class="px-6 py-4">{user.email}</td>
                                    <td class="px-6 py-4">{user.phone}</td>
                                    <td class="px-6 py-4">{user.point}</td>
                                    <td class="px-6 py-4">{user.role === "admin" ? "Admin" : "Kullanıcı"}</td>
                                    {user.status === "active" ? (
                                        <td class="px-6 py-4">Aktif</td>
                                    ) : (
                                        <td class="px-6 py-4">Pasif</td>

                                    )}

                                    <td class="px-6 py-4 text-right">
                                        {
                                            user.role === "user" &&
                                            <Link
                                                onClick={() => handleEditRoleUser(user)}
                                                class="font-bold text-blue-600 dark:text-red-500 hover:underline"
                                            >
                                                Admin Yap
                                            </Link>
                                        }
                                    </td>

                                    <td class="px-6 py-4 text-right">
                                        <Link
                                            onClick={() => handleEditUser(user)}
                                            class="font-bold text-green-600 dark:text-red-500 hover:underline"
                                        >
                                            Aktif/Pasif
                                        </Link>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <Link
                                            onClick={() => handleDeleteUser(user)}
                                            class="font-bold text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            Sil
                                        </Link>
                                    </td>
                                </tr>))}

                            </tbody>
                        </table>
                    </div>                </div>
            </div>
        </div>
    )
}

export default UserIndex