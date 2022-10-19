import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import AddSong_Transaction from '../transactions/AddSong_Transaction';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction';
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';

export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    MODAL_CHANGE: "MODAL_CHANGE",
    MARK_SONG_FOR_EDIT: "MARK_SONG_FOR_EDIT",
    MARK_SONG_FOR_DELETE: "MARK_SONG_FOR_DELETE",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        listToDelete: null,
        songToDelete: null,
        isDragging: false,
        draggedTo: false,
        songToEdit: null,
        isModalOpen: false,
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        console.log("storeReducer: " + type + " " + payload);
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    // currentList: payload.playlist,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listToDelete: null,
                    songToDelete: null,
                    isDragging: false,
                    draggedTo: false,
                    songToEdit: null,
                    isModalOpen: false,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                tps.clearAllTransactions();
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listToDelete: null,
                    songToDelete: null,
                    isDragging: false,
                    draggedTo: false,
                    songToEdit: null,
                    isModalOpen: false,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listToDelete: null,
                    songToDelete: null,
                    isDragging: false,
                    draggedTo: false,
                    songToEdit: null,
                    isModalOpen: false,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listToDelete: null,
                    songToDelete: null,
                    isDragging: false,
                    draggedTo: false,
                    songToEdit: null,
                    isModalOpen: false,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listToDelete: payload,
                    songToDelete: null,
                    isDragging: false,
                    draggedTo: false,
                    songToEdit: null,
                    isModalOpen: false,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listToDelete: null,
                    songToDelete: store.songToDelete,
                    isDragging: false,
                    draggedTo: false,
                    songToEdit: store.songToEdit,
                    isModalOpen: false,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listToDelete: null,
                    songToDelete: null,
                    isDragging: false,
                    draggedTo: false,
                    songToEdit: null,
                    isModalOpen: false,
                });
            }

            case GlobalStoreActionType.MODAL_CHANGE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    isModalOpen: payload,
                    listToDelete: null,
                    isDragging: false,
                    draggedTo: false,
                    songToDelete: store.songToDelete,
                    songToEdit: store.songToEdit,
                });
            }

            case GlobalStoreActionType.MARK_SONG_FOR_EDIT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    isModalOpen: true,
                    listToDelete: null,
                    songToDelete: store.songToDelete,
                    isDragging: false,
                    draggedTo: false,
                    songToEdit: payload,
                });
            }

            case GlobalStoreActionType.MARK_SONG_FOR_DELETE: {
                return setStore({
                    songToDelete: payload,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    isModalOpen: true,
                    listToDelete: null,
                    isDragging: false,
                    draggedTo: false,
                    songToEdit: store.songToEdit,
                });
            }

            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updateListName(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            try {
                const response = await api.getPlaylistPairs();
                if (response.data.success) {
                    let pairsArray = response.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                        payload: pairsArray
                    });
                }
                else {
                    console.log("API FAILED TO GET THE LIST PAIRS");
                }
            }
            catch (e) {
                console.log("API FAILED TO GET THE LIST PAIRS");
                // Set idNamePairs to empty array
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: []
                });
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.getPlaylistSize = function () {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = function () {
        async function asyncCreateNewList() {
            let payload = {
                name: "Untitled" + store.newListCounter,
                songs: []
            }
            let response = await api.createNewList(payload);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: playlist
                });
                store.history.push("/playlist/" + playlist._id);
            }
        }
        asyncCreateNewList();
    }

    store.showDeleteListModal = () => {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.add("is-visible");
        storeReducer({
            type: GlobalStoreActionType.MODAL_CHANGE,
            payload: true
        });
    }

    store.hideDeleteListModal = () => {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
        storeReducer({
            type: GlobalStoreActionType.MODAL_CHANGE,
            payload: false
        });
    }

    store.showDeleteSongModal = () => {
        let modal = document.getElementById("delete-song-modal");
        modal.classList.add("is-visible");
        // storeReducer({
        //     type: GlobalStoreActionType.MODAL_CHANGE,
        //     payload: true
        // });
    }

    store.hideDeleteSongModal = () => {
        let modal = document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
        document.getElementById("delete-song-span").innerHTML = "";
        storeReducer({
            type: GlobalStoreActionType.MODAL_CHANGE,
            payload: false
        });
    }

    store.showEditSongModal = () => {
        let modal = document.getElementById("edit-song-modal");
        modal.classList.add("is-visible");
        // storeReducer({
        //     type: GlobalStoreActionType.MODAL_CHANGE,
        //     payload: true
        // });
    }

    store.hideEditSongModal = () => {
        let modal = document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
        storeReducer({
            type: GlobalStoreActionType.MODAL_CHANGE,
            payload: false
        });
        document.getElementById("eTitle").value = "";
        document.getElementById("eArtist").value = "";
        document.getElementById("eID").value = "";
    }

    store.markSongForDeletion = (num) => {
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_DELETE,
            payload: num
        });
        let song = store.currentList.songs[num];
        let name = song.title;
        document.getElementById("delete-song-span").innerHTML = name;
        store.showDeleteSongModal();
    }

    store.markSongForEdit = (num) => {
        console.log("Marking Song for Edit " + num);
        let song = store.currentList.songs[num];
        document.getElementById("eTitle").value = song.title;
        document.getElementById("eArtist").value = song.artist;
        document.getElementById("eID").value = song.youTubeId;
        storeReducer({
            type: GlobalStoreActionType.MARK_SONG_FOR_EDIT,
            payload: num
        });
        store.showEditSongModal();
    }

    // THIS FUNCTION MARKS A LIST FOR DELETION
    store.markListForDeletion = function (id) {
        console.log("MARKING LIST " + id + " FOR DELETION");
        storeReducer({
            type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
            payload: id
        });
        store.showDeleteListModal();
    }

    // THIS FUNCTION DELETES A LIST
    store.deleteList = function () {
        async function asyncDeleteList(id) {
            let response = await api.deleteList(id);
            if (response.data.success) {
                store.loadIdNamePairs();
                store.history.push("/");
            }
        }
        asyncDeleteList(store.listToDelete);
        store.hideDeleteListModal();
    }

    // THIS FUNCTION EDITS A SONG
    store.editSong = function (id, newSong) {
        async function asyncEditSong(index, newSong) {
            let payload = {
                index: index,
                song: newSong
            }
            // console.log("Editing song at index " + index + " to " + JSON.stringify(newSong));
            let response = await api.editSong(store.currentList._id, payload);
            if (response.data.success) {
                store.setCurrentList(store.currentList._id);
                store.history.push("/playlist/" + store.currentList._id);
            }
        }
        asyncEditSong(id, newSong);
        store.hideEditSongModal();
    }


    // THIS FUNCTION ADDS A SONG TO THE CURRENT LIST
    store.addSong = function () {
        // Make the api call to add the song to the list
        async function asyncAddSong(song) {
            let response = await api.addSong(store.currentList._id, song);
            if (response.data.success) {
                store.setCurrentList(store.currentList._id);
                store.history.push("/playlist/" + store.currentList._id);
            }
        }
        let newSong = { title: "Untitled", artist: "Unknown", youTubeId: "dQw4w9WgXcQ" };
        asyncAddSong(newSong);
    }

    store.deleteSong = function (num) {
        async function asyncDeleteSong(id, num) {
            let payload = {
                num: num
            }
            let response = await api.deleteSong(id, payload);
            if (response.data.success) {
                store.setCurrentList(store.currentList._id);
                store.history.push("/playlist/" + store.currentList._id);
            }
        }
        let songToReturn = store.currentList.songs[num];
        asyncDeleteSong(store.currentList._id, num);
        store.hideDeleteSongModal();
        return songToReturn;
    }

    store.addSongTransaction = function () {
        let transaction = new AddSong_Transaction(store);
        tps.addTransaction(transaction);
    }

    store.deleteSongTransaction = function () {
        let transaction = new DeleteSong_Transaction(store, store.songToDelete);
        tps.addTransaction(transaction);
    }

    store.editSongTransaction = function (newSong) {
        // let title = document.getElementById("eTitle").value;
        // let artist = document.getElementById("eArtist").value;
        // let id = document.getElementById("eID").value;
        // let newSong = {
        //     title: title,
        //     artist: artist,
        //     youTubeId: id
        // }
        console.log("Inside of editSongTransaction, newSong is " + JSON.stringify(newSong));
        let transaction = new EditSong_Transaction(store, store.songToEdit, newSong);
        tps.addTransaction(transaction);
    }

    // THIS FUNCTION ADDS A MoveSong_Transaction TO THE TRANSACTION STACK
    store.addMoveSongTransaction = (start, end) => {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = (start, end) => {
        async function asyncMoveSong(id, start, end) {
            let payload = {
                oldIndex: start,
                newIndex: end
            }
            let response = await api.moveSong(id, payload);
            if (response.data.success) {
                store.setCurrentList(store.currentList._id);
                store.history.push("/playlist/" + store.currentList._id);
            }
        }
        asyncMoveSong(store.currentList._id, start, end);
    }

    store.addSongAtIndex = function (index, song) {
        async function asyncAddSongAtIndex(id, index, song) {
            let payload = {
                index: index,
                song: song
            }
            let response = await api.addSongAtIndex(id, payload);
            if (response.data.success) {
                store.setCurrentList(store.currentList._id);
                store.history.push("/playlist/" + store.currentList._id);
            }
        }
        asyncAddSongAtIndex(store.currentList._id, index, song);
    }

    store.canUndo = function () {
        if (store.hasList()) {
            return tps.hasTransactionToUndo();
        }
        return false;
    }

    store.canRedo = function () {
        if (store.hasList()) {
            return tps.hasTransactionToRedo();
        }
        return false;
    }

    store.hasList = function () {
        return store.currentList !== null;
    }

    store.hasModalOpen = function () {
        return store.isModalOpen;
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}