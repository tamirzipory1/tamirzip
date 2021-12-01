import React, { useState } from 'react';
import '../comingsoon.css';
import {quizData} from "../components/TriviaData";
function Trivia() {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [options, setOptions] = useState([]);
    const [disabled, setDisabled] = useState(true);
    return (
        <div>
            <div className="show">
                <label>
            soon
            </label>
            </div>
        </div>
    )
}

export default Trivia
