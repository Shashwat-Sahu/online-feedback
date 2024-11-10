import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import imgLogo from "../../assets/logo.png";
import { useState } from "react";

const styles = StyleSheet.create({
  body: {
    position: "relative",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
    textDecoration: "underline",
  },
  author: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    textDecoration: "underline",
  },

  fields: {
    display: "flex",
    flexDirection: "column",
    fontSize: 18,
    textAlign: "left",
    marginBottom: 15,
  },
  position: {
    fontSize: 10,
    textAlign: "right",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    textAlign: "left",
    fontSize: 15,
    fontWeight: 500,
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: "grey",
    marginBottom: 10,
  },
  counsellee: {
    position: "absolute",
    fontSize: 15,
    left: 10,
    bottom: 40,
  },
  remark: {
    fontSize: 15,
    textAlign: "center",
  },
  counsellor: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    fontSize: 15,
    right: 10,
    bottom: 40,
    textAlign: "start",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  watermark: {
    position: "absolute",
    top: "30%",
    left: "15%",
    width: 500,
    height: 500,
    opacity: 0.1,
    transform: "translate(-50%,-50%)",
  },
});

function Pdf({data,session_index}) {
  return (
    <Document title="Feedback report">
      {data?.counselling_session?.map((session, ind) => {
        
       const elem =  Array(Math.ceil((session?.length)/4))?.fill(1).map((_,pagePerSession)=>{
          
        let chunkarray = session.splice(0, 4);
        return (
          <Page size="A4" style={styles.body}>
            <Image src={imgLogo} style={styles.watermark} />
            <Text style={styles.header} fixed>
              INDIAN AIR FORCE
            </Text>
            <Text style={styles.position}>Date:{new Date(data.counselling_session_timestamp[ind]).toLocaleDateString()}</Text>
            <Text style={styles.author}>
              Couselling No. {session_index||ind+1}
            </Text> 
            <View style={styles.fields}>
              <Text>Trainee Name: {data.name}</Text>
              <Text>Service No: {data.service_id}</Text>
            </View>
            <View style={styles.horizontalLine} />
            <Text style={styles.remark}>Feedback:{data.feedback}</Text>
            <Text style={styles.remark}>Suggestions:{data.suggestion}</Text>
            <View style={styles.horizontalLine} />
            {chunkarray.map((session_part_questions,i) => {
              return (
                <View style={styles.container}>
                  <Text style={styles.qna}>
                    Question {pagePerSession*4+ i+1}:{session_part_questions.question}{" "}
                  </Text>
                  <Text style={styles.qna}>
                    Answer {pagePerSession*4+ i+1}: {session_part_questions.answer}
                  </Text>
                </View>
              );
            })}

            <Text style={styles.counsellee}>Counsellee Signature:</Text>
            <View style={styles.counsellor}>
              <Text>Counsellor details:</Text>
              <Text>Name:{data.counsellor?.name}</Text>
              <Text>Rank:{data.counsellor?.rank}</Text>
              <Text>Service no.:{data.counsellor?.service_id}</Text>
            </View>

            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
              fixed
            />
          </Page>
        );
        
      })
      return elem
})}
    </Document>
  );
}

export default Pdf;
