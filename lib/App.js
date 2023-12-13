import React, { useEffect, useState } from 'react';
import axios from 'axios';
import send from './send.svg';
import load from './load.svg';
import light from './light.svg';
import dark from './dark.svg';
import './App.css';
const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-001/completions';
const generateText = async prompt => {
  try {
    const response = await axios.post(apiUrl, {
      prompt,
      temperature: 0.5,
      max_tokens: 1000
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    return /*#__PURE__*/React.createElement("div", {
      className: "err"
    }, "ERR: Please try again later. Due to excessive demand or an internet issue, Chat AI is having trouble responding to you.");
  }
};
function Form() {
  const [theme, setTheme] = useState(false);
  const handleClick = () => {
    setTheme(!theme);
    if (theme == false) {
      localStorage.setItem('theme', 'dark');
    } else if (theme == true) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  };
  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.remove('dark');
    } else if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  });
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    setGeneratedText(await generateText(inputText));
    setIsLoading(false);
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
    }, 5000);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("h1", null, "apimansion beta")), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("img", {
    src: theme ? light : dark,
    className: "toggle-ic"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "return"
  }, /*#__PURE__*/React.createElement("h1", null, "What can i do for you?"), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Write your question here...",
    onChange: e => setInputText(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isLoading,
    className: isLoading ? "loading" : ""
  }, /*#__PURE__*/React.createElement("img", {
    src: isSent ? load : send,
    className: isSent ? "sent" : "send-ic"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "gen-text"
  }, /*#__PURE__*/React.createElement("h1", null, inputText), /*#__PURE__*/React.createElement("pre", null, generatedText)), /*#__PURE__*/React.createElement("span", null, "Made with \uD83D\uDC98 by Mark Nicholas Razon, Chaan Biz & Carl Arocha")));
}
export default Form;