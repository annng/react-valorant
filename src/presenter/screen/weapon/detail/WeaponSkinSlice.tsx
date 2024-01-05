import { createSlice } from "@reduxjs/toolkit";
import { Skin } from "../../../../data/response/Weapons";

export interface WeaponSkinState{
    value : Skin | null
}

const initialState: WeaponSkinState = {
    value : null
}

export const skinSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      selectSkin: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.value = action.payload
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { selectSkin } = skinSlice.actions
  
  export default skinSlice.reducer