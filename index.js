var WebTorrent = require('webtorrent');

var client = new WebTorrent();

var magnetURI = 'torrents/debian-8.6.0-amd64-netinst.iso.torrent';
var magnetURI2 = 'torrents/debian-mac-8.6.0-amd64-netinst.iso.torrent';

client.add(magnetURI, { path: 'donwloads' }, function (torrent) {
  torrent.once('progress',function(){
    console.log('torretn downloading');
  });
  torrent.once('done', function () {
    console.log('torrent download finished');
  });




});
