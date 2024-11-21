import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
const QuizPage = () => {
  const { id } = useParams();
  const [quizeData, setQuizeData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const { api } = useAxios();
  const { auth } = useAuth();
  const { title, description, stats, questions, user_attempt } = quizeData;
  const navigate = useNavigate();

  // console.log(id);
  useEffect(() => {
    const getQuizSet = async () => {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes/${id}`
      );

      if (response.status === 200) {
        const data = response.data.data;
        setQuizeData(data);
      }
    };
    getQuizSet();
  }, [api, id]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = async () => {
    if (!selectedAnswer) {
      alert("Please select an answer before proceeding.");
      return;
    }

    setUserAnswers((prev) => [
      ...prev,
      { questionId: questions[currentIndex].id, answer: selectedAnswer },
    ]);

    setSelectedAnswer("");

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      // alert("You have completed the quiz!");
      const formattedAnswers = userAnswers.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.questionId]: curr.answer,
        }),
        {}
      );

      const finalPayload = { answers: formattedAnswers };
      console.log("User Answers:", finalPayload);
      // // Submit userAnswers to the API

      const res = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes/${id}/attempt`,
        finalPayload
      );
      if (res.statusCode === 200) {
        alert("Quiz completed successfully!");
        // Navigate to the leaderboard page
        // history.push(`/leaderboard/${id}`);
        navigate("/");
      }
    }
  };
  const currentQuestion = questions?.[currentIndex];
  // console.log("quiz", quizeData);

  if (user_attempt?.attempted) {
    return <Navigate to={"/"}></Navigate>;
  }

  return (
    <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
        {/* Left Column */}
        <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
          <div>
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex flex-col">
              <div className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                Total number of questions : {stats?.total_questions}
              </div>
              <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                Participation : {stats?.total_attempts}
              </div>
              <div className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                Remaining : 9
              </div>
            </div>
          </div>
          <div className="mt-auto flex items-center">
            <img
              src="./assets/avater.webp"
              alt="Mr Hasan"
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
            <span className="text-black font-semibold">Saad Hasan</span>
          </div>
        </div>
        {/* Right Column */}
        <div className="lg:col-span-2 bg-white">
          <div className="bg-white p-6 !pb-2 rounded-md">
            {currentQuestion && (
              <>
                {" "}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold">
                    {currentIndex + 1}. {currentQuestion?.question}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Option 1 */}
                  {currentQuestion.options.map((option, i) => (
                    <label
                      key={i}
                      className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg"
                    >
                      <input
                        name={`question-${currentQuestion.id}`}
                        value={option}
                        type="checkbox"
                        checked={selectedAnswer === option}
                        className="form-radio text-buzzr-purple"
                        onChange={() => handleAnswerSelect(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
                >
                  {currentIndex === questions.length - 1 ? "Finish" : "Next"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuizPage;
