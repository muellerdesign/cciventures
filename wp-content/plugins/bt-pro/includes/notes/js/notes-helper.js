
jQuery(document).ready(function(){
  if(jQuery('body').hasClass('fl-builder-edit')) //if we're in BB mode
  {    
    FLBuilder.addHook('didShowLightbox', bt_notes_subscriber_view);    
  }
});




function bt_notes_subscriber_view(){

  setTimeout(function(){//pause to allow render
  
    jQuery('.fl-lightbox-content textarea[name="bt_notes"]').each(function(){
            
      jQuery(this).parent().append("<div class='bt-notes-restricted'>"+ jQuery(this).val() +"</div>");
      
      jQuery('.bt-notes-restricted').contents()
        .filter(function(){
            return this.nodeType === 3;
         })
        .map(function(index, text){
            jQuery(text).replaceWith(
                text.textContent.replace(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, '<div class="resp-container"><iframe src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe></div>') // youtube
              .replace(/(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(.+)/g, '<div class="resp-container"><iframe src="//player.vimeo.com/video/$1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>') // vimeo
              .replace(/(?:https?:\/\/)?(?:www\.)?(?:drive.google\.com\/file\/d)\/(.+)?(?:\/view)/g, '<div class="resp-container"><iframe src="https://drive.google.com/file/d/$1/preview"></iframe></div>') //g drive
            );    
        });
    });
  },2000);

}



