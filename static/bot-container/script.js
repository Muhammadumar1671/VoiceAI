
    document.addEventListener('DOMContentLoaded', () => {
        stopSpeech();
        displayInitialBotMessage();
        removeInputAndSendButton();
        addTextInputPrompt();
        createBigVoiceButton();
        CreateBigDeleteButton();
        
        function removeElementsByIds(ids) {
            ids.forEach(function(id) {
                const element = document.getElementById(id);
                if (element) {
                    element.remove();
                } else {
                    console.log(`Element with id: ${id} not found`);
                }
            });
        }


        
        function removeInputAndSendButton() {
            removeElementsByIds(['user-input', 'send-button' , 'voice' , 'delete-button' , 'text-input-prompt']);
        }

        function createBigVoiceButton() {
            const chatContainer = document.querySelector('.chat-container');
            const voiceButton = document.createElement('div');
        
            // Set class and ID
            voiceButton.className = 'big-voice-button';
            voiceButton.id = 'big-voice';
        
            // Add microphone icon
            voiceButton.innerHTML = '<i class="fas fa-microphone button-icon"></i>';
        
            // Style the button
            voiceButton.style.cursor = 'pointer';
            voiceButton.style.width = '80px'; // Increase size
            voiceButton.style.height = '80px'; // Increase size
            voiceButton.style.borderRadius = '50%'; // Make it circular
            voiceButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; // Transparent white background
            voiceButton.style.backdropFilter = 'blur(10px)'; // Add blur effect
            voiceButton.style.display = 'flex';
            voiceButton.style.color = 'black'; // White icon color
            voiceButton.style.justifyContent = 'center';
            voiceButton.style.position = 'fixed';
            voiceButton.style.bottom = '120px';
            voiceButton.style.alignItems = 'center';
            voiceButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add subtle shadow
            voiceButton.style.transition = 'transform 0.3s, box-shadow 0.3s'; // Smooth transition for hover effect
        
            // Set the z-index to ensure it's on top
            voiceButton.style.zIndex = '1000';
        
            // Append the button to the chat container
            chatContainer.appendChild(voiceButton);
        
            // Add padding to the bottom of the chat container to make room for the button
            chatContainer.style.paddingBottom = '150px'; // Adjust as necessary

        
            // Hover effect
            voiceButton.addEventListener('mouseover', function() {
                voiceButton.style.transform = 'scale(1.1)'; // Scale up on hover
                voiceButton.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)'; // Increase shadow on hover
            });
        
            voiceButton.addEventListener('mouseout', function() {
                voiceButton.style.transform = 'scale(1)'; // Revert scale on hover out
                voiceButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Revert shadow on hover out
            });
        
            // Add click event listener
            voiceButton.addEventListener('click', function() {
                VoiceInput();
            });
        
            // Append to chat container
            chatContainer.appendChild(voiceButton);
        }

        function CreateBigDeleteButton(){
            const chatContainer = document.querySelector('.chat-container');
            const deleteButton = document.createElement('div');
        
            // Set class and ID
            deleteButton.className = 'big-delete-button';
            deleteButton.id = 'big-delete';
        
            // Add microphone icon
            deleteButton.innerHTML = '<i class="fas fa-trash button-icon"></i>';
        
            // Style the button
            deleteButton.style.cursor = 'pointer';
            deleteButton.style.width = '40px'; // Increase size
            deleteButton.style.height = '40px'; // Increase size
            deleteButton.style.borderRadius = '50%'; // Make it circular
            deleteButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; // Transparent white background
            deleteButton.style.backdropFilter = 'blur(10px)'; // Add blur effect
            deleteButton.style.display = 'flex';
            deleteButton.style.color = 'black'; // White icon color
            deleteButton.style.justifyContent = 'center';
            deleteButton.style.position = 'fixed';
            deleteButton.style.bottom = '30px';
            deleteButton.style.alignItems = 'center';
            deleteButton.style.right = '30px';
   
            deleteButton.style.bottom = '120px';
            deleteButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add subtle shadow
            deleteButton.style.transition = 'transform 0.3s, box-shadow 0.3s'; // Smooth transition for hover effect
        
            // Set the z-index to ensure it's on top
            deleteButton.style.zIndex = '1000';
        
            // Append the button to the chat container
            chatContainer.appendChild(deleteButton);
        
            // Add padding to the bottom of the chat container to make room for the button

        
            // Hover effect
            deleteButton.addEventListener('mouseover', function() {
                deleteButton.style.transform = 'scale(1.1)'; // Scale up on hover
                deleteButton.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)'; // Increase shadow on hover
            });
        
            deleteButton.addEventListener('mouseout', function() {
                deleteButton.style.transform = 'scale(1)'; // Revert scale on hover out
              
        });
        deleteButton.addEventListener('click', function() {
            deleteAllChats();
        });
    }
        
        
        function addTextInputPrompt() {
            const inputContainer = document.querySelector('.input-container');
            inputContainer.style.justifyContent = 'center';
            
            if (inputContainer) {
                const promptText = document.createElement('div');
                promptText.id = 'text-input-prompt';
               
                promptText.style.fontSize = '0.9em';
                promptText.style.color = '#888';
                promptText.style.cursor = 'pointer';
                promptText.style.textAlign = 'center';
                promptText.innerText = "Click to use text input.";
                promptText.addEventListener('click', function() {
                    const bigVoiceButton = document.getElementById('big-voice');
                    const bigDeleteButton = document.getElementById('big-delete');
                    bigVoiceButton.remove();
                    bigDeleteButton.remove();
                    restoreInputAndSendButton();
                    //remove the padding
                    const chatContainer = document.querySelector('.chat-container');
                    chatContainer.style.paddingBottom = '0px';
                    promptText.remove();

                });
        
                inputContainer.appendChild(promptText);
            }
        }
        
        function restoreInputAndSendButton() {
            const inputContainer = document.querySelector('.input-container');
            removeElementsByIds(['voice'])
        
            if (inputContainer) {
                // Create and append the input field
                const input = document.createElement('input');
                input.type = 'text';
                input.id = 'user-input';
                input.placeholder = 'Type a message...';
                inputContainer.appendChild(input);

                // Create and append the voice input button
                const voiceButton = document.createElement('button');
                voiceButton.className = 'voice-button';
                voiceButton.id = 'voice';
                voiceButton.innerHTML = '<i class="fas fa-microphone button-icon"></i>';
                voiceButton.addEventListener('click', function() {
                    VoiceInput();
                });
                inputContainer.appendChild(voiceButton);

                // Create and append the send button
                const sendButton = document.createElement('button');
                sendButton.className = 'send-button';
                sendButton.id = 'send-button';
                sendButton.innerHTML = '<i class="fas fa-paper-plane button-icon"></i>';
                sendButton.addEventListener('click', function() {
                    sendMessage();
                });
                inputContainer.appendChild(sendButton);
                // Create and append the delete button
                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-button';
                deleteButton.id = 'delete-button';
                deleteButton.innerHTML = '<i class="fas fa-trash button-icon"></i>';
                deleteButton.addEventListener('click', function() {
                    deleteAllChats();
                });
                inputContainer.appendChild(deleteButton);
            }
        }
        
        
      let  latestBotResponse = '';
        function displayInitialBotMessage() {
            addBotMessage("Hi, I'm your virtual tutor for today. Please specify your Subject, topic, and your query for help.");
        }

        function setMessage(message) {
            latestBotResponse = message;
        }
        function getMessage() {
            return latestBotResponse;
        }

        window.sendMessage = function() {
            const message = getMessageInputValue();
            if (message) {
                processUserMessage(message);
            }
        };

        function getMessageInputValue() {
            const messageInput = document.getElementById('user-input');
            const message = messageInput.value.trim();
            messageInput.value = "";
            return message;
        }

        function processUserMessage(message) {
            addUserMessage(message);
            showLoadingIndicator();
            sendEducationalCheckRequest(message);
        }

        function sendEducationalCheckRequest(message) {
            fetch('/igcse/is-educational/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({ question: message })
            })
            .then(response => response.json())
            .then(data => handleEducationalCheckResponse(data, message))
            .catch(handleError);
        }

        function handleEducationalCheckResponse(data, message) {
            hideLoadingIndicator();
            const botResponse = data.response || "I'm sorry, I couldn't process your request.";
            if (botResponse === true) {
                displayActionButtons(message);
            } else {
                addBotMessage(botResponse);
            }
        }

        function handleError(error) {
            hideLoadingIndicator();
            addBotMessage("There was an error processing your request. Please try again.");
            console.error('Error:', error);
        }

        function addBotMessage(message) {
const chatContainer = document.querySelector('.chat-container');
const messageElement = document.createElement('div');
messageElement.className = 'message bot-message';
messageElement.innerText = message;

const ttsButton = document.createElement('button');
ttsButton.className = 'tts-button';
const icon = document.createElement('i');
icon.className = 'fas fa-volume-up';
ttsButton.appendChild(icon);

ttsButton.onclick = function() {
    if (icon.classList.contains('fa-volume-up')) {
        speakMessage(message);
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    } else {
        stopSpeech();
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
    }
};

// Append TTS button to the message element
messageElement.appendChild(ttsButton);
chatContainer.appendChild(messageElement);
scrollChatToBottom(chatContainer);
}


        function addUserMessage(message) {
            const chatContainer = document.querySelector('.chat-container');
            const messageElement = document.createElement('div');
            messageElement.className = 'message user-message';
            messageElement.innerText = message;
            chatContainer.appendChild(messageElement);
            scrollChatToBottom(chatContainer);
        }

        function showLoadingIndicator() {
            const chatContainer = document.querySelector('.chat-container');
            const loadingElement = document.createElement('div');
            loadingElement.className = 'message bot-message loading-message';
            loadingElement.id = 'loading-indicator';
            loadingElement.innerText = 'Loading...';
            chatContainer.appendChild(loadingElement);
            scrollChatToBottom(chatContainer);
        }

        function hideLoadingIndicator() {
            const loadingElement = document.getElementById('loading-indicator');
            if (loadingElement) {
                loadingElement.remove();
            }
        }

        function scrollChatToBottom(container) {
            container.scrollTop = container.scrollHeight;
        }

        window.deleteAllChats = function() {
            const chatContainer = document.querySelector('.chat-container');
            while (chatContainer.children.length > 2) {
                chatContainer.removeChild(chatContainer.lastChild);
                setMessage('');
                stopSpeech();
            }
            addBotMessage("Hi, I'm your virtual tutor for today. Please specify your Subject, topic, and your query for help.")
            //remove all buttons
            removeInputAndSendButton();
            addTextInputPrompt();
            createBigVoiceButton();
            CreateBigDeleteButton();
        };

