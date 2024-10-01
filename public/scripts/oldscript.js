// A $( document ).ready() block.
$( document ).ready(function() {
   
  loadSongData("songList");
  
  $('.songName').on('click', (e)=>{
    
    let $this = $(e.target); 
    let $thisId = $this.attr('id');
    
    $('#'+ $thisId + ' > ul.songDetails').toggle(); 
    
    $('#'+ $thisId + '> i.editSong').toggle(); 

  }); 

  $('#btnHideAll').on('click', (e)=> {

    $('ul.songDetails').hide();
  });
  
  $('#btnShowAll').on('click', (e)=> {

  $('ul.songDetails').show();
  });

  $('i.editSong').on('click', (e)=> {

    $(e.target).toggleClass('bi-save2').toggleClass('bi-pencil-fill');  

    let $thisParentId = $(e.target).parent().attr('id');   

    $('#'+$thisParentId+ ' span.displaySong').toggle(); 
    $('input.editSong').toggle(); 

  })
});

function loadSongData(appendId) {

  let appendElement = $(`#${appendId}`);

  appendElement.empty(); 
 
  $.each(data.songs, (index, song)=>{

    // console.log(song); 
      // $('<li>')
      //   .attr('id', `songNo${index}`)
      //   .addClass('list-group-item')
      //   .addClass('list-group-item-action')
      //   .html(`${song.name}, <em>${song.artist}</em>`)
      //   .appendTo(appendElement);

   appendElement.append(` 
    <li id="songNo${index}Name" class="list-group-item mb-1 songName">
      ${song.name} 
      <i id="editSongNo${index}" class="bi bi-pencil-fill float-end editSong"></i>
      <ul class="list-group songDetails">
        <li class="input-group w-100">
          <span class="w-20 input-group-text">artist</span>
          <span class="list-group-item form-control displaySong" id="songNo${index}Artist">${song.artist}</span>
           <input id="songNo${index}ArtistEdit" type="text" class="form-control editSong" value="${song.artist}">
        </li>
        <li class="input-group w-100">
          <span class="w-20 input-group-text">status</span>
          <span class="list-group-item form-control displaySong" id="songNo${index}Status">${song.status}</span>
          <input id="songNo${index}StatusEdit" type="text" class="form-control editSong" value="${song.status}">
        </li>
       
        <li class="input-group w-100">
          <span class="w-20 input-group-text">chords</span>
          <span class="list-group-item form-control displaySong" id="songNo${index}Chords">${song.chords}</span>
          <input id="songNo${index}ChordsEdit" type="text" class="form-control editSong" value="${song.cords}">
        </li>

        <li class="input-group w-100">
          <span class="w-20 input-group-text">lyrics?</span>
          <span class="list-group-item form-control displaySong" id="songNo${index}Lyrics">${song.lyrics}</span>
          <input id="songNo${index}LyricsEdit" type="text" class="form-control editSong" value="${song.lyrics}">
        </li>

        <li class="input-group w-100">
          <span class="w-20 input-group-text">next?</span>
          <span class="list-group-item form-control displaySong" id="songNo${index}Next">${song.next}</span>
          <input id="songNo${index}NextEdit" type="text" class="form-control editSong" value="${song.nest}">
        </li>

        <li class="input-group w-100">
          <span class="w-20 input-group-text">Notes</span>
          <span class="list-group-item form-control displaySong" id="songNo${index}Notes">${song.notes}</span>
          <input id="songNo${index}NotesEdit" type="text" class="form-control editSong" value="${song.notes}">
        </li>

        <li class="input-group w-100">
          <span class="w-20 input-group-text">Tags</span>
          <span class="list-group-item form-control displaySong" id="songNo${index}Tags">
            ${song.tags}
            </span>
          </span>
          <input id="songNo${index}TagsEdit" type="text" class="form-control editSong" value="${song.tags}">
        </li>

        <li class="input-group w-100">
          <span class="w-20 input-group-text">Links</span>
          <span class="list-group-item form-control displaySong" id="songNo${index}Links">
           ${ song.links } 
          </span>
          <input id="songNo${index}Links" type="text" class="form-control editSong" value="${song.links}">
        </li>
      </ul>
    </li>`); 

    $('.songDetails').hide();
    $('i.editSong').hide(); 
    $('.editSong').hide();
  });
 

}