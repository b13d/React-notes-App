import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeListData } from "@/app/page";
import { list } from "postcss";

type TypeData = {
  currentID: string;
  listData: string;
  listContent: string;
};

interface INFCounterNote {
  currentID: string | number;
  listID: string;
  listContent: string;
  listData: string;
}

let initialState: INFCounterNote = {
  currentID: 1,
  listID: "",
  listContent: "",
  listData: "",
};

if (typeof window !== 'undefined') {
  initialState = {
    currentID: localStorage.getItem("currentID") || 1,
    listID: localStorage.getItem("listID") || "",
    listContent: localStorage.getItem("listContent") || "",
    listData: localStorage.getItem("listData") || "",
  };
}


export const noteSlice = createSlice({
  name: "counterNote",
  initialState,
  reducers: {
    listNoteIncrement: (state, action) => {
      let listID = localStorage.getItem("listID");

      if (listID != null && listID.length > 0) {
        let arrListID = localStorage.getItem("listID")?.split(",");
        let arrlistContent = localStorage.getItem("listContent")?.split("|");
        let arrlistData = localStorage.getItem("listData")?.split(",");

        if (
          arrListID != undefined &&
          arrlistContent != undefined &&
          arrlistData != undefined
        ) {
          arrListID.push(state.currentID.toString());
          arrlistContent.push(action.payload.listContent);
          arrlistData.push(action.payload.listData);

          localStorage.setItem("listID", arrListID.join(","));
          localStorage.setItem("listContent", arrlistContent.join("|"));
          localStorage.setItem("listData", arrlistData.join(","));
        }
      } else {
        localStorage.setItem("listID", state.currentID.toString());
        localStorage.setItem("listContent", action.payload.listContent);
        localStorage.setItem("listData", action.payload.listData);
      }
      state.currentID = Number(state.currentID) + 1;
      localStorage.setItem("currentID", state.currentID.toString());
    },
    listNoteDecrement: (state, action) => {
      //   console.log(action);

      let listNote: TypeListData = action.payload.objectNote;
      const currentID = action.payload.id;

      //   console.log(listNote);

      const listID: string[] = [];
      const listContent: string[] = [];
      const listData: string[] = [];

      let localListID = localStorage.getItem("listID");
      let localListContent = localStorage.getItem("listContent");
      let localListData = localStorage.getItem("listData");

      let arr: string = localListID || "";

      let lists: TypeData[] = [];

      if (
        localListID != null &&
        localListContent != null &&
        localListData != null
      ) {
        for (let i = 0; i < localListID.split(",").length; i++) {
          lists.push({
            currentID: localListID.split(",")[i],
            listContent: localListContent.split("|")[i],
            listData: localListData.split(",")[i],
          });
        }

        arr.split(",").filter((item, index) => {
          if (item === currentID) {
          } else {
            listID.push(lists[index].currentID);
            listContent.push(lists[index].listContent);
            listData.push(lists[index].listData);
          }
        });

        localStorage.setItem("listID", listID.join(","));
        localStorage.setItem("listContent", listContent.join("|"));
        localStorage.setItem("listData", listData.join(","));
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { listNoteIncrement, listNoteDecrement } = noteSlice.actions;

export default noteSlice.reducer;
