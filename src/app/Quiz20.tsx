/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Share2, Eye, Languages, Flag } from "lucide-react"

// Hindi translations (simulated)
const hindiTranslations: { [key: string]: string } = {
  "Which of the following statements about 'Green Credit Initiative' is/are correct?": "ग्रीन क्रेडिट इनिशिएटिव के बारे में निम्नलिखित में से कौन सा कथन सही है?",
  "On what charge was Jatin Das arrested:": "जतीन दास को किस आरोप में गिरफ्तार किया गया था:",
  "The Panchayati Raj system in India operates at which of the following levels?": "भारत में पंचायती राज व्यवस्था निम्नलिखित में से किस स्तर पर संचालित होती है?",
  "Which of the following is NOT a fundamental duty of citizens as per the Indian Constitution?": "निम्नलिखित में से कौन भारतीय संविधान के अनुसार नागरिकों का मौलिक कर्तव्य नहीं है?",
  "Who among the following was the first Indian woman to win an Olympic medal?": "निम्नलिखित में से कौन ओलंपिक पदक जीतने वाली पहली भारतीय महिला थी?",
  "1, 2 and 3": "1, 2 और 3",
  "1 and 2 only": "केवल 1 और 2",
  "2 only": "केवल 2",
  "1 and 3 only": "केवल 1 और 3",
  "Meerut Conspiracy": "मेरठ षड्यंत्र",
  "Lahore Conspiracy": "लाहौर षड्यंत्र",
  "Chittagong Armed Dacoity": "चटगांव सशस्त्र डकैती",
  "None of the above": "उपरोक्त में से कोई नहीं",
  "Village level only": "केवल ग्राम स्तर पर",
  "Block and district levels only": "केवल ब्लॉक और जिला स्तर पर",
  "Village, block and district levels": "ग्राम, ब्लॉक और जिला स्तर पर",
  "State level only": "केवल राज्य स्तर पर",
  "To vote in elections": "चुनावों में मतदान करना",
  "To respect the National Flag and National Anthem": "राष्ट्रीय ध्वज और राष्ट्रगान का सम्मान करना",
  "To pay taxes": "कर चुकाना",
  "To protect and improve the natural environment": "प्राकृतिक पर्यावरण की रक्षा और सुधार करना",
  "Karnam Malleswari": "करनम मल्लेश्वरी",
  "P.T. Usha": "पी.टी. उषा",
  "Mary Kom": "मैरी कॉम",
  "Saina Nehwal": "साइना नेहवाल",
}

interface Question {
  id: number
  text: string
  options: string[]
  tag?: string
  correctAnswer: number
}

const questions: Question[] = [
  
  {
    id: 2,
    text: "On what charge was Jatin Das arrested:",
    options: ["Meerut Conspiracy", "Lahore Conspiracy", "Chittagong Armed Dacoity", "None of the above"],
    correctAnswer: 1,
  },
  {
    id: 3,
    text: "The Panchayati Raj system in India operates at which of the following levels?",
    options: ["Village level only", "Block and district levels only", "Village, block and district levels", "State level only"],
    tag: "UPSC 2023",
    correctAnswer: 2,
  },
  {
    id: 4,
    text: "Which of the following is NOT a fundamental duty of citizens as per the Indian Constitution?",
    options: ["To vote in elections", "To respect the National Flag and National Anthem", "To pay taxes", "To protect and improve the natural environment"],
    tag: "NDA II 2022",
    correctAnswer: 0,
  },
  {
    id: 5,
    text: "Who among the following was the first Indian woman to win an Olympic medal?",
    options: ["Karnam Malleswari", "P.T. Usha", "Mary Kom", "Saina Nehwal"],
    tag: "SSC CGL 2021",
    correctAnswer: 0,
  },
]

