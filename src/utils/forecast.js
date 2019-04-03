const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/507264dd6cb0ca64f5d40cf8f494247f/' + latitude + ',' + longitude;
    
    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services', undefined);
        }else if (body.error){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees outside. There is a " + body.currently.precipProbability + "% change of rain. The high of the day is " + body.daily.data[0].temperatureHigh + " degrees and the low of the day is " + body.daily.data[0].temperatureHigh + " degrees." )
        }
    })
}

module.exports = forecast;