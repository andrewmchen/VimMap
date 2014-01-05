var input = ""
var map = ""
var defaults = {'i': 'insert', 'p': 'put', 'y': 'yank'}
var custom = {}
$(document).ready(function(){
    console.log("hi");
    render();
    $("#inputbox").empty();
    
    //When input box changes, create a object of custom mappings
    $("#inputbox").change(function() {
        console.log("inputbox has changed calling function");
        parseCustomMappings();
    });
    $(document).keypress(function(event){
        console.log(event);
        $("#keystroke").append(String.fromCharCode(event['charCode'])+" ");
        input+=String.fromCharCode(event['charCode'])
        render();
    });
    $(document).keydown(function(event){
        console.log(event);
        if(event['keyCode']==8){
            $("#keystroke").html("&nbsp");
            input="";
        }
        if(event['keyCode']==17){
            $("#keystroke").append("Ctrl ");
            input+="ç";
        }
        if(event['keyCode']==16)
            $("#keystroke").append("Shift ");
            input+="ß";
        }
        render();
    });
});
function render(){
    reset();
//    map = $("#inputbox").val()
//   var maplist = map.split("\n")
//    console.log(maplist);
//    console.log(maplist[0].split(/\s+/g));
    console.log("rendering");
    // render defaults
    for(element in defaults){
        if(element==input){
            $("#description").html(defaults[element]);
        }
        if(!S(element).startsWith(input)) break;
        var chomped = S(element).chompLeft(input);
        if (S(chomped).length==1){
            console.log(chomped+" is turning red");
            $("#"+chomped).css('background', 'red');
        }
    }
    // render customs
}

//resets colors and description
function reset(){
    $("#description").html("&nbsp");
    $(".function").css('background', '#fff');
    $(".letter").css('background', '#fff');
    $(".symbol").css('background', '#fff');
}

//Create custom object of mappings
//NEED TO ADD ERROR HANDLING FOR " in mappings
function parseCustomMappings(){
    var maplist = $("#inputbox").val().split("\n");
    var customString ="{";
    console.log(maplist)
    for(var i=0;i<maplist.length;i++){
        maplist[i] = maplist[i].substring(3,maplist[i].length);
        var map = maplist[i].split(/\s+/g);
        var rest = "";
        for(var j=1;j<map.length;j++){
            if(map[j].indexOf('"')!=1){
            rest+=map[j];
            }
        }
        console.log(rest)
        map[0] = "\\" + map[0];
        //add error handling here

        customString +=  '"' + map[0]+'" : "'+rest+'", ';
    
    }
    customString = customString.substring(0, customString.length-12);
    customString += "}"
    console.log(customString);
    eval("custom =" +customString);
}

