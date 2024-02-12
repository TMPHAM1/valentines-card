import { useState } from "react";
import "./App.css";
import emailjs from '@emailjs/browser';



export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [removeButton, setRemoveButton] = useState(false);
  const [yesPressed, setYesPressed] = useState(false);
  const {VITE_EMAIL_SERVICE_ID, VITE_EMAIL_TEMPLATE_ID, VITE_EMAIL_API_KEY, VITE_NAME, VITE_MESSAGE} = import.meta.env;

  const yesButtonSize = noCount * 20 + 16;
  const templateParams = {
    name: VITE_NAME,
    message: VITE_MESSAGE,
  };
  const handleNoClick = () => {
    if(noCount > 7) {
     setRemoveButton(true);
    }
    setNoCount(noCount + 1);
  };
  const phrases = [
    {message: "no", image: "test"},
    {message:"...", image: "https://tenor.com/view/milk-mocha-milk-and-mocha-bears-bored-wait-gif-13418519.gif"},
    {message: "Stop clicking no :(", image: "https://tenor.com/view/love-you-gif-20040131.gif"},
    {message: "Pain...", image: "https://tenor.com/view/love-bear-panda-gif-18519830.gif"},
    {message:"Why do are you still trying to reject me",image: "https://tenor.com/view/mimibubu-gif-23673577.gif"},
    {message:"Ugh...",image: "https://tenor.com/view/peach-goma-gif-20044618.gif"},
    {message:"Is it because you think I'm an F Boi",image: "https://tenor.com/view/tkthao219-bubududu-gif-24990205.gif"},
    {message:"Do I need to make it so youre unable to click this button",image: "https://tenor.com/view/peach-goma-gif-20195177.gif"},
    {message:"THAT'S IT TIME TO DELETE IT",image: "https://tenor.com/view/11-gif-27661536.gif"},
    {message: "", image: "https://tenor.com/view/dudu-dudu-bear-dudu-glasses-dudu-bubu-brownie-bear-gif-3031749756354029771.gif"}
  ];

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)].message;
  };
  const getImageUrl = () => {
    return phrases[Math.min(noCount, phrases.length - 1)].image;
  }

  return (
    <div className="centered-container">      
      <div className="valentine-container">
        {yesPressed ? (
          <>
            <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
            <div className="text-container">Wooooo!!! I have sent an email confirmation so I know you clicked Yes &#128579;	</div>
          </>
        ) : (
          <>
            <img
              className="h-[200px]"
              style={{ width: "400x", height: "240px" }}
              src={ noCount === 0  ? "https://tenor.com/view/shakespaw-gif-1400587432665718894.gif" : getImageUrl()}
            />
            <h1>Hi {VITE_NAME}</h1>
            <h1 className="text-container">Will you be my Valentine?</h1>
            <div className="button-container">
              <button
                className={"yes-button"}
                style={{ fontSize: yesButtonSize }}
                onClick={() => {
          
                  
                  emailjs.send(VITE_EMAIL_SERVICE_ID, VITE_EMAIL_TEMPLATE_ID, templateParams, {publicKey: VITE_EMAIL_API_KEY}).then(
                    (response) => {
                      console.log('SUCCESS!', response.status, response.text);
                    },
                    (error) => {
                      console.log('FAILED...', error);
                    },
                  );
                  setYesPressed(true)}}
              >
                Yes
              </button>
              <button onClick={handleNoClick} className={`${removeButton ? "display-none" :"no-button"}`}>
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}