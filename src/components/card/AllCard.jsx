import axios from "axios";
import { useEffect, useState } from "react";
import FreshCard from "./FreshCard";
const AllCard = () => {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const getQuizzes = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes`
        );

        if (response.status === 200) {
          setQuizzes(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getQuizzes();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quizzes.map((quiz) => (
        <FreshCard key={quiz.id} {...quiz} />
      ))}
      {/* <FreshCard /> */}
      {/* <ResultCard /> */}
    </div>
  );
};

export default AllCard;
