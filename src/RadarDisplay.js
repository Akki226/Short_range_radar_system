import React, { useState, useEffect } from 'react';
import { ArduinoService } from './ArduinoService';

const RADAR_RANGE = 180; // degrees
const RADAR_SPEED = 58; // cm/s
const RADAR_INTERVAL = 1000; // milliseconds

function RadarDisplay() {
    const [distance, setDistance] = useState(0);
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const arduino = new ArduinoService();
        arduino.connect();

        let intervalId = setInterval(() => {
            const { distance, angle } = arduino.getData();
            setDistance(distance);
            setAngle(angle);
        }, RADAR_INTERVAL);

        return () => {
            arduino.disconnect();
            clearInterval(intervalId);
        }
    }, []);

    return (
        <div>
            <RadarView distance={distance} angle={angle} />
        </div>
    );
}

function RadarView({ distance, angle }) {
    const radarRadius = 100;
    const radarCenter = { x: radarRadius, y: radarRadius };
    const objectPosition = {
        x: radarCenter.x + (distance * Math.cos(angle)),
        y: radarCenter.y + (distance * Math.sin(angle))
    };

    return (
        <svg width={radarRadius * 2} height={radarRadius * 2}>
            <circle cx={radarCenter.x} cy={radarCenter.y} r={radarRadius} fill="white" stroke="black" />
            <circle cx={objectPosition.x} cy={objectPosition.y} r={5} fill="red" />
        </svg>
    );
}
export default RadarDisplay;