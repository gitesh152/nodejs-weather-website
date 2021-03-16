//console.log('Client side javascript file is loaded...') 
//we can see it in only developer options

//now here we will fetch data from given url and drop it to clinet side js 

//below we are saying fetch data from url then run the fn
//fetch will execute asynch operation to fetch data at some time.then
//call the callback inside then
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{     
//     //below we are saying get response in json then run the fn
//     response.json().then((data)=>{
//         console.log(data)   //this also can ce seen in dev tools
//     })
// })    
// //now use our forecast info from below url
// fetch('http://localhost:3000/weather?address=kanpur').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error)
//         {
//             console.log(data.error)
//         }
//         else
//         {   
//             console.log(data.forecast)
//             console.log(data.location)
//         }
//     })
// })
//now we have data in console ,we will render it in real browser window page
//Now we will  create our form in index page
//done , now here

// const weatherForm=document.querySelector('form')
// weatherForm.addEventListener('submit',(e)=>{
//     //as we click it we see Button Clicked for 1/10 sec and page get refresh
//     //to stop page refresh
//     e.preventDefault() //here e in event callback fn is event obj
//     console.log('Button Clicked')
// }) 
//=> error cant read prop of addEventListener of null,bcuz scipt inside head is executed before body cud rendered
//so we move script at last of body in index.hbs


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
//now render data to page
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
messageOne.textContent='Loading ... '
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    //fetch('http://localhost:3000/weather?address='+location+'').then((response)=>{  //for localhost
    fetch('/weather?address='+location+'').then((response)=>{    //for heroku   
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent=data.error
            messageTwo.textContent=""
        }
        else
        {   
            messageOne.textContent=data.forecast
            messageTwo.textContent=data.location
            console.log(data.forecast)
            console.log(data.location)
           
        }
    })
    })
    })