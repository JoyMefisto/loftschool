let mainList = document.getElementById('main-list'),
    mainItem = mainList.querySelectorAll('a');

let toggleClass = (e) => {
    let inspect = e.target.classList.contains("active");

    removeActiveItem();

    if(inspect){
        e.target.classList.remove("active");
    } else {
        e.target.classList.add("active");
    }

}

mainList.addEventListener('click', toggleClass);

function removeActiveItem() {
	for(var i = 0; i < mainItem.length; i++) {
		mainItem[i].classList.remove("active");
	}
}
