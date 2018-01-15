var api = require('sonos');

var zones = {}

refreshZones()

setInterval(() => {
    refreshZones()
}, 15000)

function refreshZones(){
    api.search({timeout: 10000}, async (player) => {
        var topology = await getTopology(player)

        var location = 'http://' + player.host + ':' + player.port + '/xml/device_description.xml'
        topology.zones.filter(zone => zone.location == location).forEach(zone => {
            if(!zone.coordinator){
                return;
            }

            zones[zone.name] = player
        });
    });
}

async function getTopology(player){
    return new Promise((resolve, reject) => {
        player.getTopology((error, topology) => {
            return void error ? reject(error) : resolve(topology)
        })
    })
}

exports.playPlaylist = async function(zone, playlist){
    var player = zones[zone];

    var playlist = await getPlaylist(player, playlist);

    await flush(player)
    await queue(player, playlist.uri)
    await selectQueue(player)
    await play(player)
}

async function getPlaylist(player, name){
    return new Promise((resolve, reject) => {
        player.searchMusicLibrary('sonos_playlists', null, {start:0, end:100}, (error, result) => {
            console.log('get playlist: ' + JSON.stringify(error ? error : result));
            return void error ? reject(error) : resolve(result.items.filter(p => name == p.title)[0])
        });
    })
}

async function flush(player){
    return new Promise((resolve, reject) => {
        player.flush((error, data) => {
            console.log('flushed: ' + JSON.stringify(error ? error : data));
            return void error ? reject(error) : resolve(data)
        });
    })
}

async function queue(player, uri){
    return new Promise((resolve, reject) => {
        player.queue(uri, (error, queued) => {
            console.log('queued: ' + JSON.stringify(error ? error : queued));
            return void error ? reject(error) : resolve(queued)
        });
    })
}

async function selectQueue(player){
    return new Promise((resolve, reject) => {
        player.selectQueue((error, data) => {
            console.log('queue selected: ' + JSON.stringify(error ? error : data));
            return void error ? reject(error) : resolve(data)
        });
    })
}

async function play(player){
    return new Promise((resolve, reject) => {
        player.play((error, data) => {
            console.log('play: ' + JSON.stringify(error ? error : data));
            return void error ? reject(error) : resolve(data)
        });
    })
}

exports.stop = async function(zone){
    var player = zones[zone]

    await stop(player)
}

async function stop(player){
    return new Promise((resolve, reject) => {
        player.stop((error, stopped) => {
            return void error ? reject(error) : resolve(stopped)
        });
    })
}



    