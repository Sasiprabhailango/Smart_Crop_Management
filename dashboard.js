  
const totalCrops = document.getElementById("totalCrops");
const priceEntries = document.getElementById("priceEntries");
const highestPrice = document.getElementById("highestPrice");
const lowestPrice = document.getElementById("lowestPrice");
const averagePrice = document.getElementById("averagePrice");
const recentList = document.getElementById("recentList");
const totalPrice = document.getElementById("totalPrice");


let crops = JSON.parse(localStorage.getItem("CropName & price")) || [];

totalCrops.textContent = crops.length;

priceEntries.textContent = crops.length;

//highest price

 let highest =0;
 let highestCrop = "";
for(let i =0;i<crops.length;i++){
   // console.log(crops);
     if (Number(crops[i].price) > highest) {

        highest = Number(crops[i].price);
        highestCrop = crops[i].name;

    }

}

highestPrice.textContent =  highestCrop + " ₹" + Number(highest).toLocaleString("en-in");

//lowest price

 let lowest =crops[0].price;
 let lowestCrop = "";
for(let i =0;i<crops.length;i++){
   // console.log(crops);
    if (Number(crops[i].price) < lowest) {

        lowest = Number(crops[i].price);
        lowestCrop = crops[i].name;

    }

}
lowestPrice.textContent =  lowestCrop +" ₹" + Number(lowest).toLocaleString("en-in");


// total value of all crops 

let total = 0;
for(let i = 0;i<crops.length;i++){
    total+=Number(crops[i].price);
}
totalPrice.textContent = "₹" + Number(total).toLocaleString("en-in");

// average price
let average =  0;
if(crops.length > 0){
    average = (total / crops.length).toFixed(2);
}else{
    average = 0;
}
averagePrice.textContent = "₹" + Number(average).toLocaleString("en-in");


// piechart

let cropName = [];
let cropPrice = [];

for(let i =0;i<crops.length;i++){
    cropName.push(crops[i].name);
    cropPrice.push(Number(crops[i].price));
}
console.log(cropName);
console.log(cropPrice);

const ctx = document.getElementById("priceChart");

let chart ;

// function for chart

function drawChart(type) {
 chart = new Chart(ctx, {
    type: type,

    data: {
        labels: cropName,

        datasets: [{
            label: "Crop Price (₹)",
            data: cropPrice,
          backgroundColor: [
                             "#2E7D32",
                             "#388E3C",
                             "#43A047", 
                             "#4CAF50",
                             "#66BB6A",
                             "#81C784",
                             "#A5D6A7",
                             "#8BC34A",
                             "#9CCC65",
                             "#AED581",
                             "#C0CA33",
                             "#D4E157",
                             "#FFB300",
                             "#FF9800",
                             "#FB8C00",
                             "#6D4C41",
                             "#8D6E63"
                            ],
            borderColor: "rgb(34, 197, 94)",
            borderWidth: 2
        }]
    },
    
    options: {
        responsive: true,

        plugins: {
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}

drawChart("bar");

const chartSelect = document.getElementById("chartSelect");

chartSelect.addEventListener("change",() =>{
    if(chart){
        chart.destroy();
    }
    drawChart(chartSelect.value);
})


// top crops

const topCropList = document.getElementById("topCropList");

let  topCrops = [...crops];

topCrops.sort((a,b) =>{
    return Number(b.price) - Number(a.price);
  })
let  topFive = topCrops.slice(0,5);
topCropList.innerHTML = "";

for(let i=0;i<topFive.length;i++){
         topCropList.innerHTML += `
    <p>${topFive[i].name} - ₹${topFive[i].price}</p>
`;
}

// recent list 


recentList.innerHTML = "";
for(let i=0;i<crops.length;i++){
    recentList.innerHTML+=`
    <tr>
       <td>${crops[i].name}</td>
       <td>₹${Number(crops[i].price).toLocaleString("en-in")}</td>
    </tr>
    `
}