function addEvents() {

    $('.songName').on('click', (e) => {
        let $this = $(e.target);
        let $thisId = $this.attr('id');
        $('#' + $thisId + ' > ul.songPosts').toggle();
    });


  $('#AddSongModal').on('click', () => {
    data.songs.push({
      name: $('#songAddName').val(),
      artist: $('#songAddArtist').val(),
    });

    loadSongData("songList");
    addEvents();

    $('#addSongModal .btn-close').click();
    $('#addSongModal input').val('');
  });


  $('#btnConsoleData').on('click', () => {
    console.log(data.songs);
  });
}