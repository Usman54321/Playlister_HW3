import { useContext } from "react";
import { GlobalStoreContext } from "../store";

function DeleteSongModal() {
    const { store } = useContext(GlobalStoreContext);
    // let name = "";
    // if (store.songToDelete) {
    //     name = store.currentList.songs[store.songToDelete].title;
    //     // console.log("name: " + name);
    // }

    function deleteSongCallback() {
        store.deleteSongTransaction();
    }

    function hideDeleteSongModalCallback() {
        store.hideDeleteSongModal();
    }

    return (
        <div
            className="modal"
            id="delete-song-modal"
            data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-delete-song-root'>
                <div className="modal-north">
                    Delete playlist?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently remove <span id="delete-song-span"></span> from the playlist?
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button"
                        id="delete-song-confirm-button"
                        className="modal-button"
                        onClick={deleteSongCallback}
                        value='Confirm' />
                    <input type="button"
                        id="delete-song-cancel-button"
                        className="modal-button"
                        onClick={hideDeleteSongModalCallback}
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}

export default DeleteSongModal;