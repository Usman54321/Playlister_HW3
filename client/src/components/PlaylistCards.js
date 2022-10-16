import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
import DeleteSongModal from './DeleteSongModal.js';
import EditSongModal from './EditSongModal.js';

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    function handleKeyPress(e) {
        if ((e.key === "z" || e.key === 'Z') && e.ctrlKey) {
            if (!store.hasModalOpen())
                document.querySelector("#undo-button").click();
        } else if ((e.key === "y" || e.key === 'Y') && e.ctrlKey) {
            if (!store.hasModalOpen())
                document.querySelector("#redo-button").click();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress, false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!store.currentList) {
        return (
            <></>
        )
    }

    if (!store.currentList.songs) {
        console.log("No songs in current list");
        return (
            <></>
        )
    }


    return (
        <div id="playlist-cards">
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))
            }
            <DeleteSongModal />
            <EditSongModal />
        </div>
    )
}

export default PlaylistCards;