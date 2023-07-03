import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ITransport {
  name: string;
  driverName: string;
  category: string;
  categoryId: string;
  lat: number;
  lon: number;
  phone: string;
}

export interface ILanguage {
  lg: string;
  transport: ITransport;
  category: string;
}

const initialState: ILanguage = {
  lg: "ru",
  transport: {
    name: "",
    driverName: "",
    category: "",
    categoryId: "",
    lat: 0,
    lon: 0,
    phone: "freight",
  },
  category: "",
};

export const Myreducers = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLng: (state, action: PayloadAction<string>) => {
      state.lg = action.payload;
    },
    getTransport: (state, action: PayloadAction<ITransport>) => {
      state.transport = action.payload;
    },
    chooseCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { changeLng, getTransport, chooseCategory } = Myreducers.actions;

export default Myreducers.reducer;
