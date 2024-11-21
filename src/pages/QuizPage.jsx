import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const QuizPage = () => {
  const {id} = useParams()
  const [quizeData, setQuizeData] = useState({})
  const {api}= useAxios()
  const {auth} = useAuth()
  const {title,description,stats,questions,user_attempt} = quizeData
  // console.log(id);
  useEffect(() => {
    const getQuizSet = async()=>{
      const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes/${id}`)

      if (response.status === 200) {
        const data = response.data.data;
        setQuizeData(data);
      }
    }
    getQuizSet()


  }, []);
    console.log(quizeData);
  
  
  return (
    <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
        {/* Left Column */}
        <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
          <div>
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 mb-4">
        {description}
            </p>
            <div className="flex flex-col">
              <div className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                Total number of questions : {stats?.total_questions}
              </div>
              <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                Participation :  {stats?.total_attempts}
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">
                3. What is the height of an empty binary tree?
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Option 1 */}
              <label className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
                <input
                  type="checkbox"
                  name="answer1"
                  className="form-radio text-buzzr-purple"
                  defaultChecked
                />
                <span>0</span>
              </label>
              {/* Option 2 */}
              <label className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
                <input
                  type="checkbox"
                  name="answer2"
                  className="form-radio text-buzzr-purple"
                />
                <span>-1</span>
              </label>
              {/* Option 3 */}
              <label className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
                <input
                  type="checkbox"
                  name="answer3"
                  className="form-radio text-buzzr-purple"
                />
                <span>1</span>
              </label>
              {/* Option 4 */}
              <label className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
                <input
                  type="checkbox"
                  name="answer4"
                  className="form-radio text-buzzr-purple"
                />
                <span>1</span>
              </label>
            </div>
            <a
              href="./result.html"
              className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
            >
              Next
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuizPage;