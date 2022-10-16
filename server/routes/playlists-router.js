/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()

router.post('/playlist', PlaylistController.createPlaylist)
router.get('/playlist/:id', PlaylistController.getPlaylistById)
router.get('/playlists', PlaylistController.getPlaylists)
router.get('/playlistpairs', PlaylistController.getPlaylistPairs)
router.put('/playlist/:id', PlaylistController.updatePlaylist)
router.delete('/playlist/:id', PlaylistController.deletePlaylist)
router.put('/playlist/:id/addSong', PlaylistController.addSong)
router.put('/playlist/:id/deleteSong', PlaylistController.deleteSong)
router.put('/playlist/:id/moveSong', PlaylistController.moveSong)
router.put('/playlist/:id/addSongAtIndex', PlaylistController.addSongAtIndex)
router.put('/playlist/:id/editSong', PlaylistController.editSong)

module.exports = router