import { useCalendarStore } from "../../hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export const FabDelete = () => {
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    };

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
            style={{ display: hasEventSelected ? "" : "none" }}
        >
            <FontAwesomeIcon icon={faTrashAlt} />
        </button>
    );
};
