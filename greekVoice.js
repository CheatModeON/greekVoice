
//voice recognition by WebSpeechAPI
  window.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("button");
    const result = document.getElementById("result");
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
            articles[i].style.border = "thick solid #000000";
          }
        }
      };

      const start = () => {
        main.classList.add("speaking");
        recognition.start();
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
    } else {
      button.remove();
      const message = document.getElementById("message");
      message.removeAttribute("hidden");
      message.setAttribute("aria-hidden", "false");
    }
  });




//Function for button
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

var audio_tag = document.createElement("AUDIO");
audio_tag.id = "click"
audio_tag.src = "sounds/click.wav";
document.body.appendChild(audio_tag);
