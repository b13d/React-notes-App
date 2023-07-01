"use client";

import Image from "next/image";
import Note from "@/components/Note";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { listNoteDecrement } from "@/Slice/noteSlice";
import { motion } from "framer-motion";
import { duration } from "moment";

export type TypeListData = {
  id: string[];
  content: string[];
  data: string[];
};

export type TypeNoteProps = {
  backGround: string;
};

export type TypePropStyle = {
  color: string;
  background: string;
  currentNoteBG: string;
  NotesBG: string;
};

export type TypeExample = {
  id: string[];
};

export default function Home() {
  const dispatch = useAppDispatch();
  // const [listNote, setListNote] = useState<string[]>([])
  const [listNote, setListNote] = useState<TypeListData>({
    id: [],
    content: [],
    data: [],
  });
  const [allListNote, setAllListNote] = useState<TypeListData>({
    id: [],
    content: [],
    data: [],
  });

  const [deleteID, setDeleteID] = useState("");
  const currentID: string | number = useAppSelector(
    (state) => state.counterNoteReducer.currentID
  ); // type change

  const [styleNote, setStyleNote] = useState({
    backgroundColor: "#fff585",
    borderRadius: 0.5 + "rem",
    height: 220 + "px",
    padding: 0.5 + "rem",
    margin: 0 + " auto",
  });
  const [search_term, setSearch_term] = useState("");
  const [styleBody, setStyleBody] = useState<TypePropStyle>({
    color: "black",
    background: "white",
    currentNoteBG: "#51bbaf",
    NotesBG: "#fff585",
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch_term(e.currentTarget.value);

    setListNote(ListNote(e.currentTarget.value));
  };

  const handleDelete = (id: string, listNote: TypeListData, index: number) => {
    // console.log(listNote)

    let objectNote: TypeListData = {
      id: [listNote.id[index]],
      content: [listNote.content[index]],
      data: [listNote.data[index]],
    };

    // console.log(objectNote)
    dispatch(listNoteDecrement({ id, objectNote }));

    setDeleteID(id);
    // console.log(e) // получение id текущего note
  };

  const variants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        duration: i * 0.3,
      },
    }),
  };

  const handleToogleMode = () => {
    let tempStyle = "";
    let tempNotesBG = "";

    if (styleBody.background === "white") {
      tempStyle = "#000000cc";
      tempNotesBG = "#b7af5f";
      setStyleBody({
        color: "white",
        background: "#000000cc",
        currentNoteBG: "#33766f",
        NotesBG: "#b7af5f",
      });
    } else {
      tempStyle = "white";
      tempNotesBG = "#fff585";

      setStyleBody({
        color: "black",
        background: "white",
        currentNoteBG: "#51bbaf",
        NotesBG: "#fff585",
      });
    }

    setStyleNote({
      ...styleNote,
      backgroundColor: tempNotesBG,
    });

    document.body.style.backgroundColor = tempStyle;
  };

  useEffect(() => {
    setListNote(ListNote());
  }, [currentID]);

  useEffect(() => {
    setListNote(ListNote());
  }, [deleteID]);

  function ListNote(tempText?: string): TypeListData {
    // let tempArr: object = []

    let currentNoteList: TypeListData = {
      id: [],
      content: [],
      data: [],
    };

    let tempArrAll: TypeListData = {
      id: [],
      content: [],
      data: [],
    };

    // console.log("Function ListNote")

    if (
      localStorage.getItem("listID") != null &&
      localStorage.getItem("listContent") != null &&
      localStorage.getItem("listData") != null
    ) {
      let listID = localStorage.getItem("listID")!.split(",");
      let listContent = localStorage.getItem("listContent")!.split("|");
      let listData = localStorage.getItem("listData")!.split(",");

      // console.log(listContent)

      if (localStorage.getItem("listContent")!.length === 0) {
        return currentNoteList;
      } else {
        for (
          let i = 0;
          i < localStorage.getItem("listContent")!.split("|").length;
          i++
        ) {
          if (
            ((tempText?.length === 0 || tempText === undefined) &&
              search_term.length === 0) ||
            listContent[i].substring(0, tempText?.length).toLowerCase() ===
              tempText?.substring(0, tempText?.length).toLowerCase()
          ) {
            currentNoteList.id.push(listID[i]);
            currentNoteList.content.push(listContent[i]);
            currentNoteList.data.push(listData[i]);
            // tempArr.push({
            //     id: listID[i],
            //     content: listContent[i],
            //     data: listData[i],
            // })
          }
          tempArrAll.id.push(listID[i]);
          tempArrAll.content.push(listContent[i]);
          tempArrAll.data.push(listData[i]);
        }

        setAllListNote(tempArrAll);
        return currentNoteList;
      }
    } else return currentNoteList;
  }
  return (
    <motion.div
      transition={{ duration: 2, ease: "easeInOut"}}
      className={`md:w-[1120px] m-auto ${
        styleBody.background === "white" ? "bg-[#F5F5DC]" : "bg-[#919162]"
      }  sm:p-5  min-h-[100vh]`}
    >
      <header className="max-sm: p-[10px]">
        <nav className="flex justify-between items-center">
          <h1
          style={{color : "#00000057"}}
            // style={{ color: styleBody.color }}
            className="text-4xl font-bold max-sm:text-[35px]"
          >
            Notes
          </h1>
          <button
            onClick={handleToogleMode}
            className="bg-[#cfcfcf6b] hover:rounded duration-300 active:rounded-md rounded-xl py-1 px-4"
          >
            Toggle Mode
          </button>
        </nav>
        {/*  */}
        <input
          className={`placeholder:focus:text-transparent outline-none ${
            styleBody.background === "white"
              ? "bg-gray-300 text-[#202020] placeholder-[#202020]"
              : "bg-[#4141414f] text-[#eeeeee] placeholder-[#eeeeee]"
          }  w-full rounded-lg pl-2 py-0.5 my-4 `}
          placeholder="type to search..."
          type="text"
          onChange={(e) => handleChange(e)}
        />
      </header>
      <main className="md:grid-cols-3  max-md:grid-cols-1 grid flex-wrap md:justify-between max-md:justify-center items-center gap-[2rem]">
        <Note backGround={styleBody.currentNoteBG} />
        {listNote !== undefined &&
          listNote.id.map((value, index: number) => {
            return (
              <motion.div
                custom={index}
                initial={{ opacity: 0 }}
                animate="visible"
                variants={variants}
                key={listNote.id[index]}
                id={listNote.id[index]}
                style={styleNote}
                className="sm:w-[350px] max-sm:w-auto"
              >
                <textarea
                  key={listNote.id[index]}
                  readOnly
                  value={listNote.content[index]}
                  placeholder="Type to add a note"
                  className="placeholder-[#5d9794] bg-transparent sm:w-[300px] w-[280px] h-[160px] resize-none tracking-wide font-semibold font-roboto text-lg rounded-lg outline-none"
                />

                <div className="flex justify-between">
                  <span className="font-semibold">{listNote.data[index]}</span>
                  <Image
                    onClick={() =>
                      handleDelete(listNote.id[index], allListNote, index)
                    }
                    src="/image/icon-delete.png"
                    alt="icon-delete"
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                </div>
              </motion.div>
            );
          })}
      </main>
    </motion.div>
  );
}
