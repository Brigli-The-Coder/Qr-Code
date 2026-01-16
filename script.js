/* =========================
   QR GENERATOR - MAIN PAGE
   ========================= */

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

  // Nëse ka logo
  if (logoInput.files.length > 0) {
    const reader = new FileReader();

    reader.onload = function () {
      redirectToResult(reader.result);
    };

    reader.readAsDataURL(logoInput.files[0]);
  }
  // Nëse nuk ka logo
  else {
    redirectToResult("");
  }

  function redirectToResult(logo) {
    const settings = {
      data: data,
      color: color,
      size: size,
      shape: shape,
      logo: logo
    };

    const encoded = encodeURIComponent(JSON.stringify(settings));
    window.location.href = "result.html?qr=" + encoded;
  }
}

/* =========================
   QR RENDER - RESULT PAGE
   ========================= */

function renderQR() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("qr");

  if (!raw) return;

  const settings = JSON.parse(decodeURIComponent(raw));

  if (settings.logo && Number(settings.size) < 350) {
    alert("⚠️ Logo + QR i vogël mund të mos lexohet mirë");
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
  if (!qrContainer) return;

  qrContainer.innerHTML = "";
  qrCode.append(qrContainer);

  const downloadPNG = document.getElementById("download-png");
  const downloadSVG = document.getElementById("download-svg");

  if (downloadPNG) {
    downloadPNG.onclick = () => {
      qrCode.download({ name: "qr-code", extension: "png" });
    };
  }

  if (downloadSVG) {
    downloadSVG.onclick = () => {
      qrCode.download({ name: "qr-code", extension: "svg" });
    };
  }
}

/* =========================
   INIT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("qr")) {
    renderQR();
  }

  const sizeInput = document.getElementById("size");
  const sizeValue = document.getElementById("sizeValue");

  if (sizeInput && sizeValue) {
    sizeValue.innerText = sizeInput.value + "px";
    sizeInput.oninput = () => {
      sizeValue.innerText = sizeInput.value + "px";
    };
  }
});  qrContainer.innerHTML = "";
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

