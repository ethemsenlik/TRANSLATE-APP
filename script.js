const fromLang = document.querySelector("#from-lang");
const toLang = document.querySelector("#to-lang");
const btnTranslate = document.querySelector("#btnTranslate");
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const exchange = document.querySelector(".middle");
// const fromCopy = document.querySelector(".from-copy");
// const toCopy = document.querySelector(".to-copy");
// const fromVoice = document.querySelector(".from-voice");
// const toVoice = document.querySelector(".to-voice");
const icons = document.querySelectorAll(".icons")

for(let lang in languages) {
    let option = `<option value="${lang}">${languages[lang]}</option>`;

    fromLang.insertAdjacentHTML("beforeend", option);
    toLang.insertAdjacentHTML("beforeend", option);

    fromLang.value = "tr-TR";
    toLang.value = "en-GB";
}



btnTranslate.addEventListener("click", function(){
    let text = fromText.value;
    let from = fromLang.value;
    let to = toLang.value;

    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
        })
})

exchange.addEventListener("click", function(e) {

    let data = fromLang.value
    fromLang.value = toLang.value
    toLang.value = data
    
    let text =fromText.value
    fromText.value = toText.value
    toText.value = text
});


for(let icon of icons) {
    icon.addEventListener("click", function(element) {
        if(element.target.classList.contains("fa-copy")) {
            if(element.target.id == "from") {
                navigator.clipboard.writeText(fromText.value)
            }else {
                navigator.clipboard.writeText(toText.value)
            }
        }else {
            let utterance;
            if(element.target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = fromLang.value;
            }else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = toLang.value;
            }
            speechSynthesis.speak(utterance)
        }
    })
}
