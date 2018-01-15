var restify = require('restify');
var sonos = require('./sonos.js');

var server = restify.createServer();
server.use(restify.plugins.queryParser());

server.get('/play', function create(req, res, next) {
    console.log('play');

    var playlist = req.query.playlist;
    var zone = req.query.zone;

    try {
        sonos.playPlaylist(zone, playlist);

        res.send(200);
    } catch(e) {
        res.send(500);
        console.error(e);
    }

    return next();
});

server.get('/stop', function create(req, res, next) {
    console.log('stop');
    
    var zone = req.query.zone;
    try {
        sonos.stop(zone);

        res.send(200);
    } catch(e) {
        res.send(500);
        console.error(e);
    } 

    return next();
});

server.listen(8080, '0.0.0.0', function() {
    console.log('%s listening at %s', server.name, server.url);
});

// var search = sonos.search(10000, function(s){
//     if(s.host != '192.168.178.77'){
//         return;
//     }
    // console.log(s);

    // s.deviceDescription((err, info) => {
    //     //console.log(err ? err : info.coordinator);
    // })

    // s.getZoneAttrs(function (err, info) {
    //     //console.log(err ? err : info);
    // })

    // s.getZoneInfo(function (err, info) {
    //     //console.log(err ? err : info);
    // })

    // s.getTopology(fun192.168.178.77:1400/xml/device_description.xml',ction (err, info) {
    //     //console.log(err ? err : info);
    // })

    // s.searchMusicLibra    // s.stop((err, data) => {
    //     console.log(err ? err : data);
    // });ry('sonos_playlists', null, {start:0, end:100}, function (err, data) {
    //     console.log(data)
    // })

    // s.play('file:///jffs/settings/savedqueues.rsq#1', function(err, playing){
    //     console.log(err);
    // });
    
    // s.getCurrentState((err, data) => {
    //     console.log(err ? err : data);
    // });

    // s.flush((err, data) => {
    //     console.log(err ? err : data);
    // });

    // s.getQueue((err, data) => {
    //     console.log(err ? err : data);
    // });

    // s.stop((err, data) => {
    //     console.log(err ? err : data);
    // });

    // s.play((err, data) => {
    //     console.log(err ? err : data);/home/aluedeke/Development/source/private/sonos-kids-controller/node-controller/node_modules/sonos/node_modules/xml2js/lib/parser.js:261:26
    // });

    // device.currentTrack(console.log);

    // s.selectQueue((err, data) => {
    //     console.log(err ? err : data);
    //     s.play((err, data) => {
    //         console.log(err ? err : data);
    //     });
    // });
// });