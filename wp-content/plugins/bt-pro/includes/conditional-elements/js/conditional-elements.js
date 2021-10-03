jQuery(document).ready(function(){

  
  //todo minimize this
  if(jQuery('body').hasClass('fl-builder-edit') )
    return false;
  
  bt_cookie_check(); // check for custom display cookies
  bt_time_check();
  bt_query_check();
  
  if(getConditionalCookie("bt_user_c") == undefined) // if the country isnt defined, update
  {
    console.log('no location, updating');
    btGetLocation();
  }
  else
  {
    check_locations();
  }
});
  

function bt_time_check(){
    
  jQuery("[bt_time_start]").each(function(index,value){
    var timeStart = jQuery(this).attr('bt_time_start');
    var timeEnd = jQuery(this).attr('bt_time_end');
    var timeNow = Date.now()/1000;
    var bt_display_action = jQuery(this).attr('bt_display_action') ;

    if((timeNow > timeStart) && timeNow < timeEnd )
    {
      if(bt_display_action == 'show')
        jQuery(this).show();
      else
        jQuery(this).hide();
    }  
    else
    {
      if(bt_display_action == 'hide')
        jQuery(this).show();
      else
        jQuery(this).hide();
    }
  });
}

function bt_query_check(){
  console.log('query check');
  
  jQuery("[bt_url_text]").each(function(index,value){
    console.log('url text vis query');
    var urlName = jQuery(this).attr('bt_url_text');
    var urlType = jQuery(this).attr('bt_url_type');
    var urlValue = jQuery(this).attr('bt_url_value');
    var bt_display_action = jQuery(this).attr('bt_display_action') ;
    var queryMatch = false;
    
    
    if(urlType == 'exists')
      if(getParameterByName(urlName) != null)
         queryMatch = true;

    if(urlType == 'notexist')
      if(getParameterByName(urlName) == null)
        queryMatch = true;

    if(urlType == 'equals')
      if(getParameterByName(urlName) == urlValue)
        queryMatch = true;

    if(urlType == 'notequals')
      if(getParameterByName(urlName) != urlValue)
        queryMatch = true;

    if(queryMatch)
    {
      if(bt_display_action == 'show')
        jQuery(this).show();
      else
        jQuery(this).hide();
    }  
    else
    {
      if(bt_display_action == 'hide')
        jQuery(this).show();
      else
        jQuery(this).hide();
    }
  });
}

function check_locations(){

  var eu_countries = "ad,al,at,ba,be,bg,by,ch,cs,cz,de,dk,ee,es,fi,fo,fr,fx,gb,gi,gr,hr,hu,ie,is,it,li,lt,lu,lv,mc,md,mk,mt,nl,no,pl,pt,ro,se,si,sj,sk,sm,ua,va";
  var bt_user_loc = getConditionalCookie("bt_user_loc");
  var bt_user_s = getConditionalCookie("bt_user_s");
  var bt_user_c = getConditionalCookie("bt_user_c");
  
  jQuery("[bt_location_name]").each(function(index,value){
    
    var bt_location_type = bt_lc(jQuery(this).attr('bt_location_type'));
    var bt_location_condition = jQuery(this).attr('bt_location_condition');
    var bt_location_name = bt_lc(jQuery(this).attr('bt_location_name'));
    var bt_display_action = jQuery(this).attr('bt_display_action');
    var nodeId  = jQuery(this).attr('data-node');
    
    if(bt_location_type == "state")
      bt_user_loc = bt_user_s;
    if(bt_location_type == "countrycode")
      bt_user_loc = bt_user_c;
    if(bt_location_type == "country")
      bt_user_loc = bt_user_c;
    
    //EU tweak todo APAC? North america?  
    if((bt_location_type == "country" || bt_location_type == "countrycode") && (bt_location_name == "eu" || bt_location_name == "europe"))
    {
      bt_location_type = 'countrycode'; //force countrycode 
      bt_location_name = eu_countries;
      if(bt_location_condition == 'equals')
        bt_location_condition = 'contains'; // fix equals -> contains
      if(bt_location_condition == 'notequal')
        bt_location_condition = 'doesnotcontain'; //fix contains -> not contain
    }
    
    if(bt_display_action == 'show')
      bt_display_action = true;
    else
      bt_display_action = false;
    
    if(bt_location_condition == 'equals')
    {
      btShowElement(nodeId, bt_user_loc == bt_location_name, bt_display_action);
    }
    else if (bt_location_condition == 'notequal')
    {
      btShowElement(nodeId,  bt_user_loc != bt_location_name, bt_display_action);
    }
    else if (bt_location_condition == 'contains')
    {
      btShowElement(nodeId,  bt_location_name.indexOf(bt_user_loc) !== -1, bt_display_action);
    }
    else if (bt_location_condition == 'doesnotcontain')
    {
      btShowElement(nodeId,  bt_location_name.indexOf(bt_user_loc) == -1, bt_display_action);
    }
  });
  
}

