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
const slideItems = document.querySelectorAll(".slide");
const totalSlides = slideItems.length;

function showSlide(){
  slides.style.transform = `translateX(-${index * 100}%)`;

  // reset animasi caption
  slideItems.forEach(slide => {
    slide.querySelector(".caption").style.animation = "none";
  });

  setTimeout(() => {
    slideItems[index].querySelector(".caption").style.animation = "fadeUp 1s ease";
  }, 50);
}

function nextSlide(){
  index = (index + 1) % totalSlides;
  showSlide();
}

function prevSlide(){
  index = (index - 1 + totalSlides) % totalSlides;
  showSlide();
}

// AUTO SLIDE
setInterval(nextSlide, 5000);

// BUTTON
document.querySelector(".next").onclick = nextSlide;
document.querySelector(".prev").onclick = prevSlide;
