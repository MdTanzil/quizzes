import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import avatar from "../assets/avater.webp";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
const Leaderboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { api } = useAxios();
  const [data, setData] = useState({});
  const { auth } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [sortedAttempts, setSortedAttempts] = useState([]);
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

  useEffect(() => {
    if (data?.attempts) {
      const attemptsWithMarks = data.attempts.map((attempt) => {
        const totalMarks = attempt.correct_answers.reduce(
          (acc, curr, index) =>
            attempt.submitted_answers[index]?.answer === curr.answer
              ? acc + curr.marks
              : acc,
          0
        );
        return { ...attempt, totalMarks };
      });

      const sorted = attemptsWithMarks.sort(
        (a, b) => b.totalMarks - a.totalMarks
      );
      setSortedAttempts(sorted);
    }
  }, [data]);

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
    <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="bg-primary rounded-lg p-6 text-white">
            <div className="flex flex-col items-center mb-6">
              <img
                src={avatar}
                alt="Profile Pic"
                className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
              />
              <h2 className="text-2xl font-bold">{auth.user?.full_name}</h2>
              <p className="text-xl">
                {" "}
                {sortedAttempts.findIndex(
                  (attempt) => attempt.user?.email === auth.user?.email
                ) + 1}{" "}
                Position
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm opacity-75">Mark</p>
                <p className="text-2xl font-bold">{totalMarks}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-75">Correct</p>
                <p className="text-2xl font-bold">{correctAnswers}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-75">Wrong</p>
                <p className="text-2xl font-bold">{wrongAnswers}</p>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div>
            <h1 className="text-2xl font-bold">Leaderboard</h1>
            <p className="mb-6">{data?.quiz?.title || "Quiz Leaderboard"}</p>
            <ul className="space-y-4">
              {sortedAttempts.map((attempt, index) => {
                const isLoggedInUser = attempt.user?.email === auth.user?.email;
                return (
                  <li
                    key={attempt.user.email}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      isLoggedInUser
                        ? "bg-gray-200" // Logged-in user gets a distinct background
                        : "bg-white"
                    }`}
                  >
                    <div className="flex items-center">
                      <img
                        src={avatar}
                        alt={attempt.user.full_name}
                        className="object-cover w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">
                          {attempt.user.full_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {index + 1} Position
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">{attempt.totalMarks}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Leaderboard;
