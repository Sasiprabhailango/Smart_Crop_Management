// for crop select 

const cropSelect = document.getElementById("cropSelect");

if(cropSelect){
    cropSelect.addEventListener("change",() =>{
        console.log(cropSelect.value);
    });
}

// Insert the data

const cropData = {
    Rice: {
      Water: "Every 2 days",
      Fertilizer: "NPK every 20 days",
      Soil: "Clay soil",
      Disease: "Blast Disease",
      Harvesting: "120 Days"
    },
    Wheat: {
      Water: "Every 3 days",
      Fertilizer: "Nitrogen every 20 days",
      Soil: "Loamy Soil",
      Disease: "Rust Disease",
      Harvesting: "120 Days"
    },
    Corn: {
      Water: "Every 3 days",
      Fertilizer: "NPK every 25 days",
      Soil: "Well-drained Soil",
      Disease: "Leaf Blight",
      Harvesting: "90 Days"
    },
    Cotton: {
      Water: "Every 4 days",
      Fertilizer: "Potassium-rich Fertilizer",
      Soil: "Black Soil",
      Disease: "Wilt Disease",
      Harvesting: "180 Days"
    },
    Sugarcane: {
      Water: "Every 4 days",
      Fertilizer: "Organic+NPK",
      Soil: "Loamy Soil",
      Disease: "Red Rot",
      Harvesting: "300 Days"
    },
    Peanut: {
      Water: "Every 5 days",
      Fertilizer: "Phosphorus Fertilizer",
      Soil: "Sandy Loam Soil",
      Disease: "Leaf Spot",
      Harvesting: "120 Days"
    },
    Soybean: {
      Water: "Every 4 days",
      Fertilizer: "Potash Fertilizer",
      Soil: "Loamy Soil",
      Disease: "Soybean Rust",
      Harvesting: "110 Days"
    },
    Tomato: {
      Water: "Daily",
      Fertilizer: "NPK every 10 days",
      Soil: "Well-drained Soil",
      Disease: "Early Blight",
      Harvesting: "90 Days"
    },
    Potato: {
      Water: "Every 3 days",
      Fertilizer: "Potassium Fertilizer",
      Soil: "Sandy Loam Soil",
      Disease: "Late Blight",
      Harvesting: "100 Days"
    },
    Onion: {
      Water: "Every 3 days",
      Fertilizer: "Nitrogen Fertilizer",
      Soil: "Loamy Soil",
      Disease: "Purple Blotch",
      Harvesting: "120 Days"
    },
    Banana: {
      Water: "Daily",
      Fertilizer: "Organic+NPK",
      Soil: "Loamy Soil",
      Disease: "Panama Disease",
      Harvesting: "300 Days"
    },
    Mango: {
      Water: "Weekly",
      Fertilizer: "Organic Manure",
      Soil: "Deep Loamy  Soil",
      Disease: "Anthracnose",
      Harvesting: "4-5 years"
    },
    Coconut: {
      Water: "Weekly",
      Fertilizer: "Organic+Potash",
      Soil: "Sandy Soil",
      Disease: "Bud Rot",
      Harvesting: "6-7 years"
    },
    Cabbage: {
      Water: "Every 2 days",
      Fertilizer: "Nitrogen Fertilizer",
      Soil: "Well-drained Soil",
      Disease: "Black Rot",
      Harvesting: "90 Days"
    },
    Brinjal: {
      Water: "Every 2 days",
      Fertilizer: "NPK every 15 days",
      Soil: "Loamy Soil",
      Disease: "Fruit Borer",
      Harvesting: "120 Days"
    },
    Cauliflower: {
      Water: "Every 2 days",
      Fertilizer: "Nitrogen Fertilizer",
      Soil: "Fertile Loamy Soil",
      Disease: "Downy Mildew",
      Harvesting: "90 Days"
    }
}

// Display the selected crop 
const result = document.getElementById("result");

// Details of the Selected crop 

if(cropSelect){
    cropSelect.addEventListener("change",() =>{
        const crop = cropData[cropSelect.value];
        if(crop){
            result.style.display = "block";
            result.innerHTML=`
            <h3>${cropSelect.value}</h3>
            <p><strong>Water:</strong> ${crop.Water}</p>
            <p><strong>Fertilizer:</strong> ${crop.Fertilizer}</p>
            <p><strong>Soil :</strong> ${crop.Soil}</p>
            <p><strong>Disease:</strong> ${crop.Disease}</p>
            <p><strong>Harvest:</strong> ${crop.Harvesting}</p>
            `;
        }
    });
}

// price details 

const cropName = document.getElementById("cropName");
const cropPrice = document.getElementById("cropPrice");
const priceList = document.getElementById("priceList");
const btn = document.getElementById("btn");


let crops = [];

if(btn){
    btn.addEventListener("click",() =>{

      if(cropName.value === "" || cropPrice.value === ""){
            alert("Please the crop name and price ");
          return;
       }
     priceList.innerHTML+=`
     <p>${cropName.value} : ₹${cropPrice.value}</p>
      `;
      
      //  // local storage for values 
      //   localStorage.setItem("cropName",cropName.value);
      //   localStorage.setItem("cropPrice",cropPrice.value);
      
     const crop = {
       name:cropName.value,
       price:cropPrice.value
     };
     crops.push(crop);
     console.log(crops);



      cropName.value = "";
      cropPrice.value = "";
    });
}
