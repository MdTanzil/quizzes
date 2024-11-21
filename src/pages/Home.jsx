import AllCard from "../components/card/AllCard";
import Hero from "../components/Hero";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  const user = auth?.user;
  return (
    <>
      {user && <Hero user={user} />}
      <section>
        <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>

        <AllCard />
      </section>
    </>
  );
};

export default Home;
