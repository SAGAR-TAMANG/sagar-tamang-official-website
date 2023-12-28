function submitForm(event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Get form input values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;
  const termsChecked = document.getElementById('terms').checked;

  // Validate or process the input as needed
  // For now, let's just log the values to the console
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Phone:', phone);
  console.log('Message:', message);
  console.log('Terms Checked:', termsChecked);
};

function toggleMenu(){
  var nav = document.getElementById("nav");
  if (nav.style.display === "block") {
    nav.style.display = "none";
  } else {
    nav.style.display = "block";
  }
};

var btnMenu = document.getElementById("btn-menu");

btnMenu.addEventListener("click", function(){
  toggleMenu();
});

function toggleMenu(){
  var nav = document.getElementById("nav");
  var slider = document.getElementsByClassName("slider");
  
  // if (nav.style.display === "block") {
  //   nav.style.display = "none";
  // } else {
  //   nav.style.display = "block";
  // }
    
  if (nav.style.width === "50%") {
    nav.style.width = "0%";
    // btnMenu.style.backgroundColor = "var(--text)";
    // btnMenu.style.color = "var(--bg)";
  } else {
    nav.style.width = "50%";
    // btnMenu.style.backgroundColor = "var(--bg)";
    // btnMenu.style.color = "var(--text)";  
  }
};

var isButtonPressed = false;

function toggleTheme(){
  var theme = document.body;
  
  if (isButtonPressed) {
    console.log('pressed twice');
    if (theme.classList.contains('light'))
      theme.classList.replace('light', 'dark');
    else
      theme.classList.replace('dark', 'light');
  }
  else {
    console.log('Pressed once')
    isButtonPressed = true;
    setTimeout(function() {
      isButtonPressed = false;
    }, 10); // Adjust the time as needed
  }
};

// Smooth Scrolling

// nav_btn = document.querySelectorAll('#nav ul a');

// btn1.addEventListener('click', function (e) {
//   e.preventDefault();

//   document.getElementById(this.getAttribute('data-target')).scrollIntoView({
//     behavior: 'smooth'
//   });
// });

var currentFileName = window.location.pathname.split('/').pop();

// Check if the file name is "example.html"
if (currentFileName === "index.html") {

  nav_btn = document.querySelectorAll('#nav ul a');

  // CODE FOR VERTICAL LINE IN THE MIDDLE HEADER
  var ashishIntroMiddle = document.getElementById("ashish-intro-middle");
  var verticalLine = document.getElementById("vertical-line");

  verticalLine.style.height = (ashishIntroMiddle.offsetHeight + 40) + 'px';

  // Smooth Scrolling

  nav_btn.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

};

// POP UP BEGINS
if (currentFileName === "people-and-leadership.html"){
  btn1 = document.getElementById('popup-link-people-1');
  btn2 = document.getElementById('popup-link-people-2');
  
  function showPopupPeople1() {
    document.getElementById('popup-people-1').style.display = 'block';
  }
  
  function closePopupPeople1() {
    document.getElementById('popup-people-1').style.display = 'none';
  }
  
  btn1.addEventListener('click', function(event) { 
    showPopupPeople1();
  });
  
  function showPopupPeople2() {
    document.getElementById('popup-people-2').style.display = 'block';
  }
  
  function closePopupPeople2() {
    document.getElementById('popup-people-2').style.display = 'none';
  }
  
  btn2.addEventListener('click', function() { 
    showPopupPeople2();
  });
}

// Starts the Carousel / Image Slider

if (currentFileName === "project.html") {
  const wrapper = document.querySelector(".wrapper");
  const carousel = document.querySelector(".carousel");
  const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const carouselChildrens = [...carousel.children];

  let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

  // Get the number of cards that can fit in the carousel at once
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  // Insert copies of the last few cards to beginning of carousel for infinite scrolling
  carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

  // Insert copies of the first few cards to end of carousel for infinite scrolling
  carouselChildrens.slice(0, cardPerView).forEach(card => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");

  // Add event listeners for the arrow buttons to scroll the carousel left and right
  arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
          carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
      });
  });

  const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      // Records the initial cursor and scroll position of the carousel
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
  }

  const dragging = (e) => {
      if(!isDragging) return; // if isDragging is false return from here
      // Updates the scroll position of the carousel based on the cursor movement
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  }

  const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
  }

  const infiniteScroll = () => {
      // If the carousel is at the beginning, scroll to the end
      if(carousel.scrollLeft === 0) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
          carousel.classList.remove("no-transition");
      }
      // If the carousel is at the end, scroll to the beginning
      else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
          carousel.classList.add("no-transition");
          carousel.scrollLeft = carousel.offsetWidth;
          carousel.classList.remove("no-transition");
      }

      // Clear existing timeout & start autoplay if mouse is not hovering over carousel
      clearTimeout(timeoutId);
      if(!wrapper.matches(":hover")) autoPlay();
  }

  const autoPlay = () => {
      if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
      // Autoplay the carousel after every 2500 ms
      timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
  }
  autoPlay();

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);
};

document.getElementById('myFormContact').addEventListener('submit', function(event) {
  if (!isFormValid()) {
    event.preventDefault(); // Prevent the form submission if fields are not filled
    alert('Please fill in all fields before submitting.');
  }
});

function isFormValid() {
  // Check if all required fields are filled
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var message = document.getElementById('message').value;
  var terms = document.getElementById('terms').checked;

  return name && email && phone && message && terms;
}
