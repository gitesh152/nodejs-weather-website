                                            //weather app with web server
    const express=require('express')
    const hbs=require('hbs')
    const path=require('path')
    const app=express()
    const port=process.env.PORT || 3000
    const request=require('request')
    const geocode=require('./utils/geocode')
    const forecast=require('./utils/forecast')
    app.set('view engine','hbs')
    const viewPath=path.join(__dirname,'../templates/views')
    app.set('views',viewPath)
    const partialPath=path.join(__dirname,'../templates/partials')
    hbs.registerPartials(partialPath)
    app.use(express.static(path.join(__dirname,'../public')))
    app.get('',(req,res)=>{
        res.render('index',{
            title:'Weather App',
            name:'Ansh Pradhan'
        })
    })
    app.get('/about',(req,res)=>{
        res.render('about',{
                     title:'About title',
                     name:'Ansh Pradhan'
                 })
    })
    app.get('/help',(req,res)=>{
        res.render('help',{
            helpText:'This is some help text.',
            title:'Help title',
            name:'Ansh Pradhan'})
    })
    app.get('/help/*',(req,res)=>{
        res.render('404',{
            title:'Help Error',name:'ansh',errorMessage:'Error 404 page not found'
        })
    })
    app.get('/products',(req,res)=>{
        if(!req.query.search)
        {
            return res.send({Error:'You must provide a search term'})
        }
        console.log(req.query.search)
        res.send({products:[]})
    })
    app.get('/weather',(req,res)=>{
        if(!req.query.address)
        {
            return res.send({error:'You must provide a address term'})
        }
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
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

        })
        
    })
    app.get('*',(req,res)=>{             
        res.render('404',{
            title:'Error',name:'ansh',errorMessage:'404 page not found'
        })
    })  
    app.listen(port,()=>console.log('Server is listening on port '+port))

