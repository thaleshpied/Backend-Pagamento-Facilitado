<script>
document.addEventListener("DOMContentLoaded", function () {
    const mainWrapper = document.getElementById("hamburgerbotao");
    const menuMobile = document.getElementById("menumobile");
    const menuMobileSub = document.getElementById("menumobilesub");

    if (mainWrapper && menuMobile && menuMobileSub) {
        mainWrapper.addEventListener("click", function () {
            menuMobile.classList.toggle("efeitomenumobile");
            menuMobileSub.classList.toggle("efeitomenusubmobile");
        });
    }
});
</script>
<div class="dlabnav" id="menumobile" style="margin-top: -34px; z-index: 1; position: fixed;">
    <div class="dlabnav-scroll" id="menumobilesub">
        
          
    
    </div>
    
</div>
