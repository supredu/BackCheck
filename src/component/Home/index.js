import { motion,AnimatePresence } from 'framer-motion';
import "./index.css"
import React, { useState, useEffect } from 'react';

const MyHome = ()=>{
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [charIndex, setCharIndex] = useState(0);

    const sentences = [
        "We. Defend. Hackers!",
        "We. protect. companies!",
        "We. help. job seekers!"
      ];

      
      useEffect(() => {
        const currentSentence = sentences[currentSentenceIndex];
    if (charIndex < currentSentence.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(displayedText + currentSentence[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100); // Adjust the delay for character appearance
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setDisplayedText('');
        setCurrentSentenceIndex((currentSentenceIndex + 1) % sentences.length);
      }, 1000); // Adjust the delay before starting the next sentence
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentSentenceIndex, displayedText]);

    return (
        <div className='home-container'>
            <motion.div
            key={currentSentenceIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sentence"
        >
            {displayedText}
        </motion.div>
        </div>
    )
}

export default MyHome;