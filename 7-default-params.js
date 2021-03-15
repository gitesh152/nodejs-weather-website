    // const greeter=(name)=>{
    //     console.log('Hello '+name)
    // }
    // greeter('Ansh') //=>hello Ansh
    // greeter() //=>hello undefined
    //Why we seeing undefined bcuz defined is default value for a fn paramater if no arg is passed in
            //default fn paramter
            // const greeter=(name='user',age)=>{
            //     console.log('Hello '+name)
            // }
            // greeter('Ansh') //=>hello Ansh
            // greeter() //=>hello user
            //so we no arg is is provided then fn will use deafult value
            
            // const product={
            //     label:'Note Book',
            //     price:15,
            //     stock:150,
            //     salePrice:undefined
            // }       
            // const transaction=(type,{label,stock})=>{     //here we destructering obj as parameter             
            //     console.log(type,label,stock)
            //  }
            // //transaction('order',product)  
            // //what if we dont provide obj as arg
            // transaction('order')
            //=>Cannot destructure property 'label' of 'undefined' as it is undefined.
            //so it cant destruct prop of undefined or null obj
            
            //for solution we cud give that parameter default value from empty obj(consist of undefined values)
            //as {prop1,prop2,..}={}
            //Now parameter always get an obj ,whether it is passed or empty obj {}
            // const transaction=(type,{label,stock}={})=>{
            //     console.log(type,label,stock)
            // }
            // transaction('order')
            //=>order undefined undefined
            //we cud also give props default values with empty obj
            //now new default values will be used by props instead of undefined values of empty obj
            // const transaction=(type,{label='book',stock=15}={})=>{
            //     console.log(type,label,stock)
            // }
            // transaction('order')

            //geocode fn    
            // geocode(req.query.address,(error,{latitude,longitude,location})=>
            // ....
            // ...       
    //now if we give incrrect address in url
    //localost:3000/weather?address=121ddfd
    //callback inside geocode is called,in which we pass value for error,but we dont pass success data since it was not success
    //=>Cannot destructure property 'latitude' of 'undefined'  (as it is undefined,app crashes)
    //solution we provide empty obj ={} for prop default values 
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{ //here prop lat,long are destructured with emplty obj
    if(error)
    {
        return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error)
        {
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })   
    })

}