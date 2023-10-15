// "use client";

// import ImageEditor from "@toast-ui/react-image-editor";
// import "tui-image-editor/dist/tui-image-editor.css";
// import Bottle from "../../public/bottle-removebg.png";
// import { useEffect, useRef, useState } from "react";
// import "./component.global.css";

// export const EditorComponent = () => {
//   const [imageToBeEdited, setImageTobeEdited] = useState("");

//   const editorOptions = {
//     usageStatistics: false,
//     cssMaxHeight: 800,
//     cssMaxWidth: 700,
//     selectionStyle: {
//       cornerSize: 20,
//       rotatingPointOffset: 70,
//     },
//     onload: () => {
//       console.log("Loading ImAGE");
//       setImageTobeEdited(
//         "https://images.unsplash.com/photo-1696616297091-c07da52da503?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
//       );
//     },
//   };

//   const handleSave = ()=> {
//     const TuiImageEditor = new ImageEditor()
//     const image = TuiImageEditor.toDataUrl();
//     console.log("image",image);
//   }

//   return (
//     <>
//       {Bottle && (
//         <ImageEditor
//           includeUI={{
//             loadImage: {
//               path: "https://images.unsplash.com/photo-1544003484-3cd181d17917?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
//               name: "SampleImage",
//             },
//             menu: ["text", "icon"],
//             initMenu: "text",
//             uiSize: {
//               width: "100%",
//             },
//             menuBarPosition: "bottom",
//           }}
//           {...editorOptions}
//         />
//       )}
//       <button onClick={handleSave}>save</button>
//     </>
//   );
// };

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
