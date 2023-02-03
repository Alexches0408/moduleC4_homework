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
        image.className = 'image_in'
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

document.querySelector('.library').addEventListener('click', () =>{
    let images = document.querySelectorAll('.image_in')
    images.forEach(element => {
        element.remove()
    }); 
    dropZone.remove()
    input.remove()
    fetch(`https://picsum.photos/v2/list?page=2&limit=5`)
        .then(response => response.json())
        .then(json => {
            for (let i= 0; i < json.length; i+=1){
                // создаем картинку, вставляем в блок
                let image = document.createElement('img');
                image.src = json[i]['download_url'];
                image.alt = json[i]['author'];
                image.className = 'image_in'
                document.getElementsByClassName('slider-line')[0].append(image);                  
            }
        });
})

document.querySelector('.own').addEventListener('click', (ev) =>{
    let images = document.querySelectorAll('.image_in')
    images.forEach(element => {
        element.remove()
    }); 
    let input2;
    input2 = document.createElement('input');
    input2.type = 'file';
    input2.multiple = true;
    document.getElementsByClassName('slider-line')[0].append(input2);
    input2.click();
    input2.addEventListener('change', () => {
        file = input2.files;
        handleFile(file);
        input2.remove()
    })
});
