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
    if (!store.hasList()) addSongClass += "-disabled";
    if (!store.canUndo()) undoClass += "-disabled";
    if (!store.canRedo()) redoClass += "-disabled";
    if (!store.hasList()) closeClass += "-disabled";

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

    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }

    function handleAddSong() {
        store.addSongTransaction();
    }

    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={editStatus || !store.hasList()}
                value="+"
                className={addSongClass}
                onClick={handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={editStatus || !store.canUndo()}
                value="⟲"
                className={undoClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={editStatus || !store.canRedo()}
                value="⟳"
                className={redoClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={editStatus || !store.hasList()}
                value="&#x2715;"
                className={closeClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;