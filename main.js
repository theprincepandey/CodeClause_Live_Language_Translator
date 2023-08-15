let LangOption = document.querySelectorAll("select");
let fromText = document.querySelector(".fromtext");
let transText =document.querySelector(".toTranslate");
let fromVoice =document.querySelector(".from");
let toVoice =document.querySelector(".to");
let cpyBtn = document.querySelector(".fa-copy");
let countValue =document.querySelector(".code_length");
let exChangeLang =document.querySelector(".transfer");


// LANGUAGES OPTIONS
LangOption.forEach((get,con)=>{
    for(let countryCode in language){
        let selected;
        if(con == 0 && countryCode == "en-GB"){
            selected="selected";
        }else if(con == 1 && countryCode == "hi-IN"){
            selected="selected";
        }
        let option = `<option value="${countryCode}" ${selected}>${language[countryCode]} </option>`;
        get.insertAdjacentHTML('beforeend',option);
    }
}); 
// API
fromText.addEventListener('input',function()
{
    let content = fromText.value;
    fromContent = LangOption[0].value;
    transContent = LangOption[1].value;
    let transLink =`https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;
    fetch(transLink).then(translate => translate.json()).then(data => {
        transText.value = data.responseData.translatedText;
    })
});

// VOICES
fromVoice.addEventListener('click',function(){
    let fromTalk;
    fromTalk =new SpeechSynthesisUtterance(fromText.value);
    fromTalk.lang = LangOption[0].value;
    speechSynthesis.speak(fromTalk);
});
toVoice.addEventListener('click',function(){
    let fromTalk;
    fromTalk =new SpeechSynthesisUtterance(transText.value);
    fromTalk.lang = LangOption[1].value;
    speechSynthesis.speak(fromTalk);
});

// COPYBUTTON
cpyBtn.addEventListener('click',function(){
    navigator.clipboard.writeText(transText.value);
});
// KEYUP
fromText.addEventListener('keyup',function(){
    countValue.innerHTML=`${fromText.value.length}/5000`;
});
// TRANSFER
exChangeLang.addEventListener('click',function(){
    let tempText =fromText.value;
    
    fromText.value = transText.value;
    transText.value = tempText;
    let tempLang = LangOption[0].value;
    LangOption[0].value = LangOption[1].value;
    LangOption[1].value = tempLang;
});