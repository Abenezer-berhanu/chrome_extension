let iFrame = document.getElementsByTagName("iframe");
let url = iFrame[0].baseURI;
let width = screen.width;
let video = document.getElementsByTagName("Video");
const button = document.createElement("button");
const textnode = document.createTextNode("DOWNLOAD");
button.appendChild(textnode);
button.style.padding = "3px";
button.style.borderRadius = "5px";
button.style.position = "absolute";
button.style.fontSize = "1.2rem";
button.style.textAlign = "center";
button.style.fontWeight = "700";
button.style.marginLeft = "5%";
button.style.marginTop = "6%";
button.style.zIndex = "10";
button.style.color = "black";

button.addEventListener("mouseover", function () {
  button.style.opacity = "1";
});
button.addEventListener("mouseout", function () {
  button.style.opacity = "0.5";
});

if (video) {
  document.body.appendChild(button);
}
if (width < 500) {
  button.style.display = "none";
}

button.addEventListener("click", () => {
  console.log(url)
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      let tempUrl = URL.createObjectURL(file);
      const aTag = document.createElement("a");
      aTag.href = tempUrl;
      aTag.download = url.replace(/^.*[\\\/]/, "");
      button.appendChild(aTag);
      aTag.click();
      button.innerText = "Download File..";
      URL.revokeObjectURL(tempUrl);
      aTag.remove();
    })
    .catch(() => {
      alert("Failed to download file!");
      downloadBtn.innerText = "Download File";
    });
});
