function toggleTwoColParams(id){
    let $paramHolder = $("#"+id);
    $paramHolder.toggle(500, 'swing', function(){
        if ($paramHolder.is(':visible')){
            $("#"+id +"-btn").html("隐藏 <i class='fas fa-caret-down'></i>");
        }else{
            $("#"+id +"-btn").html("显示 <i class='fas fa-caret-right'></i>");
        }
    });
}


(function(){
    $(".products__hidden").hide();
})();
