const rituSelectorBtn = document.querySelector('#ritu-selector');
const tealSelectorBtn = document.querySelector('#teal-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
    <div class="message ${message.sender === 'Ritu' ? 'teal-bg' : 'gray-bg'}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    </div>
`
window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message);
    })
}

let messageSender = 'Ritu'

const updateMessageSender = (name) => {
    messageSender = name;
    chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `Type here, ${messageSender}`

    if(name === 'Ritu'){
        rituSelectorBtn.classList.add('active-person');
        tealSelectorBtn.classList.remove('active-person');
    }
    else if(name === 'Teal'){
        tealSelectorBtn.classList.add('active-person');
        rituSelectorBtn.classList.remove('active-person');
    }else{
        rituSelectorBtn.classList.add('active-person');
        tealSelectorBtn.classList.remove('active-person');
    }

    chatInput.focus();

}

rituSelectorBtn.onclick = () => updateMessageSender('Ritu');
tealSelectorBtn.onclick = () => updateMessageSender('Teal');

const sendMessage = (e) => {
    e.preventDefault();

    const timestamp = new Date().toLocaleDateString('en-US', {hour: '2-digit', minute: '2-digit'})
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    }

    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(messages))
    chatMessages.innerHTML += createChatMessageElement(message)

    chatInputForm.reset();
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    chatMessages.innerHTML = '';
})



