const videoFormatos = ".webm,.mpg,.mp2,.mpeg,.mpe,.mpv,.ogg,.mp4,.m4p,.m4v,.avi,.wmv,.mov,.qt,.flv,.swf,avchd"

const videoFile = document.getElementById('videoFile');
const videoPlayer = document.getElementById('video')

videoFile.setAttribute('accept', videoFormatos);

const playVideo = () => {
  videoPlayer.play();
};
const pauseVideo = () => {
  videoPlayer.pause();
};
const turnUpVolume = () => {
  if(videoPlayer.volume < 1) videoPlayer.volume += 0.1;
  console.log(videoPlayer.volume)
};
const turnDownVolume = () => {
  if (videoPlayer.volume > 0) videoPlayer.volume -= 0.1;
  console.log(videoPlayer.volume)
};

const validar = () => {
  let nombreArchivo = videoFile.value;
  let extension = nombreArchivo.substring(nombreArchivo.lastIndexOf('.'), nombreArchivo.length);
  // Muestra error si la extensión o está en el atributo accept
  if (videoFile.getAttribute('accept').split(',').indexOf(extension) < 0) {
    alert('Archivo inválido. No se permite la extensión ' + extension);
    videoFile.value = '';
  }
  else return true;
};

const crearUrl = () => {
  let file = videoFile.files[0];
  let videoUrl = URL.createObjectURL(file);
  videoPlayer.src = videoUrl;
};

const cargarVideo = () => {
  
  videoPlayer.load();
  document.getElementById('spinner').style.display = "block"
  videoPlayer.onloadeddata = () => {
    setTimeout(function () {
      document.getElementById('spinner').style.display = "none"
    }, 500);
    
  }

};

if (window.File && window.FileReader && window.FileList) {
  console.log('Todas las APIs soportadas');
  function handleFileSelect(e) {
    if (validar()) {
      var files = e.target.files;
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong>(', f.type || 'n / a', ') - ',
      f.size, ' bytes, last modified: ',
      f.lastModifiedDate.toLocaleDateString(), '</li>');
    }
    list.innerHTML = '<ul>' + output.join('') + '</ul>';
    crearUrl();
    cargarVideo();
    }
  }
} else {
  alert('La API de FILE no es soportada en este navegador.');
}
