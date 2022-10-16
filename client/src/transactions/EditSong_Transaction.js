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
        this.store.editSong(this.id, this.newSong);
    }

    undoTransaction() {
        this.store.editSong(this.id, this.oldSong);
    }
}