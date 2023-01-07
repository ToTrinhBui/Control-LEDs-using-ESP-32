var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
window.addEventListener('load', onload);

// khởi tạo WebSocket với máy chủ
function onload(event) {
  initWebSocket();
}

function getValues() {
  websocket.send("getValues");
}

//Khởi tạo kết nối websocket trên cổng được tạo trước đó
function initWebSocket() {
  console.log('Trying to open a WebSocket connection…');
  websocket = new WebSocket(gateway);
  websocket.onopen = onOpen;
  websocket.onclose = onClose;
  websocket.onmessage = onMessage;
}

function onOpen(event) {
  console.log('Connection opened');
  getValues();
}

function onClose(event) {
  console.log('Connection closed');
  setTimeout(initWebSocket, 2000);
}

//hàm này sẽ chạy khi di chuyển thanh Slider
function updateSliderPWM(element) {
  var sliderNumber = element.id.charAt(element.id.length - 1);
  var sliderValue = document.getElementById(element.id).value;
  document.getElementById("sliderValue" + sliderNumber).innerHTML = sliderValue;
  console.log(sliderValue);
  //lấy giá trị từ thành trượt và cập nhật giá trị String tương ứng
  websocket.send(sliderNumber + "s" + sliderValue.toString());
}

function onMessage(event) {
  console.log(event.data);
  var myObj = JSON.parse(event.data);
  var keys = Object.keys(myObj);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    document.getElementById(key).innerHTML = myObj[key];
    console.log(key);
    document.getElementById("slider" + (i + 1).toString()).value = myObj[key];
    console.log(myObj[key]);
    // cập nhập giá trị lên biểu đồ
    if (key == "sliderValue1") {
      updateChart1(myObj[key]);
    }
    else if (key == "sliderValue2") {
      updateChart2(myObj[key]);
    }
    else if (key == "sliderValue3") {
      updateChart3(myObj[key]);
    }
    else if (key == "sliderValue4") {
      updateChart4(myObj[key]);
    }
  }
}

var ctx1 = document.getElementById('myChart1').getContext('2d'); // 2d context
var myChart1 = new Chart(ctx1, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      data: [],
      borderColor: "blue",
      fill: false,
      lineTension: 0
    }]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Statement of LED1 in real-time",
      fontSize: 20
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: '% Brightness'
        }
      }]
    }
  }
});

var ctx2 = document.getElementById('myChart2').getContext('2d'); // 2d context
var myChart2 = new Chart(ctx2, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      data: [],
      borderColor: "brown",
      fill: false,
      lineTension: 0
    }]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Statement of LED2 in real-time",
      fontSize: 20
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: '% Brightness'
        }
      }]
    }
  }
});

var ctx3 = document.getElementById('myChart3').getContext('2d'); // 2d context
var myChart3 = new Chart(ctx3, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      data: [],
      borderColor: "green",
      fill: false,
      lineTension: 0
    }]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Statement of LED3 in real-time",
      fontSize: 20
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: '% Brightness'
        }
      }]
    }
  }
});

var ctx4 = document.getElementById('myChart4').getContext('2d'); // 2d context
var myChart4 = new Chart(ctx4, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      data: [],
      borderColor: "yellow",
      fill: false,
      lineTension: 0
    }]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "Statement of LED4 in real-time",
      fontSize: 20
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: '% Brightness'
        }
      }]
    }
  }
});

function updateChart1(element) {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  myChart1.data.labels.push(dateTime);
  myChart1.data.datasets[0].data.push(element);
  myChart1.update()
}

function updateChart2(element) {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  myChart2.data.labels.push(dateTime);
  myChart2.data.datasets[0].data.push(element);
  myChart2.update()
}

function updateChart3(element) {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  myChart3.data.labels.push(dateTime);
  myChart3.data.datasets[0].data.push(element);
  myChart3.update()
}

function updateChart4(element) {
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  myChart4.data.labels.push(dateTime);
  myChart4.data.datasets[0].data.push(element);
  myChart4.update()
}
