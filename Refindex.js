// import {
//   GoogleGenerativeAI,
//   HarmBlockThreshold,
//   HarmCategory
// } from '../node_modules/@google/generative-ai/dist/index.mjs';

// Important! Do not expose your API in your extension code. You have to
// options:
//
// 1. Let users provide their own API key.
// 2. Manage API keys in your own server and proxy all calls to the Gemini
// API through your own server, where you can implement additional security
// measures such as authentification.
//
// It is only OK to put your API key into this file if you're the only
// user of your extension or for testing.
// const apiKey = '...';

// let genAI = null;
// let model = null;
// let generationConfig = {
//   temperature: 1
// };

// const inputPrompt = document.body.querySelector('#input-prompt');
// const buttonPrompt = document.body.querySelector('#button-prompt');
// const elementResponse = document.body.querySelector('#response');
// const elementLoading = document.body.querySelector('#loading');
// const elementError = document.body.querySelector('#error');
// const sliderTemperature = document.body.querySelector('#temperature');
// const labelTemperature = document.body.querySelector('#label-temperature');

document.querySelector(".scrape-btn").addEventListener("click", () => {
  console.log("Scrape button clicked");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab) {
      console.log("Tab selected", currentTab);
      const url = currentTab.url;
      const listItem = document.createElement("li");
      listItem.textContent = url;
      document.getElementById("reference-links").appendChild(listItem);
    }
  });
});

// function initModel(generationConfig) {
//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//       threshold: HarmBlockThreshold.BLOCK_NONE
//     }
//   ];
//   genAI = new GoogleGenerativeAI(apiKey);
//   model = genAI.getGenerativeModel({
//     model: 'gemini-1.5-flash',
//     safetySettings,
//     generationConfig
//   });
//   return model;
// }


// indexe.html file reference:
// <!-- <!DOCTYPE html>
// <html>
//   <head>
//     <link rel="stylesheet" type="text/css" href="index.css" />
//   </head>
//   <body>
//     <div inline class="play-button-container">
//       <label>Scrape this page</label>
//       <button type="button">
//         <img
//           src="../images/play-64.png"
//           alt="Scrape this page"
//           style="width: 30px; height: 30px"
//         />
//       </button>
//     </div>
//         <tr>
//           <td>1</td>
//           <td>
//             <a href="http://wikipedia.com/" target="_blank"
//               >http://wikipedia.com/</a
//             >
//           </td>
//         </tr>
//         <tr>
//           <td>2</td>
//           <td>Value 2</td>
//         </tr>
//         <tr>
//           <td>3</td>
//           <td>Value 3</td>
//         </tr>

//     <button id="button-prompt" class="primary" disabled>Run</button>
//     <div id="response" class="text" hidden></div>
//     <div id="loading" class="text" hidden><span class="blink">...</span></div>
//     <div id="error" class="text" hidden></div>
//     <script src="../dist/sidepanel.bundle.js" type="module"></script>
//   </body>
// </html> -->
