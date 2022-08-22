export function watchForAudioStreamEvents(stream, eventEmmiters) {
  const {
    emmitStopRecordEvent
  } = eventEmmiters;

  const audioCtx = new AudioContext();

  const source = audioCtx.createMediaStreamSource(stream);
  const analyser = audioCtx.createAnalyser();
  source.connect(analyser);

  analyser.fftSize = 2048;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  let k = 0;
  let pause = 0;
  draw()

  function draw() {

    if (pause == 2) {
      console.log("пауза длинная")
      pause = 0;
      emmitStopRecordEvent();
      return
    }

    if (k == 100) {
      k = 0;
      pause++;
    }

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    let sum = 0.0;

    for (let i = 0; i < bufferLength; i++) {

      let v = dataArray[i];
      sum = + v

      if (i == bufferLength - 1) {

        // работает
        if ((sum / i) < 0.12) {
          // console.log("Работает")
          pause = 0;
        } else {
          // console.log("Пауза")
          k++;
        }

      }
    }

  }
}
