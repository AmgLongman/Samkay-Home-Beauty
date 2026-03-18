// Scripts for Samkay site
document.addEventListener('DOMContentLoaded', function(){

  // Gallery slider
  const slides = document.querySelectorAll('.slide');
  let current = 0;
  function show(index){
      const gallery = document.getElementById('gallery');
      const shift = -index * 100;
      gallery.style.transform = `translateX(${shift}%)`;
  }
  document.getElementById('next').addEventListener('click', ()=>{
      if (current < slides.length - 1 ){
        current++;
      }else{
        current = 0;
      }
      show(current);
  });
  document.getElementById('prev').addEventListener('click', ()=>{
        if (current > 0 ){
            current--;
        }else{
            current = slides.length - 1; 
        }
        show(current);
  });
  // Auto-play
  setInterval(()=>{ current = (current + 1) % slides.length; show(current); }, 5000);

  // Form handling: mailto
  document.getElementById('designForm').addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const location = document.getElementById('location').value.trim();
      const contact = document.getElementById('contact').value.trim();
      const budget = document.getElementById('budget').value.trim();
      const details = document.getElementById('details').value.trim();
      const subject = encodeURIComponent('New design request from ' + name);
      const body = encodeURIComponent(
          'Client Name: ' + name + '\\n' +
          'Location: ' + location + '\\n' +
          'Contact: ' + contact + '\\n' +
          'Budget: ' + budget + '\\n\\n' +
          'Design Details:\\n' + details
      );
      const mailto = `mailto:attitchosamuel@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
      document.getElementById('formMessage').textContent = 'Opening your email client to send the request. If nothing happens, copy the details and email attitchosamuel@gmail.com.';
  });

  // Clear button
  document.getElementById('clear').addEventListener('click', ()=>{
      document.getElementById('designForm').reset();
      document.getElementById('formMessage').textContent = '';
  });

  // Theme auto: respect system but override based on local time (day: light 7:00–18:59)
  function applyTheme(){
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const hour = new Date().getHours();
      let useLight = prefersDark ? false : true;
      if (hour >= 7 && hour < 19) useLight = true; else useLight = false;
      if(useLight) document.body.classList.add('light'); else document.body.classList.remove('light');
  }
  applyTheme();
  setInterval(applyTheme, 60*1000);
});
