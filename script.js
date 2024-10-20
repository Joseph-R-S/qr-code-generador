//variables
const urlInput = document.getElementById('url');
const containerUrl = document.querySelector('.container-url');
const contenidoUrl = document.querySelector('.contenido-url');
const createQr = document.getElementById('create-qr-code');
const logo = document.querySelector('.logo');
new ClipboardJS('.share');
//creo o qr code e modifico a pantalle removiendo objetos y agregando
const createQrCode = () => {
    if (urlInput.value == '') {
        alert('Introduzca uma url valida');
    } else {
        contenidoUrl.remove();
        //creo las div
        const body = document.querySelector('.body');
        const containerQrCode = document.createElement('div');
        const contenidoQrCode = document.createElement('div');
        const codeQr = document.createElement('div');
        const contenedorBotones = document.createElement('div');

        containerQrCode.className = 'container-qr-code';
        contenidoQrCode.className = 'contenido-qr';
        codeQr.id = 'qrcode';
        contenedorBotones.className = 'container-btn';

        body.appendChild(containerQrCode);
        containerQrCode.appendChild(contenidoQrCode);
        contenidoQrCode.appendChild(codeQr);

        //creo el botton de descarga
        const btnDownload = document.createElement('button');
        btnDownload.className = 'btn download';
        const iDownload = document.createElement('i');
        btnDownload.textContent = 'Download ';
        iDownload.className = 'fa-solid fa-download';

        //creo el boton para compartir
        const btnShare = document.createElement('button');
        btnShare.className = 'btn share';

        //
        const valueToCopy = document.createElement('input');
        valueToCopy.id = 'foo';
        
        //
        const iShare = document.createElement('i');
        btnShare.textContent = 'Share ';
        iShare.className = 'fa-solid fa-share';

        body.appendChild(contenedorBotones);
        contenedorBotones.appendChild(btnDownload);
        contenedorBotones.appendChild(btnShare);

        btnDownload.appendChild(iDownload);
        btnShare.appendChild(iShare);

        //posiciono el logo en la parte de de arriba en la izquierad
        logo.style.position = "absolute";
        logo.style.top = "0px";
        logo.style.left = "0px";
        logo.style.margin = "30px";
        let qrcode = new QRCode(document.getElementById("qrcode"), {
            text: urlInput.value,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });


        btnDownload.addEventListener('click', (e) => {
            const image = document.createElement('img');
            html2canvas(document.querySelector('.contenido-qr')).then(canvas => {

                const link = document.createElement('a');
                link.href = canvas.toDataURL(qrcode._el.lastElementChild.src);
                link.download = 'qrCode.png';

                link.appendChild(image);

                link.click();
            });

        });

        //funtion para compartir o QR code
        
        btnShare.addEventListener('click', () => {
            
            let copia = qrcode._el.lastElementChild.src;

            navigator.clipboard.writeText(copia);
            
            alert('Copiado!!');
        });

        btnShare.addEventListener('touchend', () => {
            const ancora = document.createElement('a');
            
            let location = window.location.href;

            let compartir = `whatsapp://send?text=Aplicação%20para%20criar%20qr%20code%20${location}`;
            ancora.href = compartir;
            ancora.click();
            
        });

    }
}






