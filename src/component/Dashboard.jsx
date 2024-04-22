import useAuth from "../hook/useAuth";


// eslint-disable-next-line react/prop-types
const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  console.log(accessToken);

  return <div>{code}</div>;
};

export default Dashboard;
