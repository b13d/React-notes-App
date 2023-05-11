"use client";

import Image from 'next/image'
import Note from "@/components/Note";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {listNoteDecrement} from "@/Slice/noteSlice";


export default function Home(props) {
    const count = useSelector((state) => state.counterNoteReducer.value)
    const dispatch = useDispatch()
    const [listNote, setListNote] = useState<string[]>([])
    const [deleteID, setDeleteID] = useState("")
    const currentID: number = useSelector((state) => state.counterNoteReducer.currentID)
    const [styleNote, setStyleNote] = useState({
        backgroundColor: "#fff585",
        borderRadius: 0.5 + "rem",
        width: 350 + "px",
        height: 220 + "px",
        padding: 0.5 + "rem",
    })

    let search_term = ""

    const handleChange = (e) => {
        console.log("addEvent")

        search_term = e.target.value;

        console.log(search_term)

        setListNote(ListNote())
    }


    const handleDelete = (id, listNote) => {
        dispatch(listNoteDecrement({
            id: id,
            listNote: listNote
        }, ""))


        console.log("id: " + id + " deleteID " + deleteID)
        setDeleteID(id)
        // console.log(e) // получение id текущего note
    }

    useEffect(() => {
        console.log("Перезагрузка listNote")
        setListNote(ListNote())
    }, [currentID])

    useEffect(() => {
        console.log("Перезагрузка listNote")
        setListNote(ListNote())
    }, [deleteID])


    function ListNote(): string[] {
        let tempArr = []

        console.log("Function ListNote")

        if (localStorage.getItem("listContent") !== null) {
            let listID = localStorage.getItem("listID").split(',')
            let listContent = localStorage.getItem("listContent").split('|')
            let listData = localStorage.getItem("listData").split(',')

            console.log(listContent)

            if (localStorage.getItem("listContent").length === 0) {
                return tempArr
            } else {
                for (let i = 0; i < localStorage.getItem("listContent").split('|').length; i++) {
                    if (search_term.length === 0 || listContent[i].substring(0, search_term.length).toLowerCase() === search_term.substring(0, search_term.length).toLowerCase()) {
                        tempArr.push({
                            id: listID[i],
                            content: listContent[i],
                            data: listData[i],
                        })
                    }
                }

                console.log(tempArr)
                return tempArr
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
                {listNote !== undefined && listNote.map((value, index) => {
                    return (
                        <div key={value.id} id={value.id} style={styleNote}>
            <textarea key={value.id} readOnly type="text" value={value.content}
                      placeholder="Type to add a note"
                      className="placeholder-[#5d9794] bg-transparent w-[300px] h-[160px] resize-none tracking-wide font-semibold font-roboto text-lg rounded-lg outline-none"/>

                            <div className="flex justify-between">
                                <span className="font-semibold">{value.data}</span>
                                <Image onClick={() => handleDelete(value.id, listNote)} src="/image/icon-delete.png"
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
