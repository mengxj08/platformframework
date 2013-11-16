var secs;
var	DisplayFormat = "%%M%% Minutes, %%S%% Seconds.";
var CountActive = true;
var targetdate = new Date();

//function calcage: for getting the target format of time.
function calcage(secs, num1, num2) {
  s = ((Math.floor(secs/num1))%num2).toString();
  if (s.length < 2)
    s = "0" + s;
  return "<b>" + s + "</b>";
}

function CountBack(gsecs) {
  secs = gsecs;
  if (secs > 600000) {
  	CountActive = false;
    alert("Oops, You spent 10mins in this task?");
	return;
  }
  DisplayStr = DisplayFormat.replace(/%%D%%/g, calcage(secs,86400000,100000)); //days
  DisplayStr = DisplayStr.replace(/%%H%%/g, calcage(secs,3600000,24)); //hours
  DisplayStr = DisplayStr.replace(/%%M%%/g, calcage(secs,60000,60)); //mins
  DisplayStr = DisplayStr.replace(/%%S%%/g, calcage(secs,1000,60)); //seconds

  document.getElementById("timer").innerHTML = DisplayStr;
  if (CountActive)
    setTimeout("CountBack(" + (secs + 1000) + ")", 1000); //iterative function? call itself
}

function run()
{
	document.write("<span id='timer' style='background-color:" + "gray" + "; color:" + "black" + "; margin:" + 10 +"'></span>");
	var gsecs = Math.floor((new Date() - new Date(targetdate)).valueOf());
	CountBack(gsecs);
}

function stop_timer()
{
 	CountActive = false;
}