function displayActionButtons(message) {
disableInputElements();
const buttonContainer = createButtonContainer(className = 'button-container');

if (getMessage().includes("explanation") || getMessage().includes("explain")) {
    ExplainMessage = "Do you want further clarifications?";
}
else {
    ExplainMessage = "Do you want me to explain the concept";
}

const explainButton = createButton(ExplainMessage, () => {
    reEnableInputElements();
    addUserMessage("Yes, Please explain the concept!");
    requestExplanation(message);
    buttonContainer.remove();
});

const solveButton = createButton("Do you want me to solve a question for you?", () => {
    disableInputElements();
    buttonContainer.remove();
    addAttachmentIcon(message);
});

// Check if the bot's latest response is related to an explanation
if (getMessage().includes("explanation") || getMessage().includes("explain")) {
    const recommendButton = createButton("Do you want me to recommend videos?", () => {
        reEnableInputElements();
        addUserMessage("Yes, Please recommend some videos!");
        const latestMessage = getMessage();
        requestRecommendation(latestMessage);
        buttonContainer.remove();
    });
    appendButtonsToContainer(buttonContainer, [explainButton, solveButton, recommendButton]);
} else {
    appendButtonsToContainer(buttonContainer, [explainButton, solveButton]);
}

appendButtonContainerToChat(buttonContainer);
}


        function addAttachmentIcon(previousMessage) {
            const chatContainer = document.querySelector('.chat-container');
            const attachmentLabel = document.createElement('label');
            attachmentLabel.className = 'attachment-label';
            attachmentLabel.innerHTML = '<input type="file" accept="image/png" style="display:none;">📎 Attach PNG';
            chatContainer.appendChild(attachmentLabel);
            scrollChatToBottom(chatContainer);  

            attachmentLabel.querySelector('input').addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file && file.type === 'image/png') {
                    addUserMessage(file.name);
                    uploadImage(file, previousMessage);
                } else {
                    addBotMessage("Please upload a valid PNG image.");
                }
            });
        }

        function uploadImage(file, previousMessage) {
            const attachmentLabel = document.querySelector('.attachment-label');
            attachmentLabel.remove();
            const formData = new FormData();
            formData.append('image', file);
            formData.append('question', previousMessage);

            showLoadingIndicator();
            fetch('/igcse/image-analysis/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                hideLoadingIndicator();
                const botResponse = data.response || "I'm sorry, I couldn't process your request.";
                addBotMessage(botResponse);
                displayActionButtons(previousMessage);
                addBotMessage("Hint: Press the delete button to start again.");
            })
            .catch(handleError);
        }

        function requestExplanation(previousMessage) {
            showLoadingIndicator();
            fetch('/igcse/igcse-response/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({ question: previousMessage })
            })
            .then(response => response.json())
            .then(data => {
                hideLoadingIndicator();
                const botResponse = data.response || "I'm sorry, I couldn't process your request.";
                addBotMessage(botResponse);
                setMessage(botResponse);
                displayActionButtons(previousMessage);
                addBotMessage("Hint: Press the delete button to start again.");
                
            })
            .catch(handleError);
        }
        function requestRecommendation(latestBotResponse) {
showLoadingIndicator();
fetch('/igcse/recommend-videos/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify({ question: latestBotResponse })
})
.then(response => response.json())
.then(data => {
    hideLoadingIndicator();
    if (data.links && data.links.length > 0) {
        // Concatenate all the links into a single string with a one-line gap between each link
        const linksMessage = data.links.join('\n\n');
        addBotMessage("Here are some recommended videos:\n\n" + linksMessage);
    } else {
        // If no links are found, display the fallback bot response
        const botResponse = data.response || "I'm sorry, I couldn't find any relevant videos.";
        addBotMessage(botResponse);
        speakMessage(botResponse);
    }
    displayActionButtons(latestBotResponse);
    addBotMessage("Hint: Press the delete button to start again.");
})
.catch(handleError);
}
function disableInputElements() {
    const voiceButton = document.getElementById('voice');
    const sendButton = document.getElementById('send-button');
    const bigVoiceButton = document.getElementById('big-voice');
    const textInputPrompt = document.getElementById('text-input-prompt');

    if (voiceButton) {
        voiceButton.disabled = true;
    }
    if (sendButton) {
        sendButton.disabled = true;
    }

    if (bigVoiceButton) {
        bigVoiceButton.style.pointerEvents = 'none';
    } 
    if (textInputPrompt) {
        textInputPrompt.style.pointerEvents = 'none';
    } 
}

