import api from "./api/axios-config";

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You're signed in</h1> : <h1>You are NOT signed in</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await api(context).get("/api/users/currentuser");
  return data;
};

export default LandingPage;
