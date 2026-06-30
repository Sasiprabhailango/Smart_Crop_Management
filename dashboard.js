  
const totalCrops = document.getElementById("totalCrops");
const priceEntries = document.getElementById("priceEntries");
const highestPrice = document.getElementById("highestPrice");
const averagePrice = document.getElementById("averagePrice");


let crops = JSON.parse(localStorage.getItem("CropName & price")) || [];

priceEntries.textContent = crops.length;

//highest price

 let highest =0;
for(let i =0;i<crops.length;i++){
    console.log(crops);
     highest =Math.max(highest,Number(crops[i].price));

}
highestPrice.textContent = "₹" + Number(highest).toLocaleString("en-in");

// average price

let total = 0;
let avg =  crops.length;
for(let i =0 ;i<avg;i++){
    total+=Number(crops[i].price);
}
let average = (total/avg).toFixed(2);
averagePrice.textContent = "₹" + Number(average).toLocaleString("en-in");