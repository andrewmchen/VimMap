var input = ""
$(document).ready(function(){
    console.log("hi");
    $(document).keypress(function(event){
        console.log(event);
        $("#keystroke").append(String.fromCharCode(event['charCode'])+" ");
        input+=String.fromCharCode(event['charCode'])
        render();
    });
    $(document).keydown(function(event){
        console.log(event);
        if(event['keyCode']==8){
            $("#keystroke").empty();
            input="";
        }
        if(event['keyCode']==17){
            $("#keystroke").append("Ctrl ");
            input+="<C";
        }
        if(event['keyCode']==16){
            $("#keystroke").append("Shift ");
            input+="<S";
        }
    });
});
function render(){
    console.log("rendering");
}

