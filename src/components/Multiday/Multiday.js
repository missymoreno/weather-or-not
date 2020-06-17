import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Multiday.module.css';

const Multiday = () => {

    let [city, setCity] = useState('');
    // let [unit, setUnit] = useState('imperial');
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [mapLoading, setMapLoading] = useState(false);
    // const uriEncodedCity = encodeURIComponent(city);
    let [responseObj, setResponseObj] = useState({});
    let [mapResponseObj, setMapResponseObj] = useState({});
    let [safe, setSafe] = useState(false);
    let [mapSafe, setMapSafe] =useState(false);
    let [longitude, setLongitude] = useState();
    let [latitude, setLatitude] = useState();
    let citycity = "";


    function getMultiDay(e) {
        console.log("boop")
        console.log(city);
        e.preventDefault();
        // Clear state in preparation for new data
        setError(false);
        setResponseObj({});

        // set lat and long
        function setLatitudeLongitude(callback){
        //    e.preventDefault();
    
                console.log("in setLatitudeLongitude")
                let tempLat = 0;
                let tempLong = 0;
                setMapResponseObj({});
                setMapLoading(true);
                // mapbox API code goes here - 
                // https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoianVhbmpvc2VmZXJuYW5kZXoiLCJhIjoiY2tiaTRyNWM4MGJ1NTJ5bWx2Yzd5a3E3eSJ9.3nNSmXu7AqLrHF-MAepd-A
                // longitude: response.features[0].center[0]
                // latitude: response.features[0].center[1]
                // string interpolate ->
                fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoianVhbmpvc2VmZXJuYW5kZXoiLCJhIjoiY2tiaTRyNWM4MGJ1NTJ5bWx2Yzd5a3E3eSJ9.3nNSmXu7AqLrHF-MAepd-A`)
                .then(response => response.json()
                )
                // .then(function(resp) { return resp.json() }) // Convert data to json
                .then(response => {  
                    setMapResponseObj(response);
                    setMapLoading(false);
                    console.log("MapBox Response JSON Object: " , JSON.stringify(mapResponseObj));
                    console.log("MapBox Response JSON Object Longitude: " , JSON.stringify(mapResponseObj.features[0].center[0]));
                    console.log("MapBox Response JSON Object Latitude: " , JSON.stringify(mapResponseObj.features[0].center[1]));
                    //sets latitude based on city
                    setLatitude(mapResponseObj.features[0].center[1]);
                    // sets longitude based on city
                    setLongitude(mapResponseObj.features[0].center[0]);
                    setMapSafe(true);
                })  
                // .then(function(data) {
                //     // console.log("weatherballoon:", JSON.stringify(data.current.temp));
                //     console.log()
    
                // })
                .then(
                    // console.log("FART MapBox Response JSON Object Latitude: " , JSON.stringify(mapResponseObj.features[0].center[1]))
                    // console.log("MapBox Response JSON Object Longitude: " , JSON.stringify(mapResponseObj.features[0].center[0]));
                    console.log("in the last THEN")
                    )
                .catch(function() {
                });
                callback();
    
                // //sets latitude based on city
                // setLatitude(mapResponseObj.features[0].center[1]);

                // // sets longitude based on city
                // setLongitude(mapResponseObj.features[0].center[0]);
    
                return; 
            }
        
        // if(!mapSafe)
        // {
            
            // this.setState({airtableKey: e.target.value}, function () {
            //     console.log("airtableAPI", this.state.airtableKey);
            //   })

            setLatitudeLongitude(
                
                function () {
                console.log("in the callback of setlatitudelongitude");
                // if(mapSafe){
                    setLoading(true);
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid=de21f1eaf5bf29f1eb059f7f97f70b23`)
                    .then(response => response.json()
                     )
                    // .then(function(resp) { return resp.json() }) // Convert data to json
                    .then(response => {  
                        setResponseObj(response);
                        setLoading(false);
                        setSafe(true);
                        console.log("Open Weather Response Object:" , JSON.stringify(responseObj));
                    })  
                    .catch(function() {
                        });
                    // }
                    // else{
                    //     console.log("MapBox didn't return a response for me when I ran this if/esle.")
                    // }
                }
            );

            // if(mapSafe){
            //     setLoading(true);
            //     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid=de21f1eaf5bf29f1eb059f7f97f70b23`)
            //     .then(response => response.json()
            //      )
            //     // .then(function(resp) { return resp.json() }) // Convert data to json
            //     .then(response => {  
            //         setResponseObj(response);
            //         setLoading(false);
            //         setSafe(true);
            //         console.log("Open Weather Response Object:" , JSON.stringify(responseObj));
            //     })  
            //     .catch(function() {
            //         });
            //     }
            //     else{
            //         console.log("MapBox didn't return a response for me when I ran this if/esle.")
            //     }

        // }

       

        }

    function testFunction(value, callback) {
        // citycity = value;
        setCity(value);
        callback();
        return value;
    }
    

    return (
        <div>
            <h2>Find Current Weather Conditions</h2>
                <form onSubmit={getMultiDay}>
                    <input
                        type="text"
                        placeholder="Enter City"
                        maxLength="50"
                        className={classes.textInput}
                        value={city}

                        // this.setState(
                        //     {mailchimpKey: e.target.value}, 
                        //     function () {console.log("mailchimpAPI", this.state.mailchimpKey);}
                        //     );

                        onChange={e => {
                            testFunction((e.target.value), function () {console.log(city);});
                            // console.log(city);
                            }
                        }

                        // onChange={(e) => {
                        //     setCity((e.target.value), function () {console.log(city);});
                        //     // console.log(city);
                        //     }
                        // }

                        />
                        <br></br>

                    <button className={classes.Button} type="submit">Get Forecast</button>

                </form>

            <Conditions
            responseObj={responseObj}
            error={error} //new
            loading={loading} //new
            safe={safe}
            />

        </div>
    )
}

export default Multiday;