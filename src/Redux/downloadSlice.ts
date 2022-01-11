import { createSlice } from "@reduxjs/toolkit";

export const downloadSlice = createSlice({
  name: "downloads",
  initialState: {
    gamesToDownload: [
      {
        name: "7 days to die",
        links: [
          "https://www.mediafire.com/file/mdh699yze0f2ara/7.Days.to.Die.A20.B238.7z/file",
        ],
      },
    ],
  },
  reducers: {
    addDownload: (state, action) => {
      state.gamesToDownload.push(action.payload);
    },
  },
});

export const { addDownload } = downloadSlice.actions;

export default downloadSlice.reducer;
