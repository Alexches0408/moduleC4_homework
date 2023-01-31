const dropZone = document.querySelector("#select_form")
const input = document.querySelector("#select_file")
let file
let offset = 0; //Смещение от левого края
const sliderLine = document.querySelector(".slider-line");

document.addEventListener('dragover', ev => ev.preventDefault())
document.addEventListener('drop', ev => ev.preventDefault())

dropZone.addEventListener('drop', ev => {
    ev.preventDefault()

    file = ev.dataTransfer.files
    

    handleFile(file)
})


dropZone.addEventListener('click', ev => {
    input.click()

    input.addEventListener('change', () => {
        file = input.files

        handleFile(file)
    })
})

const handleFile = file => {
    dropZone.remove()
    input.remove()
    
    for (let i=0; i<file.length; i +=1){
        let image = document.createElement('img')
        image.src = URL.createObjectURL(file[i])
        
        document.getElementsByClassName('slider-line')[0].append(image)

        URL.revokeObjectURL(image)

    }
}

document.querySelector('.slider-next').addEventListener('click', function(){
	lenght = document.getElementsByClassName('slider-line')[0].getElementsByTagName('img').length
    if (lenght){
	    offset += 480;
	    if (offset>480*(lenght-1)){
		    offset=0;
	    }
	    sliderLine.style.right = offset + 'px';
    }
    else {
        alert("Выберите изображения")
    }
});


document.querySelector('.slider-next').addEventListener('keydown', function(event){
    if (event.code == 'Enter'){
        lenght = document.getElementsByClassName('slider-line')[0].getElementsByTagName('img').length
        if (lenght){
            offset += 480;
            if (offset>480*(lenght-1)){
                offset=0;
            }
            sliderLine.style.right = offset + 'px';
        }
        else {
            alert("Выберите изображения")
        }
    }
});

document.querySelector('.slider-prev').addEventListener('click', function(){
    lenght = document.getElementsByClassName('slider-line')[0].getElementsByTagName('img').length
    if (lenght){
        offset -= 480;
        if (offset<0){
            offset=480*(lenght-1);
        }
        sliderLine.style.right = offset + 'px';
    }
    else {
        alert("Выберите изображения")
    }
});

document.querySelector('.slider-prev').addEventListener('keydown', function(event){
    if (event.code == 'Enter'){
        lenght = document.getElementsByClassName('slider-line')[0].getElementsByTagName('img').length
        if (lenght){
            offset -= 480;
            if (offset<0){
                offset=480*(lenght-1);
            }
            sliderLine.style.right = offset + 'px';
        }
        else {
            alert("Выберите изображения")
        }
    }
});
