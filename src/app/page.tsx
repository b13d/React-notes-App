"use client";

import Image from 'next/image'
import Note from "@/components/Note";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listNoteDecrement} from "@/Slice/noteSlice";

type TypeListData = {
    id: string[],
    content: string[],
    data: string[]
}

export default function Home(props) {
    const count = useSelector((state) => state.counterNoteReducer.value)
    const dispatch = useDispatch()
    // const [listNote, setListNote] = useState<string[]>([])
    const [listNote, setListNote] = useState<TypeListData>({
        id: [],
        content: [],
        data: []
    })
    const [allListNote, setAllListNote] = useState<TypeListData>({
        id: [],
        content: [],
        data: []
    })
    const [deleteID, setDeleteID] = useState("")
    const currentID: number = useSelector((state) => state.counterNoteReducer.currentID)
    const [styleNote, setStyleNote] = useState({
        backgroundColor: "#fff585",
        borderRadius: 0.5 + "rem",
        width: 350 + "px",
        height: 220 + "px",
        padding: 0.5 + "rem",
    })
    const [search_term, setSearch_term] = useState("")

    const handleChange = (e) => {
        console.log("addEvent")

        setSearch_term(e.target.value);

        setListNote(ListNote(e.target.value))
    }


    const handleDelete = (id, listNote) => {
        dispatch(listNoteDecrement({
            id: id,
            listNote: listNote
        }, ""))


        setDeleteID(id)
        // console.log(e) // получение id текущего note
    }

    useEffect(() => {
        setListNote(ListNote())
    }, [currentID])

    useEffect(() => {
        setListNote(ListNote())
    }, [deleteID])


    function ListNote(tempText?: string): TypeListData {
        // let tempArr: object = []

        let currentNoteList: TypeListData = {
            id: [],
            content: [],
            data: [],
        }

        let tempArrAll: TypeListData = {
            id: [],
            content: [],
            data: [],
        }

        console.log("Function ListNote")

        if (localStorage.getItem("listContent") !== null) {
            let listID = localStorage.getItem("listID").split(',')
            let listContent = localStorage.getItem("listContent").split('|')
            let listData = localStorage.getItem("listData").split(',')

            console.log(listContent)

            if (localStorage.getItem("listContent").length === 0) {
                return currentNoteList
            } else {
                for (let i = 0; i < localStorage.getItem("listContent").split('|').length; i++) {
                    if (((tempText?.length === 0 || tempText === undefined) && search_term.length === 0) || listContent[i].substring(0, tempText?.length).toLowerCase() === tempText?.substring(0, tempText?.length).toLowerCase()) {
                        currentNoteList.id.push(listID[i])
                        currentNoteList.content.push(listContent[i])
                        currentNoteList.data.push(listData[i])
                        // tempArr.push({
                        //     id: listID[i],
                        //     content: listContent[i],
                        //     data: listData[i],
                        // })
                    }
                    tempArrAll.id.push(listID[i])
                    tempArrAll.content.push(listContent[i])
                    tempArrAll.data.push(listData[i])
                }


                setAllListNote(tempArrAll)
                return currentNoteList
            }
        }
    }

    return (
        <div className="md:w-[1120px] m-auto">
            <header>
                <nav className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold">Notes</h1>
                    <button className="bg-gray-300 rounded-2xl py-1 px-4">Toggle Mode</button>
                </nav>
                <input className="bg-gray-300 w-full rounded-lg pl-2 py-0.5 my-4 placeholder-gray-500"
                       placeholder="type to search..." type="text" onChange={(e) => handleChange(e)}/>
            </header>
            <main className="grid-cols-3 grid flex-wrap justify-between items-center gap-[2rem]">
                <Note/>
                {listNote !== undefined && listNote.id.map((value, index: number) => {
                    return (
                        <div key={listNote.id[index]} id={listNote.id[index]} style={styleNote}>
            <textarea key={listNote.id[index]} readOnly type="text" value={listNote.content[index]}
                      placeholder="Type to add a note"
                      className="placeholder-[#5d9794] bg-transparent w-[300px] h-[160px] resize-none tracking-wide font-semibold font-roboto text-lg rounded-lg outline-none"/>

                            <div className="flex justify-between">
                                <span className="font-semibold">{listNote.data[index]}</span>
                                <Image onClick={() => handleDelete(listNote.id[index], allListNote)}
                                       src="/image/icon-delete.png"
                                       alt="icon-delete"
                                       width={30}
                                       height={30} className="cursor-pointer"/>
                            </div>
                        </div>
                    )
                })}

            </main>
        </div>
    )
}
