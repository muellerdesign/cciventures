
jQuery(document).ready(function(){

  if(jQuery('body').hasClass('fl-builder-edit'))
  {
    jQuery('[bt-note]').each(function(){
      
      //linkify text
      var str = jQuery(this).attr('bt-note');
      
      if(!str)
        alert('nostr');
      
      // Set the regex string
      var regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig
      // Replace plain text links by hyperlinks
      var replaced_text = str.replace(regex, "<a href='$1' target='_blank'>$1</a>");
      
      jQuery(this).tipTip({
        content: replaced_text,
        fadeOut:1000,
        keepAlive: true,
        defaultPosition:'top',
      });

    });
  }
});

