import "../styles/Hero.css";
import { useState, useEffect } from 'react';
const WORDS = ['Artists', 'Fans', 'Venues'];
const Hero = () => {
    const [currentWord, setCurrentWord] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const current = WORDS[currentWord];
            
            if (isDeleting) {
                setText(current.substring(0, text.length - 1));
                setTypingSpeed(50);
            } else {
                setText(current.substring(0, text.length + 1));
                setTypingSpeed(150);
            }

            // If word is complete, start deleting after pause
            if (!isDeleting && text === current) {
                setTimeout(() => setIsDeleting(true), 2000);
                return;
            }

            // If word is deleted, move to next word
            if (isDeleting && text === '') {
                setIsDeleting(false);
                setCurrentWord((prev) => (prev + 1) % WORDS.length);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, currentWord, typingSpeed]);

    return (
       <section className="hero">
        <div className="hero-content">
            <h1 className="hero-tag">Live Music From the City under the Sun</h1>
            <div className="hero-subtitle">
                <span>Connect with</span>
                <span className="typing-text">{text}</span>
            </div>
            <div className="hero-search">
                <input type="text" placeholder="Search artists, venues, or shows..."/>
                <button className="btn-primary">Search</button>
            </div>
        </div>
       </section>
    )
}

export default Hero;