const request=require('request')
//defing the function
const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=b6280e3f605ed197c11c441cfa2f3981&query='+lat+','+long+''
    request({url,json:true},(error,{body})=>{   //shorthand url ,destructed response.body to body
        if(error)
            {
                    //we return error to forecat instead of log it here.(ex for sending error feedback to admin)
                    callback('Unable to connect to weather servies!',undefined)      
            }
            else if(body.error)
            {
                    callback('Unable to find location! Try  another longitude and latitude ',undefined)
            }
            else
            {
                const current=body.current
                const data=current.weather_descriptions[0]+". It is currently "+current.temperature+" out here. And its feel like "+current.feelslike+" here."
                    callback(undefined,data)                     }
    })
}
module.exports=forecast