(()=>{const e=document.querySelector("#cityName");function t(e,t,i,a,n,c){this.place=e,this.temp=t,this.feels_like=i,this.desc=a,this.humid=n,this.max=c}document.querySelector("#submitButton").addEventListener("click",(()=>{!async function(e){const i=await fetch("https://api.openweathermap.org/data/2.5/weather?q="+e+"&APPID=907b2eb9ee227c9d429014c360e20b7d",{mode:"cors"}),a=await i.json(),n=new t(a.name,a.main.temp,a.main.feels_like,a.weather[0].description,a.main.humidity,a.main.temp_max);console.log(n)}(e.value)}))})();