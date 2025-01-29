import { useState } from "react";
import "./App.css";
import emailjs from '@emailjs/browser';



export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [removeButton, setRemoveButton] = useState(false);
  const [yesPressed, setYesPressed] = useState(false);
  const {VITE_EMAIL_SERVICE_ID, VITE_EMAIL_TEMPLATE_ID, VITE_EMAIL_API_KEY, VITE_NAME, VITE_MESSAGE} = import.meta.env;

  const yesButtonSize = noCount * 5 + 16;
  const templateParams = {
    name: VITE_NAME,
    message: VITE_MESSAGE,
  };
  const handleNoClick = () => {
     if (noCount > 8) {
       moveButton();
            }
    if(noCount > 11) {
     setRemoveButton(true);
    }
    setNoCount(noCount + 1);
  };

  // On index 8 move button
  const button: any = document.querySelector(".no-button");
            const container = document.querySelector(".centered-container")

  function moveButton() {
            // Add absolute positioning when hover starts
            if (noCount < 8) {
              return;
            }
            if (!button || !container) {
                return;
            }
            button?.classList.add("active");

            const maxX = container?.clientWidth - button?.clientWidth;
            const maxY = container?.clientHeight - button.clientHeight;

            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            
            button.style.transform = `translate(${randomX}px, ${randomY}px)`;
            button.style.transition = `transform ${ noCount == 8 ? 0.8 : 0.8 * (1/noCount)}s ease-in-out`;
        }
  const phrases = [
         {message: "A lot has happened since last year.", image: "https://media.tenor.com/L0pNsP12XHYAAAAj/khofar-me-and-melissa.gif"},
     {message: "I know we both had our own ups and downs.", image: "https://tenor.com/view/yaseen1-gif-25415616.gif"},
      {message: "But I'm excited to spend another year with you!", image: "https://tenor.com/view/cat_-vodk-love-gif-27591297.gif"},
      {message: "So once again I am asking you,", image: "https://tenor.com/view/cute-gif-4784938373231258767.gif"},
      {message: "SO PLEASE, don't say no this time.", image: "https://tenor.com/view/peach-cat-tears-crying-emotion-big-tummy-gif-15289754.gif"},
      {message: "Will you be my valentine?", image: "https://media.tenor.com/ivKWdfdbV3EAAAAi/goma-goma-cat.gif"},
      
    {message: "AGAIN?????", image: "https://media.tenor.com/uHqybaTVYBwAAAAM/sad-mochi-mochi-cat.gif"},
    {message:"I thought we're past this", image: "https://media.tenor.com/ejFEZglPmrgAAAAj/goma-peach.gif"},
    {message: "FINE LETS MAKE THIS MORE DIFFICULT!!", image: "https://media.tenor.com/RYzpH-j8b30AAAAj/peach-and.gif"},
    {message: "Presistant, aren't we?", image: "https://media.tenor.com/eX1d6fukpNQAAAAj/begging-cat-cat.gif"},
    {message:"Still....?",image: "https://media.tenor.com/dNLReRVOU4sAAAAj/mochi-mochi-peach-cat-crying.gif"},
    {message:"Ugh... BRRRRR",image: "https://media.tenor.com/lC1z6uaP_wYAAAAj/craziness-grey-cat.gif"},
    {message:"FINE I CONTRROL THIS WEBSITE",image: "https://media.tenor.com/HRngfAzY-fwAAAAj/peach-and.gif"},
    {message:"HAHA now you have to click yes HAHAHAHAHAHA",image: "https://media.tenor.com/nHowtsgjJvIAAAAj/yaseen1.gif"},
  ];

  const getImageUrl = () => {
    return phrases[Math.min(noCount, phrases.length - 1)].image;
  }
  console.log('THIS IS yeS FONT SIZE', yesButtonSize)
  return (
    <div className="centered-container">      
      <div className="valentine-container">
        {yesPressed ? (
          <>
            <img src="https://tenor.com/view/love-gif-15396779153844380133.gif" />
            <div className="text-container">Thank you for reserving with Tien Pham. We have sent you an email confirmation and you can no longer cancel &#128579;	</div>
          </>
        ) : (
          <>
            <img
              className="h-[200px]"
              style={{ width: "400x", height: "240px" }}
              src={ getImageUrl()}
            />
             {noCount === 0 ? <h1>Hi {VITE_NAME}</h1> : null}
            <h1 className="text-container">{phrases[noCount].message}</h1>
            <div className="button-container">
              {noCount > 4 ? (
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
              </button>) : null}
              <button onClick={handleNoClick} onMouseOver={moveButton} style={{ fontSize: 41 }} className={`${removeButton ? "display-none" :"no-button"}`}>
                {noCount < 5  ? "Next" : "No"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}