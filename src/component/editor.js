"use client";

import React, { useState, useRef, useEffect } from "react";
import ImageEditor from "tui-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";
import "./component.global.css";

let imageEditorInstance;

const EditorComponent = ({onSave , isClickedState }) => {
  const [editedImage, setEditedImage] = useState(null);
  const [editorInstance, setEditorInstance] = useState(null);
  const imageEditorRef = useRef();

  const handleImageLoad = () => {
    imageEditorInstance = new ImageEditor(
      document.querySelector("#tui-image-editor"),
      {
        includeUI: {
          loadImage: {
            path: "https://images.unsplash.com/photo-1544003484-3cd181d17917?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
            name: "SampleImage",
          },
          theme: {
            "common.backgroundColor": "white",
          },
          menu: ["text", "icon"],
          initMenu: "text",
          uiSize: {
            width: "100%",
          },
          menuBarPosition: "bottom",
        },
      }
    );
    setEditorInstance(imageEditorInstance);
    console.log("imageEditorInstance :: 1", imageEditorInstance);
  };

  useEffect(() => {
    handleImageLoad();
  }, []);

  const handleSave = () => {
    const editedImageData = editorInstance.toDataURL();
    setEditedImage(editedImageData);
    console.log("editedImage", editedImage);
    onSave(editedImageData)
  };


  useEffect(()=> {
    if(isClickedState){
      handleSave()
    }
  },[isClickedState])

  console.log("editedImage", editedImage);

  return (
    <div className="w-[90%] mx-auto justify-center items-center overflow-[hidden] p-10">
      <div
        id="tui-image-editor"
        ref={imageEditorRef}
        style={{ width: "100%", height: "900px" }}
      ></div>
    </div>
  );
};

export { EditorComponent };
