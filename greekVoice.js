// Greek voice recognition with WebSpeechAPI by CheatModeON
// Include this to your html
// Any class .greekVoice will be searched if it is similar to the voice input
// Don't forget to change the desired effect of voice command
// at this section *** Change the voice activated action here ***
// Default is: Add border to selection and play a sound

// append sounds
var audio_tag = document.createElement("AUDIO");
audio_tag.id = "click"
audio_tag.src = "sounds/click.wav";
document.body.appendChild(audio_tag);

var audio_tag2 = document.createElement("AUDIO");
audio_tag2.id = "ding"
audio_tag2.src = "sounds/ding.wav";
document.body.appendChild(audio_tag2);

// append results
var result = document.createElement("DIV");
result.id = "result";
document.body.appendChild(result);


window.addEventListener("DOMContentLoaded", () => {

  // Create the button and the audio tag
  var button = document.createElement("button");
  button.innerHTML = "REC";

  document.body.appendChild(button);

  const main = document.getElementsByTagName("main")[0];
  let listening = false;
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (typeof SpeechRecognition !== "undefined") {
    const recognition = new SpeechRecognition();
    recognition.lang = 'el-GR';

    const stop = () => {
      main.classList.remove("speaking");
      recognition.stop();
      button.textContent = "REC";

      var articles = document.getElementsByClassName("greekVoice");

      for(var i = 0; i< articles.length; i++){
        articles[i].style.border = "hidden";
      }
      for(var i = 0; i< articles.length; i++){
        if( articles[i].innerText.toLowerCase() == document.getElementById("result").innerText.toLowerCase() ){
          // *** Change the voice activated action here ***
          articles[i].style.border = "thick solid #000000";
          PlaySound('ding');
        }
      }
    };

    const start = () => {
      main.classList.add("speaking");
      recognition.start();
      result.innerHTML = "";
      button.textContent = "STOP";
    };

    const onResult = event => {
      result.innerHTML = "";
      for (const res of event.results) {
        const text = document.createTextNode(res[0].transcript);
        const p = document.createElement("p");
        if (res.isFinal) {
          p.classList.add("final");
        }
        p.appendChild(text);
        result.appendChild(p);
      }
    };
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.addEventListener("result", onResult);
    button.addEventListener("click", event => {
      listening ? stop() : start();
      listening = !listening;
    });
    button.addEventListener ("mouseover", function() {
      PlaySound('click');
    });
    button.addEventListener ("mouseout", function() {
      StopSound('click');
    });
  } else {
    button.remove();
    const message = document.getElementById("message");
    message.removeAttribute("hidden");
    message.setAttribute("aria-hidden", "false");
  }
});




//Functions for button
function toggle() {
  var x = document.getElementById("speechRec");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function PlaySound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.play();
}

function StopSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
}
