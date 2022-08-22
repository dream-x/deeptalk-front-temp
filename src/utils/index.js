export const saveData = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (dataBlob, fileName) {
      // var json = JSON.stringify(data);
      // const blob = new Blob([json], {type: "octet/stream"});
      const url = window.URL.createObjectURL(dataBlob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
  };
}());

// var data = { x: 42, s: "hello, world", d: new Date() },
  // fileName = "my-download.json";

