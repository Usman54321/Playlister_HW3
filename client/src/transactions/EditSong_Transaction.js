import jsTPS from "../common/jsTPS";

export default class EditSong_Transaction extends jsTPS {
    constructor(initStore, initID, initNewSong) {
        super();
        this.store = initStore;
        this.id = initID;
        this.newSong = initNewSong;
        this.oldSong = this.store.currentList.songs[this.id];
    }

    doTransaction() {
        // console.log("Changing song at index " + this.id + " to " + JSON.stringify(this.newSong) + "\nWas " + JSON.stringify(this.oldSong));
        this.store.editSong(this.id, this.newSong);
    }

    undoTransaction() {
        // console.log("Changing song at index " + this.id + " to " + JSON.stringify(this.oldSong) + "\nWas " + JSON.stringify(this.newSong));
        this.store.editSong(this.id, this.oldSong);
    }
}