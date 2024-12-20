const ResultCard = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer ">
      <div className="absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
        <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
          JavaScript Basic Quiz
        </h1>
        <p className="mt-2 text-lg">
          Test your knowledge of JavaScript basics with quizzes that cover
          essential concepts, syntax, and foundational programming skills
        </p>
      </div>
      <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
        <div>
          <h1 className="text-3xl font-bold">Already Participated</h1>
          <p className="text-center">You got 20 out of 50</p>
        </div>
      </div>
      <img
        src="./assets/backgrounds/1.jpeg"
        alt="JavaScript Hoisting"
        className="w-full h-full object-cover rounded mb-4 "
      />
    </div>
  );
};

export default ResultCard;
