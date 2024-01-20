import React, { useRef } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import jsPDF from 'jspdf';

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
    console.log(location)
    return (
        <>
            <div ref={reportTemplateRef}>
                <Container>
                    <Row>
                        {Object.keys(location.state).map((item) => {
                            return (<p>{item} : {location.state[item]}</p>)
                        })}

                    </Row>
                </Container>
            </div>
            <button className="button" onClick={handleGeneratePdf}>
                Generate PDF
            </button>
        </>
    )
}

export default FeedbackPage