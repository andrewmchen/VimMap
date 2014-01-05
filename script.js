var input = ""
var map = ""
var defaults = {'i': 'VIM DEFAULT: insert', 'p': 'VIM DEFAULT: put', 'y': 'VIM DEFAULT: yank'}
var conversion = {'\\': 'leader', ',': 'comma', '.':'period', ';' :'semicolon'}
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
        $("#title").html("");
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
        /*
        if(event['keyCode']==17){
            $("#keystroke").append("Ctrl ");
            input+="ç";
        }
        if(event['keyCode']==16)
            $("#keystroke").append("Shift ");
            input+="ß";
        }
        */
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
            done();
        }
        var chomped = S(element).chompLeft(input);
        if (S(chomped).length==1 && S(element).startsWith(input)){
            $("#"+chomped).css('background', '#ff99e1');
        }
    }

    // render customs
    for(element in custom){
        console.log(element);
        if(element==input){
            $("#description").html(custom[element]);
            $('li').css('background','#EBDDCC');
        }
        // only do something if it starts with the input
        if(S(element).startsWith(input)){
            var chomped = S(element).chompLeft(input).s;
            //if the chomped string has length 1 then we do something
            console.log('chomped is '+ chomped);
            //if length 1
            if(chomped.length==1){

                if(isUpper(chomped)){
                    $("#"+chomped.toLowerCase()).css('color', '#9C6011');
                    $("#"+chomped.toLowerCase()).css('font-weight', 'bolder');
                    $("#"+chomped.toLowerCase()).css('font-size', '150%');
                    $("#"+chomped.toLowerCase()).text($("#"+chomped.toLowerCase()).text().toUpperCase());
                }
                else{
                console.log('here');
                    if(isConversion(chomped)){
                        $("#"+conversion[chomped]).css('background', '#e95a22');
                    }
                    else $("#"+chomped).css('background', '#e95a22');
                }
            }
            else {
                console.log(chomped.substring(0,1));
                if(conversion.hasOwnProperty(chomped.substring(0,1))) $("#"+conversion[chomped.substring(0,1)]).css('background','#c0e7d9');
                else $("#"+chomped.substring(0,1)).css('background','#c0e7d9');
            }
        }
    }
}
function isConversion(c){
    return conversion.hasOwnProperty(c);
}
function isUpper(c){
    var x = c.charCodeAt(0);
    if((x>64&&x<91)||(x>96&&x<123)||(x>127&&x<155)||(x>159&&x<166)) return (c==c.toUpperCase());
    else return false;
}

//resets colors and description
function reset(){
    $("#description").html("&nbsp");

    $('li').attr('style', '');

}

//done
function done(){
    $('li').css('background','#ffcfcc');
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
    render();
}

