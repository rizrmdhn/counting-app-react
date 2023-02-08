import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        lists: [],
        viewData: [],
        dataId: [],
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
    },
});

export const fetchData = () => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await axios.get('http://localhost:5000/acara');
            const { acara } = res.data.data;
            return acara;
        }

        try {
            const data = await fetchHandler();
            dispatch(getLists(data));
        } catch (error) {
            throw new Error(error);
        }
    }
};

export const fetchViewData = (id) => {
    return async (dispatch) => {
        const fetchHandler = async () => {
            const res = await axios.get(`http://localhost:5000/acara/${id}/kegiatan/`);
            const { acara } = res.data.data;
            return acara;
        }

        try {
            const data = await fetchHandler();
            dispatch(getViewData(data));
        } catch (error) {
            throw new Error(error);
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
            const { acara } = res.data.data;
            return acara;
        }

        try {
            await addHandler();
            dispatch(fetchData());
        } catch (error) {
            throw new Error(error);
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
            const { acara } = res.data.data;
            return acara;
        }
        try {
            await addHandler();
            dispatch(fetchViewData(acaraId));
        } catch (error) {
            throw new Error(error);
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
            const { acara } = res.data.data;
            return acara;
        }

        try {
            await addHandler();
            dispatch(fetchViewData(acaraId));
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const addDataId = (data) => {
    return async (dispatch) => {
        try {
            dispatch(getViewDataId(data));
        } catch (error) {
            throw new Error(error);
        }
    }
}



export const { getLists, getViewData, getViewDataId } = dataSlice.actions;
export const showData = (state) => state.data.lists;
export const showViewData = (state) => state.data.viewData;
export const showDataId = (state) => state.data.dataId;

export default dataSlice.reducer;