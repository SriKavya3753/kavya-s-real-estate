import React, { useContext, useState } from "react";
import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext.js";
import { bookVisit } from "../../utils/api.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, propertyId, email }) => {
  const [value, setValue] = useState(null);

  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handleSuccess = () => {
    toast.success("succesfully booked", {
      position: "bottom-right",
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };
  
  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleSuccess(),
    onError: ({ response }) => {
      toast.error(response.data.message);
    },
    onSettled: () => setOpened(false),
  });
  return (
    <Modal
      opened={opened}
      setOpened={setOpened}
      title="select your date of the visit"
      centered
      onClose={() => setOpened(false)}
    >
      <div className="flexColCenter">
        <DatePicker
          value={value}
          onChange={setValue}
          minDate={new Date()}
        ></DatePicker>
        <Button disabled={!value && isLoading} onClick={() => mutate()}>
          Book your Visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
