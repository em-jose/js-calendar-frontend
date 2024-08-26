import Modal from "react-modal";
import DatePicker from "react-datepicker";

import { useCalendarModal } from "../../hooks/useCalendarModal";
import { getEnvVariables } from "../../helpers";

import "sweetalert2/dist/sweetalert2.min.css";
import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

if (getEnvVariables().VITE_MODE !== "test") {
    Modal.setAppElement("#root");
}

export const CalendarModal = () => {
    const {
        isDateModalOpen,
        titleClass,
        formValues,
        onCloseModal,
        onDateChanged,
        onInputChanged,
        onSubmit,
    } = useCalendarModal();

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-background"
            closeTimeoutMS={200}
        >
            <h1> New event </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>
                <div className="form-group mb-2">
                    <label>Date and starting hour</label>
                    <DatePicker
                        selected={formValues.start}
                        className="form-control"
                        onChange={(event) => onDateChanged(event, "start")}
                        wrapperClassName="d-block"
                        dateFormat={"Pp"}
                        showTimeSelect
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Date and ending hour</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        className="form-control"
                        onChange={(event) => onDateChanged(event, "end")}
                        wrapperClassName="d-block"
                        dateFormat={"Pp"}
                        showTimeSelect
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Title and notes</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Name of the event"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Short description
                    </small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Additional information
                    </small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>
            </form>
        </Modal>
    );
};
