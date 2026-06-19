const cropSelect = document.getElementById("cropSelect");

if(cropSelect){
    cropSelect.addEventListener("change",() =>{
        console.log(cropSelect.value);
    })
}