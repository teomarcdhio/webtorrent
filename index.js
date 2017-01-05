var WebTorrent = require('webtorrent');
var express = require('express');
var app = express();
var client = new WebTorrent();
var fs = require('fs-extra'); // this includes both fs and fs-extra

//torrent file path - magnet uri - http/https url to a torrent file
var origin = 'torrents/Sintel.2010.x264-VODO.torrent';
//destination folder for the current torrent
var destFolder = 'downloads';

client.add(origin, { path: destFolder }, function (torrent) {
  //while donwloading display the time left, speed and overall progress
  torrent.on('download',function(bytes){
    var timeLeft = Math.round((torrent.timeRemaining / 1000),2);
    console.log(timeLeft + ' seconds left');
    var speedKb =  Math.round(((1/1024) * torrent.downloadSpeed), 2) ;
    console.log(speedKb + ' KBps');
    var progress = (torrent.progress.toFixed(2))*100;
    console.log(progress + '% completed');
  });
  //once completed, notify of completion
  torrent.on('done', function () {
    console.log('torrent download finished');

    //delete the content of the donwloads folder -- dev purpose only
    fs.emptyDir('downloads', function(err){
      if (!err)
      console.log('downloads folder removed');
      else
      console.log(err);
    });
  });




});
