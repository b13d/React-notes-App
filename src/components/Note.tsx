"use client";

import { useState, useRef, TextareaHTMLAttributes } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { listNoteIncrement } from "@/Slice/noteSlice";
import Image from "next/image";
import moment from "moment";
import { TypeNoteProps, TypePropStyle } from "@/app/page";

export default function Note(props: TypeNoteProps) {
  const [content, setContent] = useState("");
  const [counter, setCount] = useState(200);
  const [messageError, setMessageError] = useState("");
  const [styleNote, setStyleNote] = useState({
    backgroundColor: "#51bbaf",
    borderRadius: 0.5 + "rem",
    width: 350 + "px",
    height: 220 + "px",
    padding: 0.5 + "rem",
  });
  const [wasSave, setSave] = useState(false);
  const refTextarea: React.Ref<HTMLTextAreaElement> = useRef(null);
  const refDiv = useRef(null);
  const refData = useRef(null);
  const [focus, setFocus] = useState(false);

  const currentID: string | number = useAppSelector(
    (state) => state.counterNoteReducer.currentID
  );
  const dispatch = useAppDispatch();

  if (styleNote.backgroundColor !== props.backGround) {
    setStyleNote({
      ...styleNote,
      backgroundColor: props.backGround,
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length < 201) {
      setContent(e.target.value);
      setCount(200 - e.target.value.length);
    } else {
      setMessageError("Вы превысили длину сообщения!");
    }
  };

  const handleBtnSave = () => {
    if (counter === 200 || content.trim().length === 0) {
      setMessageError("Вы не ввели текст!");
      // console.log("Вы не ввели текст!");
      setTimeout(() => {
        setContent("");
        setCount(200);
      }, 100);
      setTimeout(() => {
        setMessageError("");
      }, 3000);
    } else {
      setSave(true);

      if (refTextarea.current !== null) {
        dispatch(
          listNoteIncrement(
            {
              currentID: currentID,
              listContent: refTextarea.current.value,
              listData: moment().format("L").toString(),
            }
          )
        );
      }

      setTimeout(() => {
        setContent("");
        setCount(200);
      }, 100);

      setSave(false);
    }
  };

  const handleReset = () => {
    setContent("");
    setCount(200);
  };

  const onFocus = () => {
    setFocus(true);
  };

  const onFocusout = () => {
    setFocus(false);
  };

  const handleClickEnter = (e: React.HTMLInputTypeAttribute) => {
    if (focus && e === "Enter") {
      handleBtnSave();
    }
  };

  return (
    <div ref={refDiv} style={styleNote}>
      <textarea
        ref={refTextarea}
        onFocus={onFocus}
        onBlur={onFocusout}
        onKeyDown={(e) => handleClickEnter(e.key)}
        onChange={(e) => handleChange(e)}
        value={content}
        placeholder="Type to add a note..."
        className="placeholder-[#2a9d8f] bg-transparent w-[300px] h-[160px] resize-none tracking-wide font-semibold font-roboto text-lg rounded-lg outline-none"
      />

      <div className="flex justify-between">
        {!wasSave && <span className="font-semibold">{counter}</span>}
        {wasSave && (
          <span ref={refData} className="font-semibold">
            {moment().format("L")}
          </span>
        )}
        <span className="text-red-600 font-semibold text-sm pl-2">
          {messageError}
        </span>
        <div className="flex gap-2">
          {messageError.length === 0 && !wasSave && (
            <button
              onClick={handleBtnSave}
              className="bg-gray-300 rounded-lg py-0.5 px-1.5"
            >
              save
            </button>
          )}
          {!wasSave && (
            <Image
              onClick={handleReset}
              src="/image/icon-reset.png"
              alt="icon-reset"
              width={30}
              height={30}
              className="cursor-pointer"
            />
          )}
        </div>
        {wasSave && (
          <Image
            src="/image/icon-delete.png"
            alt="icon-delete"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
