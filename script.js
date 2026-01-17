function generate() {
const data = document.getElementById("data").value;
const color = document.getElementById("color").value;
const size = document.getElementById("size").value;
const shape = document.getElementById("shape").value;
const logoInput = document.getElementById("logo");

if (!data) {
alert("Vendos një link ose tekst");
return;
}

const reader = new FileReader();

reader.onload = function () {
const settings = {
data,
color,
size,
shape,
logo: reader.result || ""
};

const encoded = encodeURIComponent(JSON.stringify(settings));  
window.location.href = "result.html?qr=" + encoded;

};

if (logoInput.files.length > 0) {
reader.readAsDataURL(logoInput.files[0]);
} else {
reader.onload();
}
}

function renderQR() {
const params = new URLSearchParams(window.location.search);
const raw = params.get("qr");
if (!raw) return;

const settings = JSON.parse(decodeURIComponent(raw));

const logoTooBigWarning =
settings.logo && settings.size < 350
? "⚠️ Logo + QR i vogël = rrezik mos-leximi"
: "";

if (logoTooBigWarning) {
alert(logoTooBigWarning);
}

const qrCode = new QRCodeStyling({
width: Number(settings.size),
height: Number(settings.size),
data: settings.data,

qrOptions: {  
  errorCorrectionLevel: "H"  
},  

dotsOptions: {  
  color: settings.color,  
  type: settings.shape  
},  

backgroundOptions: {  
  color: "#ffffff"  
},  

image: settings.logo || undefined,  

imageOptions: {  
  imageSize: 0.25,  
  margin: 8  
}

});

const qrContainer = document.getElementById("qr");
qrContainer.innerHTML = "";
qrCode.append(qrContainer);

document.getElementById("download-png").onclick = () => {
qrCode.download({ name: "qr-code", extension: "png" });
};

document.getElementById("download-svg").onclick = () => {
qrCode.download({ name: "qr-code", extension: "svg" });
};
}

document.addEventListener("DOMContentLoaded", () => {
if (document.getElementById("qr")) {
renderQR();
}

const sizeInput = document.getElementById("size");
if (sizeInput) {
const sizeValue = document.getElementById("sizeValue");
sizeValue.innerText = sizeInput.value + "px";
sizeInput.oninput = () =>
(sizeValue.innerText = sizeInput.value + "px");
}
});
