import { useState, useMemo, useEffect } from "react";

import { addHours, differenceInSeconds } from "date-fns";
import Swal from "sweetalert2";
import { useUiStore } from "./useUiStore";
import { useCalendarStore } from "./useCalendarStore";

export const useCalendarModal = () => {
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent } = useCalendarStore();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        title: "Mochi",
        notes: "Pistacho",
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return "";

        return formValues.title.length > 0 ? "" : "is-invalid";
    }, [formValues.title, formSubmitted]);

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent]);

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const onDateChanged = (event, changing = "") => {
        setFormValues({
            ...formValues,
            [changing]: event,
        });
    };

    const onCloseModal = () => {
        closeDateModal();
    };

    const onSubmit = (event) => {
        event.preventDefault();

        setFormSubmitted(true);

        const difference = differenceInSeconds(
            formValues.end,
            formValues.start
        );

        if (isNaN(difference) || difference <= 0) {
            Swal.fire("Wrong dates", "Check dates before submit", "error");
            return;
        }

        if (formValues.title.length <= 0) return;
    };
    return {
        isDateModalOpen,
        titleClass,
        formValues,
        onInputChanged,
        onDateChanged,
        onCloseModal,
        onSubmit,
    };
};
