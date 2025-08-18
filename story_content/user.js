window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script1 = function()
{
  // Get the player object to access Storyline variables
const player = GetPlayer();
const token = player.GetVar("t1");

// API URL with token
const apiUrl = `https://api-soft-assist.nobisoft.com.vn/api/lesson-configuration/${token}`;

// Fetch data from the API
fetch(apiUrl, {
  method: 'GET',
  headers: {
    'Accept': '*/*'
  }
})
.then(response => response.json())
.then(data => {
  // Loop through each question and set Storyline variables
  data.questions.forEach(question => {
    // Set question content
    player.SetVar(question.contentVariable, question.content);

    // Set correct answer
    player.SetVar(question.answerVariable, question.answer);

    // Initialize student's answer as empty
    player.SetVar(question.studentAnswerVariable, '');
  });
})
.catch(error => {
  console.error('Error fetching API:', error);
});

}

window.Script2 = function()
{
  (async function evaluateLessonFromStoryline() {
    // Create loading overlay if it doesn't already exist
    if (!document.getElementById("loadingOverlay")) {
        const overlay = document.createElement("div");
        overlay.id = "loadingOverlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        overlay.style.zIndex = "9999";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.color = "white";
        overlay.style.fontSize = "2em";
        overlay.style.fontFamily = "Arial, sans-serif";
        overlay.innerText = "Waiting for AI response...";

        document.body.appendChild(overlay);
    }
    const player = GetPlayer();
    const token = player.GetVar("t1");

    try {
        // Step 1: Fetch lesson configuration
        const lessonConfigRes = await fetch(
            `https://api-soft-assist.nobisoft.com.vn/api/lesson-configuration/${token}`
        );

        if (!lessonConfigRes.ok) {
            throw new Error("Failed to fetch lesson configuration");
        }

        const lessonConfig = await lessonConfigRes.json();
        const {
            knowledgeBase,
            questions
        } = lessonConfig;

        // Step 2: Collect student answers from Storyline variables
        const studentVariables = {};
        questions.forEach((q) => {
            studentVariables[q.studentAnswerVariable] = player.GetVar(q.studentAnswerVariable);
        });

        // Step 3: Prepare data to submit
        const submitBody = {
            lessonConfigId:token,
            questions: questions.map((q) => ({
                groundTruthAnswer: q.answer,
                studentAnswer: studentVariables[q.studentAnswerVariable],
                question: q.content,
                judgeVariable: q.judgeVariable,
            })),
        };

        // Step 4: Submit answers to API
        const submitRes = await fetch(
            "https://api-soft-assist.nobisoft.com.vn/api/submit/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitBody),
            }
        );

        if (!submitRes.ok) {
            throw new Error("Failed to submit answers");
        }

        const feedbacks = await submitRes.json();

        // Step 5: Update Storyline with feedback
        feedbacks.forEach((fb) => {
            player.SetVar(fb.judgeVariable, fb.feedback);
        });

        console.log("Feedback updated in Storyline:", feedbacks);
    } catch (err) {
        console.error("Error during evaluation:", err);
    }
    var overlay = document.getElementById("loadingOverlay");
    if (overlay) {
        overlay.remove();
    }
})();
}

window.Script3 = function()
{
  // Get the player object to access Storyline variables
const player = GetPlayer();
const token = player.GetVar("t2");

// API URL with token
const apiUrl = `https://api-soft-assist.nobisoft.com.vn/api/lesson-configuration/${token}`;

// Fetch data from the API
fetch(apiUrl, {
  method: 'GET',
  headers: {
    'Accept': '*/*'
  }
})
.then(response => response.json())
.then(data => {
  // Loop through each question and set Storyline variables
  data.questions.forEach(question => {
    // Set question content
    player.SetVar(question.contentVariable, question.content);

    // Set correct answer
    player.SetVar(question.answerVariable, question.answer);

    // Initialize student's answer as empty
    player.SetVar(question.studentAnswerVariable, '');
  });
})
.catch(error => {
  console.error('Error fetching API:', error);
});

}

window.Script4 = function()
{
  (async function evaluateLessonFromStoryline() {
    // Create loading overlay if it doesn't already exist
    if (!document.getElementById("loadingOverlay")) {
        const overlay = document.createElement("div");
        overlay.id = "loadingOverlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        overlay.style.zIndex = "9999";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.color = "white";
        overlay.style.fontSize = "2em";
        overlay.style.fontFamily = "Arial, sans-serif";
        overlay.innerText = "Waiting for AI response...";

        document.body.appendChild(overlay);
    }
    const player = GetPlayer();
    const token = player.GetVar("t2");

    try {
        // Step 1: Fetch lesson configuration
        const lessonConfigRes = await fetch(
            `https://api-soft-assist.nobisoft.com.vn/api/lesson-configuration/${token}`
        );

        if (!lessonConfigRes.ok) {
            throw new Error("Failed to fetch lesson configuration");
        }

        const lessonConfig = await lessonConfigRes.json();
        const {
            knowledgeBase,
            questions
        } = lessonConfig;

        // Step 2: Collect student answers from Storyline variables
        const studentVariables = {};
        questions.forEach((q) => {
            studentVariables[q.studentAnswerVariable] = player.GetVar(q.studentAnswerVariable);
        });

        // Step 3: Prepare data to submit
        const submitBody = {
            lessonConfigId:token,
            questions: questions.map((q) => ({
                groundTruthAnswer: q.answer,
                studentAnswer: studentVariables[q.studentAnswerVariable],
                question: q.content,
                judgeVariable: q.judgeVariable,
            })),
        };

        // Step 4: Submit answers to API
        const submitRes = await fetch(
            "https://api-soft-assist.nobisoft.com.vn/api/submit/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitBody),
            }
        );

        if (!submitRes.ok) {
            throw new Error("Failed to submit answers");
        }

        const feedbacks = await submitRes.json();

        // Step 5: Update Storyline with feedback
        feedbacks.forEach((fb) => {
            player.SetVar(fb.judgeVariable, fb.feedback);
        });

        console.log("Feedback updated in Storyline:", feedbacks);
    } catch (err) {
        console.error("Error during evaluation:", err);
    }
    var overlay = document.getElementById("loadingOverlay");
    if (overlay) {
        overlay.remove();
    }
})();
}

