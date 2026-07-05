  
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

const ctx = document.getElementById("priceChart");

let cropName = [];
let cropPrice = [];

for(let i =0;i<crops.length;i++){
    cropName.push(crops[i].name);
    cropPrice.push(crops[i].price);
}
console.log(cropName);
console.log(cropPrice);

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