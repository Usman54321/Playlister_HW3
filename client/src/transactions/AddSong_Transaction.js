import jsTPS from "../common/jsTPS";

export default class AddSong_Transaction extends jsTPS {
    constructor(initStore) {
        super();
        this.store = initStore;
    }

    doTransaction() {
        this.store.addSong();
    }

    undoTransaction() {
        this.store.removeSong(this.id, this.song);
    }
}