function reEnableInputElements() {
    const voiceButton = document.getElementById('voice');
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const bigVoiceButton = document.getElementById('big-voice');
    const textInputPrompt = document.getElementById('text-input-prompt');

    if (voiceButton) {
        voiceButton.disabled = false;
    }

    if (sendButton) {
        sendButton.disabled = false;
    } 

    if (userInput) {
        userInput.disabled = false;
    } 

    if (bigVoiceButton) {
        bigVoiceButton.style.pointerEvents = 'auto';
      
    } 
    if (textInputPrompt) {
        textInputPrompt.style.pointerEvents = 'auto';
    } 
    
}

        function createButtonContainer() {
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
            return buttonContainer;
        }

        function createButton(text, onClickHandler) {
            const button = document.createElement('button');
            button.className = 'chat-button1';
            button.innerText = text;
            button.onclick = onClickHandler;
            return button;
        }

        function appendButtonsToContainer(container, buttons) {
            buttons.forEach(button => container.appendChild(button));
        }

        function appendButtonContainerToChat(container) {
            const chatContainer = document.querySelector('.chat-container');
            chatContainer.appendChild(container);
            scrollChatToBottom(chatContainer);
        }

        window.VoiceInput = function() {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
        
            recognition.start();
        
            recognition.onresult = function(event) {
                const voiceMessage = event.results[0][0].transcript;
                               
                // Otherwise, process the message directly
                    processUserMessage(voiceMessage);
                
            };
        
            recognition.onerror = function(event) {
                alert('Voice input error: ' + event.error);
            };
        };
        
        function getCookie(name) {
            const cookies = document.cookie ? document.cookie.split(';') : [];
            for (const cookie of cookies) {
                const trimmedCookie = cookie.trim();
                if (trimmedCookie.startsWith(name + '=')) {
                    return decodeURIComponent(trimmedCookie.substring(name.length + 1));
                }
            }
            return null;
        }
    });
    function speakMessage(message) {
        const messageText = message;
        const synth = window.speechSynthesis;
        let voices = [];
    
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(messageText);
    
            // Set a more soothing voice, pitch, and rate
            utterance.lang = 'en-UK';
            utterance.pitch = 1.3; // Slightly higher pitch for a more pleasant sound
            utterance.rate = 0.8;  // Slower rate for a calmer tone
    
            // Ensure voices are loaded
            voices = window.speechSynthesis.getVoices();
            setSoothingVoice(utterance, voices);
            window.speechSynthesis.speak(utterance);
    
            // Add an event listener to reset the TTS button when the speech ends
            utterance.onend = function() {
                const ttsButtons = document.querySelectorAll('.tts-button i');
                ttsButtons.forEach(icon => {
                    icon.classList.remove('fa-volume-mute');
                    icon.classList.add('fa-volume-up');
                });
            };
        } else {
            alert('Sorry, your browser does not support Text-to-Speech.');
        }
    }

function setSoothingVoice(utterance, voices) {
// Attempt to find a more soothing voice if available
const soothingVoice = voices.find(voice => voice.name.includes('Microsoft Zira'));
if (soothingVoice) {
    utterance.voice = soothingVoice;
}
}

function stopSpeech() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();

        const ttsButtons = document.querySelectorAll('.tts-button i');
        ttsButtons.forEach(icon => {
            icon.classList.remove('fa-volume-mute');
            icon.classList.add('fa-volume-up');
        });
    }
}

