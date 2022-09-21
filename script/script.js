'use strict'

async function getData(reg='Toshkent'){
    const data=await fetch(`https://islomapi.uz/api/present/day?region=${reg}`);
    const result=await data.json();
    $('#regionspan').textContent=`${reg}`;
    $a('#time')[0].textContent=`${result.times.tong_saharlik}`;
    $a('#time')[1].textContent=`${result.times.quyosh}`;
    $a('#time')[2].textContent=`${result.times.peshin}`;
    $a('#time')[3].textContent=`${result.times.asr}`;
    $a('#time')[4].textContent=`${result.times.shom_iftor}`;
    $a('#time')[5].textContent=`${result.times.hufton}`;
    todayDate(result);
}
getData();

function todayDate(result){
    let timeDate=new Date;
    const str=result.date;
    let month=str.slice(5,7);
    switch(month){
        case "01":month="yanvar";break;
        case "02":month='fevral';break;
        case "03":month='mart';break;
        case "04":month='aprel';break;
        case "05":month='may';break;
        case "06":month='iyun';break;
        case "07":month='iyul';break;
        case "08":month='avgust';break;
        case "09":{month="sentabr"};break;
        case "10":month='oktabr';break;
        case "11":month='noyabr';break;
        case "12":month='dekabr';break;
    }
    let time=`${(timeDate.getHours()%100>10)?timeDate.getHours():'0'+timeDate.getHours()}:${(timeDate.getMinutes()%100>10)?timeDate.getMinutes():'0'+timeDate.getMinutes()}:${(timeDate.getSeconds())}`;
    $('#date').innerHTML=`
    <i class="fa-solid fa-calendar-days text-light"></i>
    ${result.weekday} ${str.slice(8,10)}-${month} ${str.slice(0,4)}-yil 
    <span class="text-light" id="time">${time}</span>`;
}

    setInterval(()=>{
        let timeDate=(new Date);
        let time=`${(timeDate.getHours()%100>10)?timeDate.getHours():'0'+timeDate.getHours()}:${(timeDate.getMinutes()%100>10)?timeDate.getMinutes():'0'+timeDate.getMinutes()}:${(timeDate.getSeconds())}`;
        $("#time").textContent="";
        $("#time").textContent=`${time}`;
    },1000)

function regionOption(){
    provencie.sort();
    provencie.forEach((item)=>{
        const option=createElements('option','choose',item);
        $('.option').appendChild(option);
    })
}
regionOption()


$('.option').addEventListener('click',(e)=>{
    if(e.target.classList.contains('choose')){
        $a('.choose').forEach(item=>{
            (item.classList.contains('choose_active'))?item.classList.remove('choose_active'):0;
        })
        e.target.classList.add('choose_active')
        switch(e.target.value){
            case "Andijon":{
                getData(e.target.value);
            };break;
            case "Buxoro":{
                getData(e.target.value);
            };break;
            case "Farg'ona":{
                getData("Qo'qon");
            };break;
            case "Jizzax":{
                getData(e.target.value);
            };break;
            case "Namangan":{
                getData(e.target.value);
            };break;
            case "Navoiy":{
                getData(e.target.value);
            };break;
            case "Qashqadaryo":{
                getData("Qarshi");
            };break;
            case "Samarqand":{
                getData(e.target.value);
            };break;
            case "Sirdaryo":{
                getData("Guliston");
        
            };break;
            case "Surxondaryo":{
                getData("Termiz");
            };break;
            case "Xorazm":{
                getData("Xiva");
                
            };break;
            case "Toshkent":{
                getData(e.target.value);
            };break;
        }
        $('.pi').innerHTML="";
        $('.pi').innerHTML=e.target.value;
    }
    
})

$('.regionChoose').addEventListener('click',(e)=>{
    $('.option').style.display="block"
})
$('.option').addEventListener("mouseup",()=>{
    $('.option').style.display="none"
})
$('.option').addEventListener("blur",()=>{
    $('.option').style.display="none"
})


