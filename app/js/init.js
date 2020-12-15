$(function(){

var heroHeight = $('#heroImage').height()    
function setHeroHeight(){
    $('#heroRow').height(heroHeight)
}
setHeroHeight();
$(window).resize(function() {
    heroHeight = $('#heroImage').height()    
    setHeroHeight();
  });

})