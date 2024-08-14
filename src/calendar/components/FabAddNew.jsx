import { addHours } from "date-fns";

import { useCalendarStore, useUiStore } from "../../hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const FabAddNew = () => {
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: "",
            notes: "",
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: "#fafafa",
            user: {
                _id: "ABC123",
                name: "Mochi",
            },
        });
        openDateModal();
    };

    return (
        <button className="btn btn-primary fab" onClick={handleClickNew}>
            <FontAwesomeIcon icon={faPlus} />
        </button>
    );
};
