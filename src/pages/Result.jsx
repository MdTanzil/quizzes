import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
const Result = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { api } = useAxios();
  const [data, setData] = useState({});
  const { auth } = useAuth();
  const [quiz, setQuiz] = useState(null);
  useEffect(() => {
    const getQuizSet = async () => {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes/${id}/attempts`
      );

      if (response.status === 200) {
        const data = response.data.data;
        setData(data);
      }
    };
    getQuizSet();
  }, [api, id]);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      const quizSetId = data?.quiz?.id;
      if (quizSetId) {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes/${quizSetId}`
        );
        if (response.status === 200) {
          setQuiz(response.data.data);
        }
      }
    };
    fetchQuiz();
  }, [api, data]);

  const currentAttemp = data?.attempts?.find(
    (attempt) => attempt.user?.email === auth.user?.email
  );

  const totalQuestions = data?.quiz?.total_questions || 0;
  const correctAnswers = currentAttemp?.submitted_answers.filter(
    (answer, index) =>
      answer.answer === currentAttemp.correct_answers[index].answer
  ).length;
  const wrongAnswers = totalQuestions - correctAnswers;

  const totalMarks = currentAttemp?.correct_answers.reduce(
    (acc, curr, index) =>
      currentAttemp.submitted_answers[index]?.answer === curr.answer
        ? acc + curr.marks
        : acc,
    0
  );

  return (
    <div className="flex min-h-screen overflow-hidden">
      <img
        src="./assets/logo-white.svg"
        className="max-h-11 fixed left-6 top-6 z-50"
      />
      {/* Left side */}
      <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
        <div>
          <div className="text-white">
            <div>
              <h2 className="text-4xl font-bold mb-2">{data?.quiz?.title}</h2>
              <p>{data?.quiz?.description}</p>
            </div>
            <div className="my-6 flex items-center  ">
              <div className="w-1/2">
                <div className="flex gap-6 my-6">
                  <div>
                    <p className="font-semibold text-2xl my-0">
                      {totalQuestions}
                    </p>
                    <p className="text-gray-300">Questions</p>
                  </div>
                  <div>
                    <p className="font-semibold text-2xl my-0">
                      {correctAnswers}
                    </p>
                    <p className="text-gray-300">Correct</p>
                  </div>
                  <div>
                    <p className="font-semibold text-2xl my-0">
                      {wrongAnswers}
                    </p>
                    <p className="text-gray-300">Wrong</p>
                  </div>
                </div>
                <a
                  href="./leaderboard_page.html"
                  className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
                >
                  View Leaderboard
                </a>
              </div>
              <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                <div className="flex-1">
                  <p className="text-2xl font-bold">
                    {totalMarks}/{data?.quiz?.total_marks}
                  </p>
                  <p>Your Mark</p>
                </div>
                <div className="h-24 w-24">
                  <ProgressBar
                    value={totalMarks}
                    maxValue={data?.quiz?.total_marks}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
        <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
          <div className="px-4">
            {/* Question One */}
            {quiz?.questions?.map((question, index) => {
              const userAnswer =
                currentAttemp?.submitted_answers[index]?.answer;

              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className="rounded-lg overflow-hidden shadow-sm mb-4"
                >
                  <div className="bg-white p-6 !pb-2">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">
                        {index + 1}. {question.question}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {question?.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="radio"
                            name={`answer-${question.id}`}
                            className="form-radio text-buzzr-purple"
                            value={option}
                            checked={
                              option?.toString() === userAnswer?.toString()
                            }
                            readOnly
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`flex space-x-4 px-6 py-2 ${
                      isCorrect ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    <p className="text-primary hover:text-primary/80 font-medium">
                      Correct answers is : {question.correctAnswer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
