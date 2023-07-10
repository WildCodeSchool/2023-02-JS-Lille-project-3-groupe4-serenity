// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function UseContext() {
//   const [idInter, setIdInter] = useState();
//   const [idStep, setIdStep] = useState();

//   useEffect(() => {
//     const fetchStep = async () => {
//       try {
//         const response = await axios.get("http://localhost:5050/steps");
//         const { data } = response;

//         setIdStep(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchStep();
//   });

//   useEffect(() => {
//     const fetchInter = async () => {
//       try {
//         const response = await axios.get("http://localhost:5050/interventions");
//         const { data } = response;

//         setIdInter(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchInter();
//   });

//   return <div>UseContext</div>;
// }

// export default UseContext;
