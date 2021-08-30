// import React, { useRef, useState, useEffect } from 'react';

// import { makeStyles } from '@material-ui/core/styles';

// import useChatRoom from './chatroom';
// // import { Socket } from 'socket.io-client';

// const useStyles = makeStyles(theme => ({
//   body: {
//     width: '300px',
//     margin: 0,
//     paddingBottom: '3rem',
//     backgroundColor: 'black'
//   },

//   form: {
//     background: 'rgba(0, 0, 0, 0.15)',
//     padding: '0.25rem',
//     position: 'fixed',
//     bottom: 0,
//     right: 0,
//     display: 'flex',
//     height: '3rem',
//     width: '300px'

//   },

//   input: {
//     border: 'none',
//     padding: '0 1rem',
//     flexGrow: '1',
//     borderRadius: '2rem',
//     margin: '0.25rem',
//     width: '100px'
//   },

//   button: {
//     background: '#333',
//     border: 'none',
//     padding: '0 1rem',
//     margin: '0.25rem',
//     borderRadius: '3px',
//     outline: 'none',
//     color: '#fff'
//   },

//   messages: {
//     listStyleType: 'none',
//     margin: 0,
//     padding: 0
//   }
// }));

// export default function Chat({ socket }) {
//   // const { messages, sendMessage } = useChatRoom(socket);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   const classes = useStyles();

//   const handleNewMessageChange = event => {
//     setMessage(event.target.value);
//   };

//   const sendMessage = event => {
//     event.preventDefault();
//     if (message) {
//       socket.emit('sendMessage', { message: message }, () => {
//         setMessage('');
//       });
//     }
//   };

//   // extra code to send the message as you press the enter key.
//   const handleKeyUp = event => {
//     if (event.key === 'Enter') {
//       if (message !== '') {
//         socket.emit('sendMessage', { message: message }, () => {
//           setMessage('');
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     console.log(socket);
//     socket.on('message', message => {
//       setMessages(messages => [...messages, message]);
//     });
//   }, []);

//   return (
//     <div className={classes.body}>
//         <ul id="messages">
//           {
//             messages.map((messages, i) => (
//               <li key={i}>
//                 {messages.body}
//               </li>
//             ))
//           }
//         </ul>
//         <form id="form" action="" className={classes.form}>
//         <input className={classes.input} type="text" id="input" autoComplete="off" value={message}
//           onChange={handleNewMessageChange}
//           onKeyUp={handleKeyUp} />
//         <button className={classes.button} onClick={sendMessage}>Send</button>
//         </form>
//     </div>
//   );
// }
// // }
