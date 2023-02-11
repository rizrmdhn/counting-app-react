import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    showClass: {
        popup: `animate__animated animate__fadeInRight`,
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutRight',
    },
});

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        lists: [],
        viewData: [],
        editData: [],
        dataId: [],
        isLoading: false,
    },
    reducers: {
        getLists: (state, action) => {
            state.lists = action.payload;
        },
        getViewData: (state, action) => {
            state.viewData = action.payload;
        },
        getViewDataId: (state, action) => {
            state.dataId = action.payload;
        },
        getEditData: (state, action) => {
            state.editData = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    },
});

export const fetchData = () => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            dispatch(setIsLoading(true));
            const res = await axios.get('http://localhost:5000/acara');
            const { acara } = res.data.data;
            return acara;
        }

        try {
            const data = await fetchHandler();
            setTimeout(async () => {
                dispatch(setIsLoading(false));
            }, 2000);
            dispatch(getLists(data));
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        }
    }
};

export const fetchViewData = (id) => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            dispatch(setIsLoading(true));
            const res = await axios.get(`http://localhost:5000/acara/${id}/kegiatan/`);
            const { acara } = res.data.data;
            return acara;
        }

        try {
            const data = await fetchHandler();
            setTimeout(async () => {
                dispatch(setIsLoading(false));
            }, 2000);
            dispatch(getViewData(data));
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        }
    }
}

export const addAcara = (data) => {
    return async (dispatch) => {
        const { namaAcara, tahunAcara, } = data;
        const addHandler = async () => {
            const res = await axios.post(`http://localhost:5000/acara`, {
                namaAcara: namaAcara,
                tahunAcara: tahunAcara,
            });
            Toast.fire({
                icon: 'success',
                title: 'Data berhasil ditambahkan',
            });
            const { acara } = res.data.data;
            return acara;
        }

        await addHandler().catch((error) => {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        });

        dispatch(fetchData());
    }
}

export const addKegiatan = (data) => {
    return async (dispatch) => {
        const { namaKegiatan, tahunKegiatan, acaraId, } = data;
        const addHandler = async () => {
            const res = await axios.post(`http://localhost:5000/kegiatan`, {
                namaKegiatan: namaKegiatan,
                tahunKegiatan: tahunKegiatan,
                acaraId: acaraId,
            });
            Toast.fire({
                icon: 'success',
                title: 'Data berhasil ditambahkan',
            });
            const { acara } = res.data.data;
            return acara;
        }

        await addHandler().catch((error) => {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        });
        dispatch(fetchViewData(acaraId));
    }
}

export const addKegiatanFisik = (data) => {
    return async (dispatch) => {

        const { kegiatanFisik, quantity, unit, alokasiDana, kegiatanId, acaraId, } = data;
        const addHandler = async () => {
            const res = await axios.post(`http://localhost:5000/kegiatan-fisik`, {
                namaKegiatanFisik: kegiatanFisik,
                quantityKegiatanFisik: quantity,
                unitKegiatanFisik: unit,
                alokasiDanaKegiatanFisik: alokasiDana,
                kegiatanId: kegiatanId,
            });
            Toast.fire({
                icon: 'success',
                title: 'Data berhasil ditambahkan',
            });
            const { acara } = res.data.data;
            return acara;
        }

        await addHandler().catch((error) => {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        });
        dispatch(fetchViewData(acaraId));
    }
}

export const addDataId = (data) => {
    return async (dispatch) => {
        try {
            dispatch(getViewDataId(data));
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        }
    }
}

export const getViewEditData = (data) => {
    return async (dispatch) => {
        try {
            dispatch(getEditData(data));
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        }
    }
}


export const deleteAcara = (id) => {
    return async (dispatch) => {
        const deleteHandler = async () => {
            const res = await axios.delete(`http://localhost:5000/acara/${id}`)
            return res;
        }

        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteHandler().catch((err) => {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message,
                    })
                }).then((res) => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Data berhasil dihapus',
                    });
                });
                dispatch(fetchData());
            }
        });

    }
}


export const deleteKegiatan = (data) => {
    return async (dispatch) => {
        const { acaraId, kegiatanId } = data;
        const deleteHandler = async () => {
            const res = await axios.delete(`http://localhost:5000/kegiatan/${kegiatanId}`)
            return res;
        }

        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteHandler().catch((err) => {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message,
                    })
                }).then(() => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Data berhasil dihapus',
                    });
                });
                dispatch(fetchViewData(acaraId));
            }
        });
    }
}

export const deleteKegiatanFisik = (data) => {
    return async (dispatch) => {
        const { kegiatanFisikId, acaraId } = data;
        const deleteHandler = async () => {
            const res = await axios.delete(`http://localhost:5000/kegiatan-fisik/${kegiatanFisikId}`);
            return res;
        }


        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteHandler().catch((err) => {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message,
                    })
                }).then(() => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Kegiatan fisik berhasil dihapus',
                    });
                });
                dispatch(fetchViewData(acaraId));
            }
        });
    }
}

export const editAcara = (data) => {
    return async (dispatch) => {
        const { id, namaAcara, tahunAcara, } = data;
        const editHandler = async () => {
            const res = await axios.put(`http://localhost:5000/acara/${id}`, {
                namaAcara: namaAcara,
                tahunAcara: tahunAcara,
            });
            Toast.fire({
                icon: 'success',
                title: 'Data berhasil diubah',
            });
            return res;
        }

        await editHandler().catch((err) => {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.message,
            })
        });

        dispatch(fetchData());
    }
};

export const editKegiatan = (data) => {
    return async (dispatch) => {
        const { id, namaKegiatan, tahunKegiatan, acaraId, } = data;
        const editHandler = async () => {
            const res = await axios.put(`http://localhost:5000/kegiatan/${id}`, {
                namaKegiatan: namaKegiatan,
                tahunKegiatan: tahunKegiatan,
                acaraId
            });
            Toast.fire({
                icon: 'success',
                title: 'Data berhasil diubah',
            });
            return res;
        }

        await editHandler().catch((err) => {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.message,
            })
        });
        dispatch(fetchViewData(acaraId));
    }
};

export const editKegiatanFisik = (data) => {
    return async (dispatch) => {
        const { id, kegiatanFisik, quantity, unit, alokasiDana, kegiatanId, acaraId, } = data;
        const editHandler = async () => {
            const res = await axios.put(`http://localhost:5000/kegiatan-fisik/${id}`, {
                namaKegiatanFisik: kegiatanFisik,
                quantityKegiatanFisik: quantity,
                unitKegiatanFisik: unit,
                alokasiDanaKegiatanFisik: alokasiDana,
                kegiatanId: kegiatanId,
            });
            Toast.fire({
                icon: 'success',
                title: 'Data berhasil diubah',
            });
            return res;
        }

        await editHandler().catch((err) => {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.message,
            })
        });

        dispatch(fetchViewData(acaraId));
    }
}

export const { getLists, getViewData, getViewDataId, getEditData, setIsLoading } = dataSlice.actions;

export const showData = (state) => state.data.lists;
export const showViewData = (state) => state.data.viewData;
export const showDataId = (state) => state.data.dataId;
export const showViewEditData = (state) => state.data.editData;
export const isLoadingState = (state) => state.data.isLoading;

export default dataSlice.reducer;