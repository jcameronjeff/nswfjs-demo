import "./styles.css";
import * as nsfwjs from "nsfwjs";

const img = new Image();
img.crossOrigin = "anonymous";
// some image here
img.src = document.getElementById("image").src;

// Load the model.
nsfwjs.load().then(model => {
  // Classify the image.
  model.classify(img).then(predictions => {
    let top = predictions[0].className;
    let sanitizeResults = predictions
      .filter(p => p.probability > 0.01)
      .map(r => {
        return `<li>${r.className}: ${Math.round(r.probability * 100)}%</li>`;
      });
    let result = "";
    let color = "";
    let heading = document.getElementById("result");

    switch (top) {
      case "Porn":
        result = "NSFW!!!!!";
        color = "red";
        break;
      case "Hentai":
        result = "Dude...";
        color = "yellow";
        break;
      case "Sexy":
        result = "Careful now...";
        color = "yellow";
        break;
      case "Drawing":
        result = "SFW";
        color = "green";
        break;
      case "Neutral":
        result = "SFW";
        color = "green";
        break;
      default:
        result = "Detecting...";
        color = "yellow";
        break;
    }

    heading.innerText = result;
    heading.style.color = color;

    document.getElementById("message").innerHTML = sanitizeResults.join("");
  });
});
