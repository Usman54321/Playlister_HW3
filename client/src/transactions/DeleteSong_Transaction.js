import jsTPS from "../common/jsTPS";

export default class DeleteSong_Transaction extends jsTPS {
    constructor(initStore, initID) {
        super();
        this.store = initStore;
        this.id = initID;
    }

    doTransaction() {
        this.song = this.store.deleteSong(this.id);
        console.log("Deleted Song: " + JSON.stringify(this.song) + " at " + this.id);
    }
    
    undoTransaction() {
        this.store.addSongAtIndex(this.id, this.song);
        console.log("Added back the Song " + JSON.stringify(this.song) + " at " + this.id)
    }
}