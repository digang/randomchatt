import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000')


function App() {

  const [state, setState] = useState({message:''})
  const [chat,setChat] =useState([])


  useEffect(()=>{
    socket.on('message',({name,message})=>{
      console.log(message)
      setChat([...chat,{name, message}])
    })
  })

  const rendermyChat = ()=>{
    return chat.map( ({name,message}, index)=> (
      <li key={index}> {name} : {message} </li>
    ))
  }

  const onMessageSubmit = (e) =>{
    // 해야할것 
    // 1. 내가 전송할 시 li 하나 추가하기 
    // 2. 내가 전송하고 난뒤 서버에 메세지보내서, 브로드캐스트 하기.

    // 3. 매칭하기.
    // 4. 매칭해서 연결하기..? 시발 어려워~~!~!~!
    e.preventDefault()
    const {message}= state
    socket.emit('message', {message})
    setState({message : ''})
    const name = '나'
    setChat([...chat,{name, message}])
  }

  const onChange = (e) =>{
    console.log(e.target.value)
    const mes = e.target.value
    setState({message : e.target.value})
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <div id="titlebar" >
          <a id="title" href="localhost:3000" >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5v82ItwB6nsdJENubF-SxHe7XTL1hg7p0A&usqp=CAU" width="319" height="79"/>
          </a>

        </div>
        <div id="chatdiv">
          <ul id="chatLog">
            {rendermyChat()}
          </ul>
            <form action="" id="sendForm" onSubmit={onMessageSubmit}>
              <input autocomplete="off" onChange={onChange} value={state.message}/><button>전송</button>
            </form>
        </div>
      </header>
    </div>
  );
}

export default App;
