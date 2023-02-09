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

        try {
            await addHandler();
            dispatch(fetchData());
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        }
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
        try {
            await addHandler();
            dispatch(fetchViewData(acaraId));
        } catch (error) {
            throw MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        }
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

        try {
            await addHandler();
            dispatch(fetchViewData(acaraId));
        } catch (error) {
            throw MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        }
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

export const deleteKegiatanFisik = (data) => {
    return async (dispatch) => {
        const { kegiatanFisikId, acaraId } = data;
        const deleteHandler = async () => {
            const res = await axios.delete(`http://localhost:5000/kegiatan-fisik/${kegiatanFisikId}`);
            return res;
        }

        try {
            await deleteHandler();
            dispatch(fetchViewData(acaraId));
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
            })
        }
    }
}

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

        try {
            await editHandler();
            dispatch(fetchViewData(acaraId));
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        }
    }
}

export const { getLists, getViewData, getViewDataId, getEditData, setIsLoading } = dataSlice.actions;

export const showData = (state) => state.data.lists;
export const showViewData = (state) => state.data.viewData;
export const showDataId = (state) => state.data.dataId;
export const showViewEditData = (state) => state.data.editData;
export const isLoadingState = (state) => state.data.isLoading;

export default dataSlice.reducer;