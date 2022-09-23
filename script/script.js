'use strict'

// localStorage.clear();

// region qo'shish
function regionOption(){
    provencie.forEach((item)=>{
        const option=createElements('option','choose',item);
        $('.option').appendChild(option);
    })
}
regionOption()

// region ochib yopish
$('.regionChoose').addEventListener('click',(e)=>{
    $('.option').style.display="block"
})
$('.option').addEventListener("mouseup",()=>{
    $('.option').style.display="none"
})

// sana chiqarish
function todayDate(result){
    let timeDate=new Date;
    let weekday=timeDate.getDay();
    let weekdayarr=['Dushanba','Seshanba','Chorshanba','Payshanba','Juma','Shanba','Yakshanba']
    let month=timeDate.getMonth();
    let montharr=["yanvar",'fevral','mart','aprel','may','iyun','iyul','avgust',"sentabr",'oktabr','noyabr','dekabr'];
    let time=`${(timeDate.getHours()%100>10)?timeDate.getHours():'0'+timeDate.getHours()}:${(timeDate.getMinutes()%100>10)?timeDate.getMinutes():'0'+timeDate.getMinutes()}:${(timeDate.getSeconds())}`;
    $('#date').innerHTML=`
    <i class="fa-solid fa-calendar-days text-light"></i>
    ${weekdayarr[weekday-1]} ${timeDate.getDate()}-${montharr[month]} ${timeDate.getFullYear()}-yil 
    <span class="text-light" id="times">${time}</span>`;
}
todayDate();


// soat o'zgarishi
setInterval(()=>{
    let timeDate=(new Date);
    let time=`${(timeDate.getHours()%100>10)?timeDate.getHours():'0'+timeDate.getHours()}:${(timeDate.getMinutes()%100>10)?timeDate.getMinutes():'0'+timeDate.getMinutes()}:${(timeDate.getSeconds())}`;
    $("#times").innerHTML="";
    $("#times").innerHTML=`${time}`;
},1000)

// region tanlanganida data olish
async function getData(def="Toshkent"){
    let obj=JSON.parse(localStorage.getItem('daydata'));
    if(!obj){
        const daydata=await fetch(`https://islomapi.uz/api/present/day?region=${def}`);
        const dayresult=await daydata.json();
        obj=dayresult;
    }

    $a('#time').forEach((item)=>item.textContent="")
    $a('#time')[0].textContent=`${obj.times.tong_saharlik}`;
    $a('#time')[1].textContent=`${obj.times.quyosh}`;
    $a('#time')[2].textContent=`${obj.times.peshin}`;
    $a('#time')[3].textContent=`${obj.times.asr}`;
    $a('#time')[4].textContent=`${obj.times.shom_iftor}`;
    $a('#time')[5].textContent=`${obj.times.hufton}`;
    $('#regionspan').innerHTML=`${obj.region}`;
}
getData();

// region tanlanish
$('.option').addEventListener('click',(e)=>{
    if(e.target.classList.contains('choose')){
        localStorage.setItem("region",JSON.stringify(e.target.value)); 
        selectWrite(e.target);
        let dataValue="";
        switch(e.target.value){
            case "Andijon":{
                dataValue=e.target.value;
            };break;
            case "Buxoro":{
                dataValue=e.target.value;
            };break;
            case "Farg'ona":{
                dataValue="Qo'qon";
            };break;
            case "Jizzax":{
                dataValue=e.target.value;
            };break;
            case "Namangan":{
                dataValue=e.target.value;
            };break;
            case "Navoiy":{
                dataValue=e.target.value;
            };break;
            case "Qashqadaryo":{
                dataValue="Qarshi";
            };break;
            case "Samarqand":{
                dataValue=e.target.value;
            };break;
            case "Sirdaryo":{
                dataValue="Guliston";
        
            };break;
            case "Surxondaryo":{
                dataValue="Termiz";
            };break;
            case "Xorazm":{
                dataValue="Urganch";
            };break;
            case "Toshkent":{
                dataValue=e.target.value;
            };
        }
        sendLS(dataValue);
    }  
})

// sendlocalStorage
async function sendLS(region){
    const daydata=await fetch(`https://islomapi.uz/api/present/day?region=${region}`);
    const dayresult=await daydata.json();
    localStorage.setItem("daydata",JSON.stringify(dayresult)); 

    const monthdata=await fetch(`https://islomapi.uz/api/monthly?region=${region}&month=${new Date().getMonth()+1}`);
    const monthresult=await monthdata.json();
    localStorage.setItem("monthdata",JSON.stringify(monthresult));
    getData();  
    monthtable();
}

// selectga yozish
function selectWrite(element){
    $a('.choose').forEach(item=>{
        (item.classList.contains('choose_active'))?item.classList.remove('choose_active'):0;
    });
    element.classList.add('choose_active');

    const region=JSON.parse(localStorage.getItem('region'));
    $('.pi').innerHTML="";
    $('.pi').innerHTML=region;
}


