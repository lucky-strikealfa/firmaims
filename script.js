function scrollToForm(){
  document.getElementById("kontak").scrollIntoView({
    behavior:"smooth"
  });
}

document.getElementById("form").addEventListener("submit", function(e){
  e.preventDefault();
  document.getElementById("msg").innerText = "Pesan berhasil dikirim!";
});

let index = 0;
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;

// AUTO SLIDE
setInterval(() => {
  nextSlide();
}, 4000);

function nextSlide(){
  index++;
  if(index >= totalSlides) index = 0;
  updateSlide();
}

function prevSlide(){
  index--;
  if(index < 0) index = totalSlides - 1;
  updateSlide();
}

function updateSlide(){
  slides.style.transform = "translateX(-" + (index * 100) + "%)";
}

// BUTTON
document.querySelector(".next").onclick = nextSlide;
document.querySelector(".prev").onclick = prevSlide;
