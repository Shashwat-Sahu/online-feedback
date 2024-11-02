import React, { useRef } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

const FeedbackPageAdmin = (details) => {
  const location = useLocation();
  const reportTemplateRef = useRef(null);
  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });

    // Adding the fonts.
    doc.setFont("Inter-Regular", "normal");

    doc.html(reportTemplateRef.current, {
      autoPaging: "text",
      margin: [2, 8, 4, 8],
      async callback(doc) {
        await doc.save(location.state?.service_id+"_"+new Date().toLocaleString());
      },
    });
  };
  return (
    <>
      <div ref={reportTemplateRef}>
        <h4>Service ID: {location.state?.service_id}</h4>

        {location.state?.counselling_session?.map((session, ind) => {
          return (
            <div>
              <h5>Counselling session : {ind + 1}</h5>
              <>
                {session.map((qna) => {
                  return (
                    <>
                      <p>Question : {qna.question}</p>
                      <p>Answer : {qna.answer}</p>
                    </>
                  );
                })}
              </>
              <h5>
                Created At:{" "}
                {new Date(
                  location.state.counselling_session_timestamp[ind],
                ).toLocaleDateString("en-IN")}
              </h5>
            </div>
          );
        })}
      </div>
      <button className="button" onClick={handleGeneratePdf}>
        Generate PDF
      </button>
    </>
  );
};

export default FeedbackPageAdmin;
