const initSlider =() => {
	const imageList = document.querySelector(".slider-wrapper .image-list");
	const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
	const sliderScrollbar = document.querySelector(".wrapper .slider-scrollbar");
	const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
	const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
	
	//handle scrollbar thum drag
	scrollbarThumb.addEventListener("mousedown", (e) => {
		const startX = e.clientX;
		const thumbPosition = scrollbarThumb.offsetLeft;
		
		//update thumb position on mouse move
		const handleMouseMove = (e) => {
			const deltaX = e.clientX - startX;
			const newThumbPosition = thumbPosition + deltaX;
			const maxThumbPosition = sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth;
			
			const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition ));
			const scrollPosition = (boundedPosition / maxThumbPosition ) * maxScrollLeft;
			
			scrollbarThumb.style.left = `${boundedPosition}px`;	
			imageList.scrollLeft = scrollPosition;
		}
		
		const handleMouseUp = () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);	
		}
	
		//add event listener for drag interaction
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	});
	
	//slide images according to the slide button clicks
	slideButtons.forEach(button => {
		button.addEventListener("click", () =>{
			const direction = button.id === "prev-slide" ? -1 : 1;
			const scrollAmount = imageList.clientWidth * direction;
			imageList.scrollBy({left: scrollAmount, behavior: "smooth"});
		});
	});
	
	const handleSlideButtons = () => {
		slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
		slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
	}
	
	//update scrollbar thumb position based on image scroll
	const updateScrollThumbPosition = () => {
		const scrollPosition = imageList.scrollLeft;
		const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
		scrollbarThumb.style.left = `${thumbPosition}px`;
	}
	
	imageList.addEventListener("scroll", () => {
		handleSlideButtons();
		updateScrollThumbPosition();
	});
	
	
}

window.addEventListener("load", initSlider);