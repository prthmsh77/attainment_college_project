import Navbar from "../Component/navbar";
import "./secondpg.css";
import React, { useState } from "react";
import axios from "axios";
import LabelComponent from "../Component/LabelComponent";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Bind modal to your appElement (root div)

function SecondPg() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [componentKey, setComponentKey] = useState(0);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const url = "http://127.0.0.1:5000/upload";
    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(url, formData, config);
      console.log(response.data);
      setResponseData(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setResponseData(null);
    setComponentKey(prevKey => prevKey + 1); // Update the component key to force a re-render
  };

  return (
    <div className="second-page" key={componentKey}>
      <div className="second-page-navbar">
        <Navbar />
      </div>
      <div className="second-page-containt">
        <form onSubmit={handleSubmit}>
          <div className="upload">
            <label htmlFor="file" className="drop-container" id="dropcontainer">
              <span className="drop-title">Drop files here</span>
              or
              <input
                type="file"
                id="file"
                accept=".xlsx,.xls"
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="input-button">
            <div className="marksinput">
              <LabelComponent />
              <LabelComponent />
              <LabelComponent />
            </div>

            <div className="secondpg-firstpg-buttons">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {showModal && (
        <Modal
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          contentLabel="Response Data"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <button className="close-button" onClick={handleCloseModal}>X</button>
          <div className="response-table">
            <table>
              <thead>
                <tr>
                  <th>CO</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(responseData).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value !== null ? value : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default SecondPg;
