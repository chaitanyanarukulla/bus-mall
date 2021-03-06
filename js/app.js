'use strict';
var allProducts = [];
var newrender = [];
var oldrender = [];
var totalClicks = 0;
var productPic = document.getElementById('imgrool');

//Checking for local storage ------------------------------------------------------------------->
if(localStorage.chai){
  allProducts = JSON.parse(localStorage.chai);
}
else{
  new Product('bag', 'img/bag.jpg');
  new Product('banana', 'img/banana.jpg');
  new Product('bathroom', 'img/bathroom.jpg');
  new Product('boots', 'img/boots.jpg');
  new Product('breakfast', 'img/breakfast.jpg');
  new Product('bubblegum', 'img/bubblegum.jpg');
  new Product('chair', 'img/chair.jpg');
  new Product('cthulhu', 'img/cthulhu.jpg');
  new Product('dog', 'img/dog-duck.jpg');
  new Product('dragon', 'img/dragon.jpg');
  new Product('pen', 'img/pen.jpg');
  new Product('pet', 'img/pet-sweep.jpg');
  new Product('scissors', 'img/scissors.jpg');
  new Product('shark', 'img/shark.jpg');
  new Product('sweep', 'img/sweep.png');
  new Product('tauntaum', 'img/tauntaun.jpg');
  new Product('unicorn', 'img/unicorn.jpg');
  new Product('usb', 'img/usb.jpg');
  new Product('water', 'img/water-can.jpg');
  new Product('wine', 'img/wine-glass.jpg');
}

// Constructor Function to make Product  --------------------------------------------------->
function Product(name, path) {
  this.path = path;
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}
//function for  3 random picture which are not repeted ---------------------------------------------------------------->
function randomPic() {
  newrender=[];
  while (newrender.length < 3) {
    var randomNum = Math.floor(Math.random() * allProducts.length);
    console.log('this is random #',randomNum);
    if (!newrender.includes(allProducts[randomNum]) && !oldrender.includes(allProducts[randomNum])) {
      newrender.push(allProducts[randomNum]);
    }
    else{
      randomPic();
    }
  }
  oldrender = newrender;
}
// putting img on screen-------------------------------------------------------------------------->
function render() {
  randomPic();
  for (var i = 0; i < newrender.length; i++) {
    var imgEl = document.createElement('img');
    imgEl.src = newrender[i].path;
    imgEl.id = newrender[i].name;
    productPic.appendChild(imgEl);
    newrender[i].views++;
  }
}
//calculate conversion rate---------------------------------------------------------------------------->
function calcConversion() {
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].views === 0) {
      allProducts[i].views = 0;
    } else {
      allProducts[i].percent = allProducts[i].clicks / allProducts[i].views;
    }
  }
}
// Wipe the window imgs------------------------------------------------------->
function wipe() {
  while (productPic.firstChild) {
    productPic.removeChild(productPic.firstChild);
  }
}

// Event handler--------------------------------------------------------------->
function handleClick(event) {
  for (var i = 0; i < newrender.length; i++) {
    if (event.target.id === newrender[i].name) {
      newrender[i].clicks++;
      totalClicks++;
      localStorage.setItem('chai', JSON.stringify(allProducts));
    } 
  }
  if (totalClicks === 25) {
    productPic.removeEventListener('click', handleClick);
    wipe();
    calcConversion();
    coolChart();
    coolChart2();
  } else {
    wipe();
    render();
  }
}
render();
productPic.addEventListener('click', handleClick);