window.Script5 = function()
{
  // Get the player object to access Storyline variables
const player = GetPlayer();
const token = player.GetVar("t3");

// API URL with token
const apiUrl = `https://api-soft-assist.nobisoft.com.vn/api/lesson-configuration/${token}`;

// Fetch data from the API
fetch(apiUrl, {
  method: 'GET',
  headers: {
    'Accept': '*/*'
  }
})
.then(response => response.json())
.then(data => {
  // Loop through each question and set Storyline variables
  data.questions.forEach(question => {
    // Set question content
    player.SetVar(question.contentVariable, question.content);

    // Set correct answer
    player.SetVar(question.answerVariable, question.answer);

    // Initialize student's answer as empty
    player.SetVar(question.studentAnswerVariable, '');
  });
})
.catch(error => {
  console.error('Error fetching API:', error);
});

}

window.Script6 = function()
{
  (async function evaluateLessonFromStoryline() {
    // Create loading overlay if it doesn't already exist
    if (!document.getElementById("loadingOverlay")) {
        const overlay = document.createElement("div");
        overlay.id = "loadingOverlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        overlay.style.zIndex = "9999";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.color = "white";
        overlay.style.fontSize = "2em";
        overlay.style.fontFamily = "Arial, sans-serif";
        overlay.innerText = "Waiting for AI response...";

        document.body.appendChild(overlay);
    }
    const player = GetPlayer();
    const token = player.GetVar("t3");

    try {
        // Step 1: Fetch lesson configuration
        const lessonConfigRes = await fetch(
            `https://api-soft-assist.nobisoft.com.vn/api/lesson-configuration/${token}`
        );

        if (!lessonConfigRes.ok) {
            throw new Error("Failed to fetch lesson configuration");
        }

        const lessonConfig = await lessonConfigRes.json();
        const {
            knowledgeBase,
            questions
        } = lessonConfig;

        // Step 2: Collect student answers from Storyline variables
        const studentVariables = {};
        questions.forEach((q) => {
            studentVariables[q.studentAnswerVariable] = player.GetVar(q.studentAnswerVariable);
        });

        // Step 3: Prepare data to submit
        const submitBody = {
            lessonConfigId:token,
            questions: questions.map((q) => ({
                groundTruthAnswer: q.answer,
                studentAnswer: studentVariables[q.studentAnswerVariable],
                question: q.content,
                judgeVariable: q.judgeVariable,
            })),
        };

        // Step 4: Submit answers to API
        const submitRes = await fetch(
            "https://api-soft-assist.nobisoft.com.vn/api/submit/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitBody),
            }
        );

        if (!submitRes.ok) {
            throw new Error("Failed to submit answers");
        }

        const feedbacks = await submitRes.json();

        // Step 5: Update Storyline with feedback
        feedbacks.forEach((fb) => {
            player.SetVar(fb.judgeVariable, fb.feedback);
        });

        console.log("Feedback updated in Storyline:", feedbacks);
    } catch (err) {
        console.error("Error during evaluation:", err);
    }
    var overlay = document.getElementById("loadingOverlay");
    if (overlay) {
        overlay.remove();
    }
})();
}

window.Script7 = function()
{
  (async function evaluateLessonFromStoryline() {
    // Create loading overlay if it doesn't already exist
    if (!document.getElementById("loadingOverlay")) {
        const overlay = document.createElement("div");
        overlay.id = "loadingOverlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        overlay.style.zIndex = "9999";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.color = "white";
        overlay.style.fontSize = "2em";
        overlay.style.fontFamily = "Arial, sans-serif";
        overlay.innerText = "Waiting for AI response...";

        document.body.appendChild(overlay);
    }
    const player = GetPlayer();

    try {
        // Get question from Storyline variable q10
        const question = player.GetVar("q10");

        // Call the ask-question API with question
        const response = await fetch("https://api-soft-assist.nobisoft.com.vn/api/submit/ask-question", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "*/*"
            },
            body: JSON.stringify({ question })
        });

        if (!response.ok) {
            throw new Error("Failed to ask question");
        }
        
        const data = await response.json();  // parse JSON from response
		const answer = data.answer;           // adapt this key to your actual API response structure
		player.SetVar("j10", answer);

        console.log("AI response set to j10:", answer);

    } catch (err) {
        console.error("Error during AI question:", err);
    }

    var overlay = document.getElementById("loadingOverlay");
    if (overlay) {
        overlay.remove();
    }
})();

}

};
