import './App.scss';
import {useEffect, useState} from "react";

export function App() {
    const [hours, setHours] = useState('0')
    const [minutes, setMinutes] = useState('0')
    const [seconds, setSeconds] = useState('0')
    const [start, setStart] = useState(false)

    useEffect(() => {
        if (hours.length >= 3) {
            setHours(hours)
        }
        if (hours >= 23) {
            setHours('23')
        }
        if (minutes.length >= 3) {
            setMinutes(minutes)
        }
        if (minutes >= 59) {
            setMinutes('59')
        }
        if (seconds.length >= 3) {
            setSeconds(seconds)
        }
        if (seconds >= 59) {
            setSeconds('59')
        }
    }, [hours, seconds, minutes])

    useEffect(() => {
        if (start) {
            const countDate = new Date('May 30, 2020').getTime()
            const newDate = new Date('May 30, 2020').setHours(Number(hours), Number(minutes), Number(seconds))
            let distance = newDate - countDate
            const interval = setInterval(() => {
                distance-= 1000
                const hour = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
                const minute = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60))
                const second = Math.floor((distance % (60 * 1000)) / 1000)
                if (distance < 0) {
                    clearInterval(interval)
                    alert('Your time is done')
                    setStart(false)
                } else {
                    setHours(String(hour))
                    setMinutes(String(minute))
                    setSeconds(String(second))
                }
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [hours, minutes, seconds, start])



    const handleHours = (e) => {
        setHours(e.target.value)
    }

    const handleMinutes = (e) => {
        setMinutes(e.target.value)
    }

    const handleSeconds = (e) => {
        setSeconds(e.target.value)
    }

    const handleStart = () => {
        setStart(true)
    }
    const handlePause = () => {
        setStart(false)
    }

    const handleClear = () => {
        setStart(false)
        setHours('0')
        setSeconds('0')
        setMinutes('0')
    }
    const handleSelect = (e) => {
        e.target.select()
    }

    return (
        <>
            <div className="app">
                <div className="inputs">
                    <span className="inputs__position">
                        <input disabled={start} min="0" max="23"
                               onClick={(e) => handleSelect(e)}
                               onChange={(e) => handleHours(e)}
                               pattern="\d*"
                               value={hours} type="number"/>
                        <div className="valueName">ч</div>
                    </span>
                    <span className="inputs__position">
                        <input disabled={start} min="0" max="59"
                               onClick={(e) => handleSelect(e)}
                               onChange={(e) => handleMinutes(e)}
                               pattern="\d*"
                               value={minutes} type="number"/>
                        <div className="valueName">м</div>
                    </span>
                    <span className="inputs__position">
                        <input disabled={start} min="0" max="59"
                               onClick={(e) => handleSelect(e)}
                               onChange={(e) => handleSeconds(e)}
                               pattern="\d*"
                               value={seconds} type="number"/>
                        <div className="valueName">с</div>
                    </span>
                </div>
                <div className="buttons">
                    <button disabled={start} onClick={handleStart}>старт</button>
                    {start ? <button onClick={handlePause}>пауза</button>
                        :  <button onClick={handleClear}>сбросить</button>
                    }
                </div>
            </div>
        </>
    );
}
