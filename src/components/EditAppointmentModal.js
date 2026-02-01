import { useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import "../static/css/EditModal.css";

function EditAppointmentModal({ appointment, onClose, onSuccess }) {
  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let user = useSelector(store => store.auth.user)

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.put(
  `http://127.0.0.1:8000/appointments/${appointment.id}/reschedule/`,
  { date, time },
  {
    headers: {
      Authorization: `Token ${user.token}`
    }
  }
);

      onSuccess({
        ...appointment,
        date,
        time,
      });

      onClose();
    } catch (err) {
      setError(
        err.response?.data?.non_field_errors?.[0] ||
        err.response?.data?.error ||
        "Unable to reschedule appointment"
      );
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="edit-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Edit Appointment</h3>

        <label>
          Date
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          Time
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <div className="modal-actions">
          <button className="btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary"
            disabled={loading}
            onClick={handleSave}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default EditAppointmentModal;
