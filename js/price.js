
// price details 

const cropName = document.getElementById("cropName");
const cropPrice = document.getElementById("cropPrice");
const priceList = document.getElementById("priceList");
const btn = document.getElementById("btn");

// Get data from Local Storage
let crops = JSON.parse(localStorage.getItem("CropName & price")) || [];

console.log(crops);
console.log(crops.length);

for(let i = 0; i < crops.length; i++){

    if(!crops[i].updatedAt){
        crops[i].updatedAt = new Date().toISOString();
    }

}

localStorage.setItem("CropName & price", JSON.stringify(crops));

// edit variable
 let editIndex = -1;

// Display saved crops when the page loads
function displayCrops(list) {

  // added a original index to crops

    list = list.map((crop, index) => ({
        ...crop,
        originalIndex: crop.originalIndex ?? index
    }));

   // clear old list
  priceList.innerHTML="";
 
  // display every crops
  for(let i=0;i<list.length;i++){
    // create a card
    priceList.innerHTML += `
    <div class="price-card">
      <div class="crop-info">
        <h3>${list[i].name}</h3>
        <p> ₹${Number(list[i].price).toLocaleString("en-in")}</p>
      </div>

      <div class="button-group">
         <button class="edit-button" data-index="${list[i].originalIndex}">
            <i class="fa-solid fa-pen-to-square"></i>
            Edit
         </button>

        <button class="del-button" data-index="${list[i].originalIndex}">
         <i class="fa-solid fa-trash"></i>
         Delete
        </button>
      </div>
    </div>
    `;
}
// delete crops

const deleteButton = document.querySelectorAll(".del-button");
for(let i=0;i<deleteButton.length;i++){
  deleteButton[i].addEventListener("click",() =>{

       
     const index = deleteButton[i].dataset.index;
     // confirm 
     if(confirm("Are you want to delete this crop ?")){
     crops.splice(index,1);

       
     localStorage.setItem("CropName & price",JSON.stringify(crops));
     displayCrops(crops);    
     }
  });
}
  // edit crops 

const editButton = document.querySelectorAll(".edit-button");
const priceForm = document.getElementById("priceForm");
for(let i=0;i<editButton.length;i++){
  editButton[i].addEventListener("click",() =>{
  
      // Get the ORIGINAL index from data-index
    const index = editButton[i].dataset.index;

    cropName.value = crops[index].name;
   cropPrice.value = crops[index].price;
   editIndex = index;
  
  // update button 
   if(confirm("Are you want to edit this crop ?")){
  btn.innerHTML = `
         <i class="fa-solid fa-pen"></i>
    Update Price
    `;
   }

   // autoscroll
   priceForm.scrollIntoView({
    behavior: "smooth",
    block :"start"
   });
   cropName.focus();
  });
  
}
}


displayCrops(crops);
if(btn){
    btn.addEventListener("click",() =>{

      if(cropName.value.trim() === "" && cropPrice.value.trim() === ""){
            alert("Please  enter the crop name and price ");
          return;
       }
      else if(!(cropName.value.trim() === "") && cropPrice.value.trim() === ""){
            alert("Please  enter the   price ");
          return;
       }
       else if(cropName.value.trim() === "" && !(cropPrice.value.trim() === "")){
            alert("Please  enter the  crop name ");
          return;
       }
        // check whether the crop already exists

        let existingIndex = crops.findIndex((crop)=>{
            return crop.name.toLowerCase() === cropName.value.toLowerCase();
        });
        if(editIndex === -1 && existingIndex !== -1 ){
          if(confirm(`${cropName.value } already exists.\n\n Do you want to update this price?`))
          {

            editIndex = existingIndex;
            cropName.value = crops[existingIndex].name;
            cropPrice.value = crops[existingIndex].price;


          // update btn
            btn.innerHTML = `
                <i class="fa-solid fa-pen"></i>
                Update Price
              `;

            priceForm.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
            });

            cropPrice.focus();
          }
          return;
        }
    
        // Create object
     const crop = {
       name:cropName.value,
       price:cropPrice.value,
       updatedAt: new Date().toISOString()
     };
     if(editIndex === -1)
      {
      // Add to array
        crops.push(crop);
      }else{
        // update the existing crop 
        crops[editIndex] = crop;

        // reset edit mode
        editIndex = -1;

         // Change button back
    btn.innerHTML = `
        <i class="fa-solid fa-plus"></i>
        Add Price
    `;
           
      }

    // Save updated array
        localStorage.setItem("CropName & price", JSON.stringify(crops));
     
        console.log(crops);


     // Clear inputs
      cropName.value = "";
      cropPrice.value = "";
             
      
     // autoscroll
     priceForm.scrollIntoView({
      behavior: "smooth",
      block :"start"
     });

     

      displayCrops(crops);

       // Move cursor back to Crop Name
      cropName.focus();
    });
}

// search box 
 
const searchCrop = document.getElementById("searchCrop");

searchCrop.addEventListener("input",() =>{
    // console.log(searchCrop.value);

// new Array for index store

     let newArr = crops.map((crop,index) => {
    return {
        originalIndex: index,
        name: crop.name,
        price: crop.price
    };
  });
    // use filter

    let filtered = newArr.filter((sc) =>{
      return (
        sc.name.toLowerCase().includes(searchCrop.value.toLowerCase())
      );
    });
   //   console.log(filtered); 
  if (filtered.length === 0) {

    priceList.innerHTML = `
        <div class="price-card" style="justify-content:center;">
            <div style="text-align:center;">
                <h3>🔍 No crops found</h3>
                <p>Try another crop name.</p>
            </div>
        </div>
    `;

} else {

    displayCrops(filtered);

}


});


// sort by 

const sortCrop = document.getElementById("sortCrop");

sortCrop.addEventListener("change",() =>{
 // console.log(sortCrop.value)

 let sorted =  crops.map((crop,index) => {
    return {
        originalIndex: index,
        name: crop.name,
        price: crop.price
    };
  });
 // low to high
if(sortCrop.value === "low-high"){
  sorted.sort((a,b) =>{
    return Number(a.price) - Number(b.price);
  })
}

// high to low 
 else if(sortCrop.value === "high-low"){
  sorted.sort((a,b) =>{
    return Number(b.price) - Number(a.price);
  })
}

// a-z
else if(sortCrop.value === "az"){
  sorted.sort((a,b) =>{
    return a.name.localeCompare(b.name);
  })
}

// z-a
else if(sortCrop.value === "za"){
  sorted.sort((a,b) =>{
    return b.name.localeCompare(a.name);
  })
}
displayCrops(sorted);
});
