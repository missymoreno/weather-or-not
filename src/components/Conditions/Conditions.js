import React from 'react';
import Humidity from '../Humidity/Humidity';
import classes from './Conditions.module.css'
const conditions = (props) => {
    // let humidity;
    return (
       <div className={classes.Wrapper}>
           {props.error && <small className={classes.Small}>Please enter a valid city.</small>}
           {props.loading && <div className={classes.Loader} />}
           {props.responseObj.cod === 200 ?
               <div>
                    {/* {humidity = props.responseObj.main.humidity} */}
                    <p><strong>{props.responseObj.name}</strong></p>
                    <p>It is currently {Math.round(props.responseObj.main.temp)} degrees out with {props.responseObj.weather[0].description}.</p>
                    <Humidity value={props.responseObj.main.humidity} sillyFart="wow,stinky"/>
               </div>
           : null
           }
       </div>
   )
}
export default conditions;