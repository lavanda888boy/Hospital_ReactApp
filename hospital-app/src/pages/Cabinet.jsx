import Navbar from "../components/shared/Navbar";
import "./Cabinet.css";

const Cabinet = () => {
  const patientCount = localStorage.getItem("patientCount") || 0;
  const recordCount = localStorage.getItem("recordCount") || 0;

  return (
    <>
      <Navbar />
    </>
  );
};

export default Cabinet;
