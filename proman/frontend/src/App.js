import * as React from 'react'
import {useEffect, useState} from 'react'
import Navbar from "./component/navbar/Navbar";
import ModalContainer from "./component/modal/ModalContainer";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Boards from "./component/table/Table";
import DragAndDropProvider from "./context/DragAndDropProvider";
import PayloadGeneratorProvider from "./context/PayloadGeneratorProvider";
import {useUser} from "./context/UserProvider";
import {useBoards, useFetchBoards, useSetBoards} from "./context/BoardProvider";


export default function App() {
    const [modalContent, setModalContent] = useState("welcome");
    const [show, setShow] = useState(true);
    const user = useUser();
    const boards = useBoards();
    const setBoards = useSetBoards();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const fetchBoards = useFetchBoards();

    const props = {
        modalContent: modalContent,
        setModalContent: setModalContent,
        show: show,
        setShow: setShow,
        handleShow: handleShow,
        handleClose: handleClose,
    };

    useEffect(() =>{
        fetchBoards(user)
    })


    return (
        <>
                <PayloadGeneratorProvider>
                    <DragAndDropProvider currentState={boards} setState={setBoards}>
                        <Navbar props={props}/>
                        <ModalContainer props={props}/>
                        <Boards boards={[...boards]} props={props}/>
                    </DragAndDropProvider>
                </PayloadGeneratorProvider>
        </>
    )
}
