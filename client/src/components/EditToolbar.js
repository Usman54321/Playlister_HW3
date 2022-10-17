import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let addSongClass = "playlister-button";
    let undoClass = "playlister-button";
    let redoClass = "playlister-button";
    let closeClass = "playlister-button";
    // If there is no current list, then disable the buttons
    // let hasList = store.currentList !== null;
    // if (!hasList) {
    //     return (
    //         <></>
    //     )
    // }
    if (!store.hasList() || store.hasModalOpen()) addSongClass += "-disabled";
    if (!store.canUndo() || store.hasModalOpen()) undoClass += "-disabled";
    if (!store.canRedo() || store.hasModalOpen()) redoClass += "-disabled";
    if (!store.hasList() || store.hasModalOpen()) closeClass += "-disabled";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }

    // let editStatus = false;
    // if (store.isListNameEditActive) {
    //     editStatus = true;
    // }

    function handleAddSong() {
        store.addSongTransaction();
    }

    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={!store.hasList() || store.hasModalOpen()}
                value="+"
                className={addSongClass}
                onClick={handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={!store.canUndo() || store.hasModalOpen()}
                value="⟲"
                className={undoClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={!store.canRedo() || store.hasModalOpen()}
                value="⟳"
                className={redoClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={!store.hasList() || store.hasModalOpen()}
                value="&#x2715;"
                className={closeClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;