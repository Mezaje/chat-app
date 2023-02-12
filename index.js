const firebaseConfig = {
  apiKey: "AIzaSyA3XoWk8IKP9-7NCMHW1CfKv39p4a2vmIQ",
  authDomain: "kanoonchat-cef01.firebaseapp.com",
  databaseURL: "https://kanoonchat-cef01-default-rtdb.firebaseio.com",
  projectId: "kanoonchat-cef01",
  storageBucket: "kanoonchat-cef01.appspot.com",
  messagingSenderId: "158759307906",
  appId: "1:158759307906:web:6efbadd7e3b4324059829b",
  measurementId: "G-NPRQEW5475"
};

// Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.database();
  
  const username = prompt("Please Tell Us Your Name");
  const usernames = document.querySelectorAll('.username')
  usernames.forEach((e)=>{
      e.textContent = username
  })
  const form = document.querySelector('.message-form')
  
  form.addEventListener('submit',(e)=>{
    e.preventDefault()
    sendMessage()
  })
  const usersid = document.querySelectorAll('.messaging-member__name')

  let userid = 'john'

  usersid.forEach((user)=>{
      user.addEventListener('click',()=>{
          usersid.forEach((e)=>{
              e.parentElement.parentElement.classList.remove('messaging-member--active')
          })
          document.getElementById("messages").innerHTML=''
          console.log(user.textContent)
          user.parentElement.parentElement.classList.add('messaging-member--active')
          userid = user.textContent
          fetchit()
      })
  })
  function sendMessage(e) {
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref(`messages/${username}/${userid}/` + timestamp).set({
      username,
      message,
    });
    db.ref(`messages/${userid}/${username}/` + timestamp).set({
      userid,
      message,
    });
  }

  function fetchit(){
      const fetchChat = db.ref(`messages/${username}/${userid}`);
  
      fetchChat.on("child_added", function (snapshot) {
        const messages = snapshot.val();
        console.log(messages)
        const message = `<li class=${
          username === messages.username ? "chat__bubble--you" : "chat__bubble--me"
        }><span>${messages.username}: </span>${messages.message}</li>`;
        // append the message on the page
        document.getElementById("messages").innerHTML += message;
      });
  }