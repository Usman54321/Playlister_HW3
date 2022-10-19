import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import DeleteListModal from './DeleteListModal.js'

/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function handleCreateNewList() {
        store.createNewList();
    }

    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }
    let addListButtonClass = "playlister-button";
    if (store.listNameActive === true) {
        addListButtonClass = "playlister-button-disabled";
    }

    let deleteListModal = document.getElementById("delete-list-modal");
    let isDeleteModalOpen = false;
    if (deleteListModal) {
        isDeleteModalOpen = deleteListModal.classList.contains("is-visible");
    }

    // console.log("listNameActive: " + store.listNameActive);
    // console.log("isDeleteModalOpen: " + isDeleteModalOpen);

    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
                <div id="playlist-selector-heading">
                    Your Lists
                    <input
                        type="button"
                        id="add-list-button"
                        onClick={handleCreateNewList}
                        className={addListButtonClass}
                        disabled={store.listNameActive || isDeleteModalOpen}
                        value="+" />
                </div>
                {
                    listCard
                }
                <DeleteListModal />
            </div>
        </div>)
}

export default ListSelector;