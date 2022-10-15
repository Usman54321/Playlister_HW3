import jsTPS from "../common/jsTPS";

export default class AddSong_Transaction extends jsTPS {
    constructor(initStore) {
        super();
        this.store = initStore;
    }

    doTransaction() {
        this.store.addSong();
        this.id = this.store.currentList.songs.length - 1;
    }

    undoTransaction() {
        this.store.deleteSong(this.id);
    }
}