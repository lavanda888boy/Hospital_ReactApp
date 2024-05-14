import "./Cabinet.css";

const Cabinet = () => {
  const patientCount = localStorage.getItem("patientCount") || 0;
  const recordCount = localStorage.getItem("recordCount") || 0;

  return (
    <>
      <div className="cabinet-wrapper">
        <div className="cabinet-header"> Welcome To The Cabinet, Doctor! </div>
        <div className="cabinet-subheader">
          {" "}
          Here are your accomplishments for today:{" "}
        </div>
        <div className="cabinet-statistics">
          {" "}
          Patients registered: {patientCount} <br /> Medical records presented:{" "}
          {recordCount}{" "}
        </div>
      </div>
    </>
  );
};

export default Cabinet;
