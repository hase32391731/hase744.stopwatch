'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  var lap = document.getElementById('lap')
  var laps = document.getElementById('laps')
  

  let startTime;
  let stopTime ;
  let spaceTime = 0;
  let timeoutId;
  let lapTime;
  let i =1;
  
  function DisplayTime(){
    const d = new Date(Date.now() - lapTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    var header = document.createElement('h3')
    laps.appendChild(header);
    header.innerText=('lap'+i+'   '+`${m}:${s}.${ms}`)
    i = i+1
    lapTime = Date.now();
    
  }


  function countUp() {
    let d = new Date(Date.now() - startTime + spaceTime);
    let m = String(d.getMinutes()).padStart(2, '0');
    let s = String(d.getSeconds()).padStart(2, '0');
    let ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}.${ms}`;
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  function setButtonInitial(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
    lap.classList.add('inactive');
}

function setButtonRunning(){
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.remove('inactive');
    lap.classList.remove('inactive');
    
}

function setButtonStop(){
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
    lap.classList.add('inactive');
}

setButtonInitial()

  


  start.addEventListener('click', () => {
      if (start.classList.contains('inactive')===true){
          return;
      }
    start.innerText = "start"
    startTime = Date.now();
    lapTime = Date.now();
    countUp();
    setButtonRunning()
    laps.style.display = "block"
  });

  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive')===true){
        return;
    }
    start.innerText = "restart"
    lapTime = null
    stopTime = Date.now();
    clearTimeout(timeoutId);
    spaceTime = spaceTime + stopTime - startTime;
    setButtonStop()
  });

  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive')===true){
        return;
    }
    start.innerText = "start"
    timer.textContent = '00:00.000';
    laps.innerText = null;
    i = 1
  });

  
  lap.addEventListener('click',()=>{
    if (lap.classList.contains('inactive')===true){
        return;
    }
    DisplayTime()
  })

}