function bt_cookie_check(){
    
  jQuery("[bt_cookie_name]").each(function(index,value){
    
    var bt_cookie_name = bt_lc(jQuery(this).attr('bt_cookie_name'));
    var bt_cookie_relationship = jQuery(this).attr('bt_cookie_relationship');
    var bt_cookie_value = bt_lc(jQuery(this).attr('bt_cookie_value'));
    var bt_display_action = jQuery(this).attr('bt_display_action');
    var nodeId  = jQuery(this).attr('data-node');
    
    // empty handler
    if(!bt_cookie_value)
      bt_cookie_value = "";
    else
      bt_cookie_value = bt_lc(bt_cookie_value);
        
    var visitor_cookie_value = bt_lc(getConditionalCookie(bt_cookie_name));
    
    if(bt_display_action == 'show')
      bt_display_action = true;
    else
      bt_display_action = false;
    
    if(bt_cookie_relationship == 'equals')
    {
      btShowElement(nodeId, visitor_cookie_value == bt_cookie_value, bt_display_action);
    }
    else if (bt_cookie_relationship == 'notequal')
    {
      btShowElement(nodeId,  visitor_cookie_value != bt_cookie_value, bt_display_action);
    }
    else if (bt_cookie_relationship == 'contains')
    {
      btShowElement(nodeId,  bt_cookie_value.indexOf(visitor_cookie_value) !== -1, bt_display_action);
    }
    else if (bt_cookie_relationship == 'doesnotcontain')
    {
      btShowElement(nodeId,  bt_cookie_value.indexOf(visitor_cookie_value) == -1, bt_display_action);
    }
    else if (bt_cookie_relationship == 'exists')
    {
      btShowElement(nodeId,  visitor_cookie_value !== null , bt_display_action);
    }
    else if (bt_cookie_relationship == 'doesnotexist')
    {
      btShowElement(nodeId,  visitor_cookie_value == null, bt_display_action);
    }
  });
}

function bt_lc(text)
{
  if(text == null)
    return text;
  if(text !== '')
    return text.toLowerCase();
  return text;
}

function btShowElement(node, result, show ){
  
  if(result === true)
  {
    if(show === true)
      jQuery('.fl-node-'+node).show();
    else
      jQuery('.fl-node-'+node).hide();
  }
  else
  {
    if(show === true)
      jQuery('.fl-node-'+node).hide();
    else
      jQuery('.fl-node-'+node).show();
  }
}

function btGetLocation(){
  //get the users location with JS
  jQuery.ajax({
    url: "https://geoip-db.com/jsonp",
    jsonpCallback: "callback",
    crossDomain: true,
    dataType: "jsonp",        
    success: function( location ) {
      createCookie('bt_user_loc',bt_lc(location.country_code),4);
      createCookie('bt_user_c',bt_lc(location.country_name),4);
      createCookie('bt_user_s',bt_lc(location.state),4);
      check_locations();
    },
    error: function( ) {
      console.log('bt location error');
    }
  });
}


// Cookies
function createCookie(name, value, hours) {
  var expires = "";                 
  if (hours) {
    var date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  }
  
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getConditionalCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(';');
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, '');
        if (x == c_name) {
            return decodeURI(y);
        }
    }
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