export default function Quiz20() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60) // 1 minute
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [isResultView, setIsResultView] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1))
  const [isHindi, setIsHindi] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const [score, setScore] = useState({ correct: 0, incorrect: 0, total: 0 })

  useEffect(() => {
    if (timeLeft > 0 && !isResultView) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isResultView) {
      calculateAndShowResults()
    }
  }, [timeLeft, isResultView])

  const calculateAndShowResults = () => {
    const results = selectedAnswers.reduce(
      (acc, answer, index) => {
        if (answer === -1) return acc
        if (answer === questions[index].correctAnswer) {
          acc.correct += 1
          acc.total += 1
        } else {
          acc.incorrect += 1
          acc.total -= 0.25 // Negative marking
        }
        return acc
      },
      { correct: 0, incorrect: 0, total: 0 }
    )
    setScore(results)
    setIsResultView(true)
    setShowSubmitDialog(false)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[questionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const translate = (text: string) => {
    if (!isHindi) return text
    return hindiTranslations[text] || text
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className={`flex h-screen flex-col ${isDarkMode ? "bg-[#121212] text-white" : "bg-white text-black"}`}>
        <header className={`flex items-center text-white justify-between p-4 ${isDarkMode ? "bg-[#c5e1a5]" : "bg-black"}`}>
          <div className="text-xl font-bold">Quiz20</div>
          <div className="flex items-center gap-4">
            <div className={`rounded-full ${isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-black"} px-3 py-1`}>
              {formatTime(timeLeft)}
            </div>
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </header>

        <div className="flex-1 p-4">
          {isResultView ? (
            <div className="flex flex-col items-center">
              <h2 className="mb-4 text-2xl font-bold">Quiz by Quiz20</h2>
              <h3 className="mb-8 text-xl">Quiz20</h3>
              <div className="relative mb-8 h-64 w-64">
                <div className={`absolute inset-0 rounded-full ${isDarkMode ? "bg-[#2c2c2c]" : "bg-[#e0e0e0]"}`} />
                <div className="absolute inset-4 rounded-full bg-white dark:bg-[#121212] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">Score: {score.total.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{questions.length}</div>
                  </div>
                </div>
                <div className="absolute -right-2 -top-2 flex space-x-1">
                  <span className="rounded bg-[#4caf50] px-1 text-xs text-white">{score.correct}</span>
                  <span className="rounded bg-[#f44336] px-1 text-xs text-white">{score.incorrect}</span>
                </div>
              </div>
              <div className="mb-8 flex justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-[#4caf50]" />
                  Correct
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-[#f44336]" />
                  Incorrect
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-gray-300" />
                  Not Attempted
                </div>
              </div>
              <div className="mb-8 grid w-full grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-bold">Positive</div>
                  <div>{score.correct.toFixed(2)}</div>
                </div>
                <div>
                  <div className="font-bold">Negative</div>
                  <div>{(-score.incorrect * 0.25).toFixed(2)}</div>
                </div>
                <div>
                  <div className="font-bold">Total</div>
                  <div>{score.total.toFixed(2)}</div>
                </div>
              </div>
              <div className="grid w-full grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 rounded-md bg-[#dcedc8] py-2 text-black dark:bg-[#8bc34a]">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center justify-center gap-2 rounded-md bg-[#dcedc8] py-2 text-black dark:bg-[#8bc34a]">
                  <Eye className="h-5 w-5" />
                  <span>Answers</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4">Quiz by Quiz20</div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`h-3 w-3 rounded-full ${
                        index === currentQuestion
                          ? "bg-[#8bc34a]"
                          : selectedAnswers[index] !== -1
                          ? "bg-gray-300"
                          : "border-2 border-gray-300 bg-white dark:border-white dark:bg-[#121212]"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setShowSubmitDialog(true)}
                  className="rounded-lg bg-[#2196f3] px-8 py-2 text-white hover:bg-[#1976d2]"
                >
                  Submit
                </button>
              </div>
              <div className="mb-4 text-sm text-[#2196f3]">Question {currentQuestion + 1} of {questions.length}</div>
              {questions[currentQuestion].tag && (
                <div className="mb-4 inline-block rounded-full bg-[#e1bee7] px-3 py-1 text-sm dark:bg-[#4a148c]">
                  {questions[currentQuestion].tag}
                </div>
              )}
              <div className="mb-6 whitespace-pre-wrap text-lg">{translate(questions[currentQuestion].text)}</div>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                    className={`flex cursor-pointer items-center rounded-lg border p-4 transition-all duration-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 ${
                      selectedAnswers[currentQuestion] === index 
                        ? "border-[#2196f3] bg-[#f5f5f5] dark:border-[#2196f3] dark:bg-gray-800" 
                        : "border-gray-200"
                    }`}
                  >
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full border text-sm">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div>{translate(option)}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {!isResultView && (
          <footer className="p-4">
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="w-full rounded-md bg-black py-2 text-white disabled:opacity-50 dark:bg-[#c5e1a5]"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentQuestion((prev) => Math.min(questions.length - 1, prev + 1))}
                disabled={currentQuestion === questions.length - 1}
                className="w-full rounded-md bg-black py-2 text-white disabled:opacity-50 dark:bg-[#c5e1a5]"
              >
                Next
              </button>
            </div>
          </footer>
        )}

        <div className="fixed bottom-20 right-4 flex flex-col gap-2">
          <button
            onClick={() => setIsHindi(!isHindi)}
            className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <Languages className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowReportDialog(true)}
            className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <Flag className="h-5 w-5" />
          </button>
          <button className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        {showSubmitDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="w-80 rounded-lg bg-white p-6 dark:bg-[#1e1e1e]">
              <h2 className="mb-4 text-xl font-bold">Submit Quiz</h2>
              <p className="mb-4">
                Unattempted Questions : {selectedAnswers.filter((a) => a === -1).length}
                <br />
                Once submitted you will not be able to modify your answers.
                <br />
                Are you sure you want to submit?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowSubmitDialog(false)}
                  className="rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  No
                </button>
                <button
                  onClick={calculateAndShowResults}
                  className="rounded bg-[#2196f3] px-4 py-2 text-white hover:bg-[#1976d2]"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {showReportDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="w-80 rounded-lg bg-[#1e1e1e] p-6 text-white">
              <h2 className="mb-6 text-xl font-bold">Report</h2>
              <div className="space-y-4">
                {[
                  "Question is wrong",
                  "Answer is wrong",
                  "Spelling mistake",
                  "Subject is different",
                  "Other",
                ].map((reason) => (
                  <label key={reason} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="report-reason"
                      value={reason}
                      checked={reportReason === reason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="h-4 w-4 accent-purple-500"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => {
                    setShowReportDialog(false)
                    setReportReason("")
                  }}
                  className="rounded px-4 py-2 text-gray-300 hover:bg-gray-800"
                >
                  CANCEL
                </button>
                <button
                  onClick={() => {
                    setShowReportDialog(false)
                    setReportReason("")
                    // Here you would typically handle the report submission
                  }}
                  className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
                >
                  REPORT
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}