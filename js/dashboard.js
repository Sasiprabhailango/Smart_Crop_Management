  
const totalCrops = document.getElementById("totalCrops");
const highestPrice = document.getElementById("highestPrice");
const lowestPrice = document.getElementById("lowestPrice");
const averagePrice = document.getElementById("averagePrice");
const recentList = document.getElementById("recentList");




let crops = JSON.parse(localStorage.getItem("CropName & price")) || [];

totalCrops.textContent = crops.length;
//highest price

 let highest =0;
 let highestCrop = "";
 if(crops.length>0){
   for(let i =0;i<crops.length;i++){
   // console.log(crops);
     if (Number(crops[i].price) > highest) {

        highest = Number(crops[i].price);
        highestCrop = crops[i].name;

    }
   }
   document.getElementById("highestCrop").textContent = highestCrop;
  highestPrice.textContent = " ₹" + Number(highest).toLocaleString("en-in");
} 
 else{
    highestPrice.textContent = "no Data "
 }
//lowest price

 let lowest =0;
 let lowestCrop = "";
 if(crops.length>0)
{
    lowest = Number(crops[0].price);
    lowestCrop = crops[0].name;
   for(let i =0;i<crops.length;i++){
   // console.log(crops);
    
    if (Number(crops[i].price) < lowest) {

        lowest = Number(crops[i].price);
        lowestCrop = crops[i].name;

    }
   }
   document.getElementById("lowestCrop").textContent = lowestCrop;
  lowestPrice.textContent = " ₹" + Number(lowest).toLocaleString("en-in");
}
 else{
    lowestPrice.textContent = "no Data";
 }
// average price

let total = 0;
for(let i = 0;i<crops.length;i++){
    total+=Number(crops[i].price);
}
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
// empty check 

if(crops.length === 0){

    document.querySelector(".chart-container").innerHTML = `
        <h2>
            <i class="fa-solid fa-chart-simple"></i>
            Crop Price Comparison
        </h2>

        <p style="text-align:center;color:gray;padding:40px;">
            📊 Add crops to view the price comparison chart.
        </p>
    `;

}
else{
 drawChart("bar");

 const chartSelect = document.getElementById("chartSelect");

 chartSelect.addEventListener("change",() =>{
    if(chart){
        chart.destroy();
    }
    drawChart(chartSelect.value);
 })
}


// top crops

const topCropList = document.getElementById("topCropList");

let  topCrops = [...crops];

topCrops.sort((a,b) =>{
    return Number(b.price) - Number(a.price);
  })
let  topFive = topCrops.slice(0,5);
topCropList.innerHTML = "";

// empty check 
if(topFive.length === 0){

    topCropList.innerHTML = `
        <p style="text-align:center;color:gray;">
            🌾 No crop data available.
        </p>
    `;

}
else{
  let medal ="";

  for(let i=0;i<topFive.length;i++){
    
    if(i === 0){
        medal = "🥇";
    }

    else if(i === 1){
        medal = "🥈";
    }
    else if(i === 2){
        medal = "🥉";
    }
    else {
        medal = (i+1) +".";
    }

         topCropList.innerHTML += `
         <div class="top-card">
           <p class="medal"> ${medal}</p>
           <p class ="crop-name"> ${topFive[i].name}</p>
           <p class = "crop-price">  ₹ ${Number(topFive[i].price).toLocaleString("en-in")}</p>
         </div>
`;
}
}

// recent list 


recentList.innerHTML = "";

// recent 5 crops 
let recentCrops = [...crops];
recentCrops.sort((a,b) =>{
    return new Date(b.updatedAt) - new Date(a.updatedAt);
});

let recentFive = recentCrops.slice(0,5);
console.log(recentFive); 

// chage the time format 

// get only date
function getDate(dateString){

    return new Date(dateString).toLocaleDateString("en-IN",{
       day:"2-digit",
       month:"short",
       year:"numeric"
    });

}
// for time 
function getTime(dateString){
    return new Date(dateString).toLocaleTimeString("en-in",{
        hour:"2-digit",
        minute:"2-digit"
    });
}

// empty check 
if(recentFive.length === 0){

   
    recentList.innerHTML = `
        <tr>
            <td colspan="3" style="text-align:center; padding:20px; color:gray;">
                📋 No recent price updates available.
            </td>
        </tr>
    `;

}
else{
   for(let i=0;i<recentFive.length;i++){
    
    let status = recentFive[i].status || "Added";
    recentList.innerHTML+=`
    <tr>
       <td>${recentFive[i].name}</td>
       <td>₹${Number(recentFive[i].price).toLocaleString("en-in")}</td>
       <td>${getDate(recentFive[i].updatedAt)}</td>
       <td>${getTime(recentFive[i].updatedAt)}</td>
       <td>
          <span class="${status.toLowerCase()}">
            ${status}
          </span>
       </td>
       
    </tr>
    `
}
}