// light and dark
    $(".light").addEventListener("click",(e)=>{
        if($("body").classList.contains("dark_mode")){
            $("body").classList.remove("dark_mode");
            $(".light").innerHTML=`<img src="/images/images/moon-stars-fill-custom.svg" alt="sun" class="lightwidth" id="moon">`;
            $a(".card").forEach((card)=>{
                card.classList.remove("dark_card");
            })
            $("#head").classList.add("bgcolor");
            $("#head").classList.remove("line");
            $("#chooseWrapper").classList.add("bgcolor");
            $a("tr").forEach((item)=>{
                if(item.classList.contains("darkblack")){
                    item.classList.remove("darkblack");
                    item.classList.add("lightgreen");
                }
                else{
                    item.classList.remove("darkwhite");
                    item.classList.add("light2green");
                }
            })
        }else{
            $("body").classList.add("dark_mode");
            $(".light").innerHTML=`<img src="/images/images/sun-fill-custom.svg" alt="moon" class="lightwidth" id="sun">`;
            $a(".card").forEach((card)=>{
                card.classList.add("dark_card");
            })
            $("#head").classList.remove("bgcolor");
            $("#head").classList.add("line");
            $("#chooseWrapper").classList.remove("bgcolor");
            $a("tr").forEach((item)=>{
                if(item.classList.contains("lightgreen")){
                    item.classList.remove("lightgreen");
                    item.classList.add("darkblack");
                }
                else{
                    item.classList.remove("light2green");
                    item.classList.add("darkwhite");
                }
            })
        }
    })

// // haftalar bo'yicha table yaratish
// function weektable(){
//     const obj=JSON.parse(localStorage.getItem('weekdata'));
//     $("#tbody").innerHTML="";
//     obj.forEach((item,i)=>{
//         let tr=createElements("tr","",`<td>${item.region}</td> <td>${item.date.substring(0,10)}</td> <td>${item.weekday}</td> <td>${item.times.tong_saharlik}</td> <td>${item.times.quyosh}</td> <td>${item.times.peshin}</td> <td>${item.times.asr}</td> <td>${item.times.shom_iftor}</td> <td>${item.times.hufton}</td>`);
//         $("#tbody").appendChild(tr);
//     })
// }

// oylar bo'yicha table yaratish
async function monthtable(def='Toshkent'){
    let obj=JSON.parse(localStorage.getItem('monthdata'));
    if(!obj){
        console.log(obj);
        const monthdata=await fetch(`https://islomapi.uz/api/monthly?region=${def}&month=${new Date().getMonth()+1}`);
        const monthresult=await monthdata.json();
        obj=monthresult;
    }
    $("#tbody").innerHTML="";
    let s=0;
    obj.forEach((item,i)=>{
        // haftalarni ajratish
        if(item.weekday=='Yakshanba' && s==0){
            s=1;
        }else if(item.weekday=='Yakshanba' && s==1){
            s=0;
        }

        // kun yoki tun bo'yicha element yaratish
        if($('#moon')){
            if(s==1){
                let tr=createElements("tr","lightgreen",`<td>${item.region}</td> <td>${item.date.substring(0,10)}</td> <td>${item.weekday}</td> <td>${item.times.tong_saharlik}</td> <td>${item.times.quyosh}</td> <td>${item.times.peshin}</td> <td>${item.times.asr}</td> <td>${item.times.shom_iftor}</td> <td>${item.times.hufton}</td>`);
                $("#tbody").appendChild(tr);
            }else{
                let tr=createElements("tr","light2green",`<td>${item.region}</td> <td>${item.date.substring(0,10)}</td> <td>${item.weekday}</td> <td>${item.times.tong_saharlik}</td> <td>${item.times.quyosh}</td> <td>${item.times.peshin}</td> <td>${item.times.asr}</td> <td>${item.times.shom_iftor}</td> <td>${item.times.hufton}</td>`);
                $("#tbody").appendChild(tr);
            }
        }else if($('#sun')){
            if(s==1){
                let tr=createElements("tr","darkblack",`<td>${item.region}</td> <td>${item.date.substring(0,10)}</td> <td>${item.weekday}</td> <td>${item.times.tong_saharlik}</td> <td>${item.times.quyosh}</td> <td>${item.times.peshin}</td> <td>${item.times.asr}</td> <td>${item.times.shom_iftor}</td> <td>${item.times.hufton}</td>`);
                $("#tbody").appendChild(tr);
            }else{
                let tr=createElements("tr","darkwhite",`<td>${item.region}</td> <td>${item.date.substring(0,10)}</td> <td>${item.weekday}</td> <td>${item.times.tong_saharlik}</td> <td>${item.times.quyosh}</td> <td>${item.times.peshin}</td> <td>${item.times.asr}</td> <td>${item.times.shom_iftor}</td> <td>${item.times.hufton}</td>`);
                $("#tbody").appendChild(tr);
            }
        }  
    })
}
monthtable();