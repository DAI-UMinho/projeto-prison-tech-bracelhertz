const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./face/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./face/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./face/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./face/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('./face/models')
])



async function faz() {
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  canvas.style.zIndex = "3";
  var tentativa = 0;
  var pessoa = "";
  var logar = "";

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))

    //console.log(results[0])
    if (typeof results[0] !== 'undefined') {
      if (tentativa == 0) {
        pessoa = results[0]._label;
        logar = results[0]._label;
        tentativa++;
      } else {
        pessoa = results[0]._label;
        if (logar == pessoa) {
          if (tentativa == 30) {
            if (logar != "unknown") {
              alert("Logar o " + logar);
            } else {
              alert("Cara não reconhecida");
              tentativa = 0;
            }
          } else {
            tentativa++;
          }
        } else {
          tentativa = 0;
        }
      }
    } else {
      tentativa = 0;
    }
    console.log(tentativa)

    results.forEach((result, i) => {
      //console.log(result)
      const bottomRight = {
        x: resizedDetections[0].detection.box.bottomRight.x - 50,
        y: resizedDetections[0].detection.box.bottomRight.y,
      }

      new faceapi.draw.DrawTextField([`${result._label}`], bottomRight).draw(canvas);

    })
  }, 100)
}





async function loadLabeledImages() {

  const labels = [];

  const response = await fetch('https://backend-bracelhertz.herokuapp.com/api/facial-recognition-images', {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    method: 'GET',
  });
  var users = await response.json();
  console.log(users);

  for (var user of users) {
    labels.push(user)
  }


  return Promise.all(

    labels.map(async label => {

      const descriptions = [];

      const user = "data:image/png;base64," + label.picByte;
      const img = await faceapi.fetchImage(`${user}`)

      const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

      if (typeof detections !== 'undefined') {
        descriptions.push(detections.descriptor)
      }
      return new faceapi.LabeledFaceDescriptors(label.username, descriptions)
    })



  )
}


const btn = document.getElementById("btnVideo");

function startVideo() {
  video.style.display = "block";

  //video.height = document.getElementById("sizeVideo").offsetHeight;
  //video.width = document.getElementById("sizeVideo").offsetWidth;

  document.getElementById("sizeVideo").offsetWidth;
  btn.style.display = "block";

  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
  faz();
}

function endVideo() {

  const stream = video.srcObject;
  const tracks = stream.getTracks();
  const canvas = document.getElementsByTagName("CANVAS")[0];

  tracks.forEach(function (track) {
    track.stop();
  });

  video.srcObject = null;

  video.style.display = "none";
  canvas.remove();
  btn.style.display = "none";
}