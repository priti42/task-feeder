const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');


function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);

const modal = document.getElementById('myModal');
const btn = document.getElementById('myBtn');

const span = document.getElementsByClassName('close')[0];

btn.onclick= function(){
  modal.style.display="block";
}

span.onclick= function(){
  modal.style.display="none";
}

window.onclick= function(event){
  if(event.target == modal){
    modal.style.display="none";
  }
}
