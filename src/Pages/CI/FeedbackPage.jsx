import React, { useRef } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import jsPDF from 'jspdf';
import background from "../../assets/wp4004569-indian-air-force-wallpapers.jpg"
import {Base64} from "js-base64"

const FeedbackPage = (details) => {
    const location = useLocation()
    const reportTemplateRef = useRef(null);

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: 'a4',
            unit: 'px',
        });

        // Adding the fonts.
        doc.setFont('Inter-Regular', 'normal');
        doc.html(reportTemplateRef.current, {
            async callback(doc) {
                
                await doc.save('document');
            },
        });
    };
    return (
        <div>
            <div ref={reportTemplateRef}>

                {Object.keys(location.state).map((item) => {
                    return (<p className="mx-2">{item} : {location.state[item]}</p>)
                })}

            </div>
            <button className="button" onClick={handleGeneratePdf}>
                Generate PDF
            </button>
        </div>
    )
}

export default FeedbackPage