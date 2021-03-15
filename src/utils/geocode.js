const request=require('request')
//defing the function
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5zaDQ3IiwiYSI6ImNrbHlzc2JtaTFvdngyd28zMm5od2ZvNzYifQ.h7jP8BgVei51FSV637PE9g&limit=1'
    //dynamic address var with encodeURIComponent(if adress consist special char, app may crash. this fn prohibit that) inside static url       
    request({url,json:true},(error,{body})=>{       //shorthand url ,destructed response.body to body
            if(error)
            {
                    //we return error to geocode instead of logg it here.(ex for sending error feedback to admin)
                    callback('Unable to connect to location servies!',undefined)      
            }
            else if(body.features.length===0)
            {
                    callback('Unable to find location! Try  another location search ',undefined)
            }
            else
            {
                    callback(undefined,{
                            latitude:body.features[0].center[1],
                            longitude:body.features[0].center[0],
                            location:body.features[0].place_name
                    })         //giving object
            }
    })
}
module.exports=geocode