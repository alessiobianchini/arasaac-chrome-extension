// var res = translateSentence("house")
window.console.info("CS " + Date.now());
console.info("CS " + Date.now());
window.setInterval(
    async () => {
        // var res = await translateSentence("house")
        console.info("CS " + Date.now());
    },
    3000
)

function translateSentence(word: string) {
    return sendMessagePromise({
        type: 'translate',
        word: word
    });
}

function sendMessagePromise(item: any) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage((<any>tabs[0]).id, { greeting: "hello" }, function (response) {
                console.log(response);
                resolve(response);
            });
        });
    });
}