// making  Views clicked chart and putting it on DOM ------------------------------------------------------------------>
function coolChart() {
  var chartLabel = [];
  var chartData = [];
  for (var i = 0; i < allProducts.length; i++) {
    chartData.push(allProducts[i].clicks);
    chartLabel.push(allProducts[i].name);
  }
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabel,
      datasets: [{
        label: 'Buss Mall - Products Clicked ',
        data: chartData,
        backgroundColor: [
          'rgba(255, 99, 139, 1)',
          'rgba(54, 162, 235, .9)',
          'rgba(255, 206, 88, .8)',
          'rgba(75, 192, 89, 1)',
          'rgba(153, 102, 25, .9)',
          'rgba(25, 159, 64, .8)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, .7)',
          'rgba(255, 206, 88.8)',
          'rgba(175, 192, 92, 1)',
          'rgba(153, 102, 255,.9)',
          'rgba(255, 159, 64,.8)',
          'rgba(255, 199, 132, 1)',
          'rgba(54, 162, 235, .8)',
          'rgba(255, 206, 88, .9)',
          'rgba(175, 192, 192, 11)',
          'rgba(153, 102, 255, .9)',
          'rgba(255, 159, 64, .8)',
          'rgba(255, 99, 132,1)',
          'rgba(54, 162, 235.9)',
        ],
        borderColor: [
          'rgba(255, 99, 139, 1)',
          'rgba(54, 162, 235, .9)',
          'rgba(255, 206, 88, .8)',
          'rgba(75, 192, 89, 1)',
          'rgba(153, 102, 25, .9)',
          'rgba(25, 159, 64, .8)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, .7)',
          'rgba(255, 206, 88.8)',
          'rgba(175, 192, 92, 1)',
          'rgba(153, 102, 255,.9)',
          'rgba(255, 159, 64,.8)',
          'rgba(255, 199, 132, 1)',
          'rgba(54, 162, 235, .8)',
          'rgba(255, 206, 88, .9)',
          'rgba(175, 192, 192, 11)',
          'rgba(153, 102, 255, .9)',
          'rgba(255, 159, 64, .8)',
          'rgba(255, 99, 132,1)',
          'rgba(54, 162, 235.9)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive:false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
// making  convertion rate chart and putting it on DOM ------------------------------------------------------------------>
function coolChart2() {
  var chartLabel = [];
  var chartCon = [];
  for (var i = 0; i < allProducts.length; i++) {
    chartLabel.push(allProducts[i].name);
    chartCon.push(allProducts[i].percent);
  }

  var ctx = document.getElementById('myChart2').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: chartLabel,
      label: 'Buss Mall - Conversion -Rate',
      datasets: [{
        data: chartCon,
        backgroundColor: [
          'rgba(255, 99, 139, 1)',
          'rgba(54, 162, 235, .9)',
          'rgba(255, 206, 88, .8)',
          'rgba(75, 192, 89, 1)',
          'rgba(153, 102, 25, .9)',
          'rgba(25, 159, 64, .8)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, .7)',
          'rgba(255, 206, 88.8)',
          'rgba(175, 192, 92, 1)',
          'rgba(153, 102, 255,.9)',
          'rgba(255, 159, 64,.8)',
          'rgba(255, 199, 132, 1)',
          'rgba(54, 162, 235, .8)',
          'rgba(255, 206, 88, .9)',
          'rgba(175, 192, 192, 11)',
          'rgba(153, 102, 255, .9)',
          'rgba(255, 159, 64, .8)',
          'rgba(255, 99, 132,1)',
          'rgba(54, 162, 235.9)',
        ],
        borderColor: [
          'rgba(255, 99, 139, 1)',
          'rgba(54, 162, 235, .9)',
          'rgba(255, 206, 88, .8)',
          'rgba(75, 192, 89, 1)',
          'rgba(153, 102, 25, .9)',
          'rgba(25, 159, 64, .8)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, .7)',
          'rgba(255, 206, 88.8)',
          'rgba(175, 192, 92, 1)',
          'rgba(153, 102, 255,.9)',
          'rgba(255, 159, 64,.8)',
          'rgba(255, 199, 132, 1)',
          'rgba(54, 162, 235, .8)',
          'rgba(255, 206, 88, .9)',
          'rgba(175, 192, 192, 11)',
          'rgba(153, 102, 255, .9)',
          'rgba(255, 159, 64, .8)',
          'rgba(255, 99, 132,1)',
          'rgba(54, 162, 235.9)',
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive:false,
      legend: { display: false },
      title: {
        display: true,
        text: 'Percent Clicks'
      }
    }
  });
};

