import { useContext } from "react";
import { GlobalStoreContext } from "../store";

function EditSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function editCallback() {
        let newSong = {
            title: document.getElementById("eTitle").value,
            artist: document.getElementById("eArtist").value,
            youTubeId: document.getElementById("eID").value
        }
        // console.log("In editCallback with newSong: " + JSON.stringify(newSong));
        store.editSongTransaction(newSong);
    }

    function closeCallback() {
        store.hideEditSongModal();
    }

    // let title = "";
    // let artist = "";
    // let youTubeId = "";
    // if (store.songToEdit) {
    //     title = store.currentList.songs[store.songToEdit].title
    //     artist = store.currentList.songs[store.songToEdit].artist
    //     youTubeId = store.currentList.songs[store.songToEdit].youTubeId
    // }

    return (
        <div
            className="modal"
            id="edit-song-modal"
            data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-edit-song-root'>
                <div className="modal-north">
                    Edit Song
                </div>
                <div className="modal-center">
                    <span>Title:</span>
                    <input type="text" id="eTitle" name="title" />
                    <span>Artist:</span>
                    <input type="text" id="eArtist" name="artist" />
                    <span>Youtube ID:</span>
                    <input type="text" id="eID" name="youtubeID" />
                </div>
                <div className="modal-south">
                    <input type="button"
                        id="edit-song-confirm-button"
                        className="modal-button"
                        onClick={editCallback}
                        value='Confirm' />
                    <input type="button"
                        id="edit-song-cancel-button"
                        className="modal-button"
                        onClick={closeCallback}
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}

export default EditSongModal;