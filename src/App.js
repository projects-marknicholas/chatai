import React,{useEffect, useState} from 'react'
import axios from 'axios'
import send from './send.svg'
import load from './load.svg'
import light from './light.svg'
import dark from './dark.svg'
import './App.css'

const apiKey = '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'; 
const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-001/completions';

const generateText = async (prompt) => {
    try {
        const response = await axios.post(apiUrl, {
            prompt,
            temperature: 0.5,
            max_tokens: 1000,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
        return response.data.choices[0].text;
    } catch (error) {
        console.error(error);
        return <div className="err">ERR: Please try again later. Due to excessive demand or an internet issue, Chat AI is having trouble responding to you.</div>;
    }
}



function Form() {

    const [theme, setTheme] = useState(false);
    const handleClick = () => {
        setTheme(!theme);

        if(theme == false){
            localStorage.setItem('theme', 'dark');
        }
        else if(theme == true){
            localStorage.setItem('theme', 'light');
        }
        else{
            localStorage.setItem('theme', 'dark');
        }
    }
    useEffect(() => {
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.remove('dark');
        }
        else if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark');
        }
        else{
            document.body.classList.remove('dark');
        }
    });


    const [inputText, setInputText] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

      const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setGeneratedText(await generateText(inputText));
        setIsLoading(false);
        setIsSent(true);
        setTimeout(() => {
          setIsSent(false);
        }, 5000);
      }

    return (
        <div className="App">
            <main>
                <nav>
                    <div className="left">
                        <h1>apimansion beta</h1>
                    </div>
                    <div className="right">
                        <button onClick={handleClick}>
                            <img src={theme ? light : dark} className="toggle-ic"/>
                        </button>
                    </div>
                </nav>

                <div className="return">
                    <h1>What can i do for you?</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Write your question here..." onChange={(e) => setInputText(e.target.value)}/>
                        <button type="submit" disabled={isLoading} className={isLoading ? "loading" : ""}>
                          <img src={isSent ? load : send} className={isSent ? "sent" : "send-ic"} />
                        </button>
                    </form>
                </div>

                <div className="gen-text">
                    <h1>{inputText}</h1>
                    <pre>{generatedText}</pre>
                </div>

                <span>Made with 💘 by Mark Nicholas Razon, Chaan Biz & Carl Arocha</span>
            </main>
        </div>
    );
}

export default Form;
