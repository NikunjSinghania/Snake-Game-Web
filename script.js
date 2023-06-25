/********SETTING THE GAME**********************/


for(let i=1;i<=144;i++){
    let el = document.createElement('span')
    el.setAttribute('id', 'el'+i)
    document.querySelector('#container').append(el)
  }
  
  document.documentElement.style.setProperty('--heightContainer', Math.floor(window.innerHeight/2) + 'px');
  document.documentElement.style.setProperty('--widthContainer', Math.floor(window.innerHeight/ 2) + 'px');
  
  window.addEventListener('resize',()=>{
    document.documentElement.style.setProperty('--heightContainer', Math.floor(window.innerHeight/2) + 'px');
    document.documentElement.style.setProperty('--widthContainer', Math.floor(window.innerHeight/ 2) + 'px');
    
    document.documentElement.style.setProperty('--heightSnake', Math.floor(window.innerHeight/2)/12 + 'px');
    document.documentElement.style.setProperty('--widthSnake', Math.floor(window.innerHeight/ 2)/12 + 'px');
  })
  
  
  document.documentElement.style.setProperty('--heightSnake', Math.floor(window.innerHeight/2)/12 + 'px');
  document.documentElement.style.setProperty('--widthSnake', Math.floor(window.innerHeight/ 2)/12 + 'px');
  
  /************************************************************/

  /********************DECLARATIONS**************************/

  let snakeArray = [1]
  let head = 1;
  let direction = 1
  let counter = 1
  let food = 1
  let foodCoord = Math.floor((Math.random()*144)+1)
  let callMove

  window.addEventListener('keydown', (e)=>{
        if(counter != 0)
        {
          switch(e.keyCode){
            case 38 : if(direction == 2)snakeStop(); head-=12; direction=4;counter=0; break;
            case 40 : if(direction == 4)snakeStop();head+=12; direction=2;counter=0; break;
            case 37 : if(direction == 1)snakeStop();head-=1; direction=3;counter=0;  break;
            case 39 : if(direction == 3)snakeStop();head+=1; direction=1;counter=0; break;
  
          }
        }
  })

  function snakeMove(){
    if(counter){
      if(direction == 1)head+=1
      else if(direction == 2)head+=12
      else if(direction == 3)head-=1
      else head-=12
    }
    console.log(head);

    
    if((head<1 || head>144) || (snakeArray[snakeArray.length-1]%12 == 0 && head == (snakeArray[snakeArray.length-1]+1)) || (snakeArray[snakeArray.length-1]%12 == 1 && head == (snakeArray[snakeArray.length-1]-1)))
    {
      snakeStop()
      return
    }

    snakeArray.map((a,b,c)=>{
      if(head == a){
        snakeStop()
      }
    })

    snakeArray.push(head)
    if(food){
      document.querySelector('#el'+snakeArray[0]).classList.remove('on')
      snakeArray.shift()
    }
    if(snakeArray[0] < 0){
      console.log(snakeArray);
    }
    document.querySelector('#el'+snakeArray[snakeArray.length-1]).classList.add('on')
    counter=1
    food = 1
    if(head == foodCoord){
      food = 0
      document.querySelector('#el'+foodCoord).classList.remove('food')
      foodCoord = Math.floor(Math.random()*144)
      document.querySelector('#el'+foodCoord).classList.add('food')
    }

  }


  function snakeStop(){
    console.log('STOP');
    clearInterval(callMove)
  }

  function main(){


    for(i=0;i<snakeArray.length;i++){
      if(document.querySelector('#el'+snakeArray[i]).classList.length)
      document.querySelector('#el'+snakeArray[i]).classList.remove('on')
    }

    document.querySelector('#el'+foodCoord).classList.remove('food')

    snakeArray = [1]
    head = 1;
    direction = 1
    counter = 1
    food = 1
    foodCoord = Math.floor((Math.random()*144)+1)
    
    document.querySelector('#el'+foodCoord).classList.add('food')
    callMove = setInterval(snakeMove, 100)
  }

  //main()