import React,{useState, useEffect} from "react";
import {Input,Button,Row,Col } from "reactstrap";
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Weather.css';
  

function Weather(){
    const [ weatherData, setWeatherData ] = useState({});
    const [ cityName, setCityName ] = useState("delhi");
    const date = new Date();

    const apiKey = "9062f34f404c7205cfd784137f7ee85d";
    const notify = () => toast.warning("Please search for a valid city 😩",{hideProgressBar: true});
    
    useEffect(()=>{
        findData();
    },[]);

    async function callApi(){
       await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`).then(response =>{
        setWeatherData(response.data);
        //console.log(response.data);
       }).catch(err =>{
           notify();
           console.log(err);
       })
    }

    function changeCityName(e){
        setCityName(e.target.value);
    }

    function findData(){
        callApi();
    }

    const details = !(Object.keys(weatherData).length === 0 && weatherData.constructor === Object) &&<div>
        <h3>{weatherData.name}, {weatherData.sys.country}</h3>
        <h6>{(date.getDate()+ "-" + (date.getMonth()+1)+ "-" +date.getFullYear())}</h6>  
        <div>
            <img 
                src = {`https://openweathermap.org/img/wn/${weatherData.weather[0]["icon"]}@2x.png`} 
                alt={weatherData.weather[0].main}
                style={{minWidth:"10rem"}} 
            />
            <h5> {weatherData.weather[0].main}</h5>
        </div>  
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <div>
                <h1 style={{fontSize:"3vw"}}>{weatherData.main.temp} <sup>o</sup>C</h1>
            </div>
            <div style={{fontSize:"2vw"}}>
                <p>
                    <strong> Low - High  
                        <br/> 
                        {weatherData.main.temp_min} <sup>o</sup>C - {weatherData.main.temp_max} <sup>&deg;</sup>C
                        <br />
                        Humidity : {weatherData.main.humidity}<br />
                        Pressure : {weatherData.main.pressure} mb
                    </strong>
                </p>
            </div>
        </div>
    </div>

    return (
        <div className="Weather">
            <Row>
                <Col>
                    <Input type="text" placeholder="Search city or state" onChange={(e)=>changeCityName(e)} ></Input>
                    <br />
                    <Button outline block type="submit" color="primary" onClick={()=>findData()}>Search</Button>
                </Col>
            </Row>
            <br />
            {details}
            <ToastContainer />
        </div>
    )
}


export default Weather;