const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
getPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id: list._id,
                    name: list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

updatePlaylist = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }
    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }
        playlist.name = body.name;
        playlist.owner = body.owner;
        playlist.songs = body.songs;
        playlist.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: playlist._id,
                    message: 'Playlist updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Playlist not updated!',
                })
            })
    })
}

deletePlaylist = async (req, res) => {
    await Playlist.findOneAndDelete({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: playlist })
    }).catch(err => console.log(err))
}

addSong = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Song',
        })
    }

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }
        playlist.songs.push(body);
        playlist.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: playlist._id,
                    message: 'Song added!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Song not added!',
                })
            })
    })
}

deleteSong = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Song',
        })
    }

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })

        }

        playlist.songs.splice(body.num, 1);
        playlist.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: playlist._id,
                    message: 'Song deleted!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Song not deleted!',
                })
            })
    })
}

moveSong = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Song',
        })
    }

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }
        let song = playlist.songs.splice(body.oldIndex, 1);
        playlist.songs.splice(body.newIndex, 0, song[0]);
        playlist.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: playlist._id,
                    message: 'Song moved!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Song not moved!',
                })
            })
    })
}

addSongAtIndex = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Song',
        })
    }

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }
        playlist.songs.splice(body.index, 0, body.song);
        playlist.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: playlist._id,
                    message: 'Song added!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Song not added!',
                })
            })
    })
}

module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistPairs,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addSong,
    deleteSong,
    moveSong,
    addSongAtIndex
}