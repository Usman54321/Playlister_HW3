import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    const { song, index } = props;


    function handleDragStart(event) {
        event.dataTransfer.setData("song", event.target.id);
        store.isDragging = true;
    }
    function handleDragOver(event) {
        event.preventDefault();
        store.draggedTo = true;
    }
    function handleDragEnter(event) {
        event.preventDefault();
        store.draggedTo = true;
    }
    function handleDragLeave(event) {
        event.preventDefault();
        store.draggedTo = false;
    }
    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        if (targetId === "")
            return
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);

        store.isDragging = false;
        store.draggedTo = false;

        // ASK THE MODEL TO MOVE THE DATA
        store.addMoveSongTransaction(sourceId, targetId);
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onDoubleClick={() => store.markSongForEdit(index)}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={() => store.markSongForDeletion(index)}
            />
        </div>
    );
}

export default SongCard;