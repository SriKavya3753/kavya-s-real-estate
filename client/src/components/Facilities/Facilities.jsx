import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext, useEffect, useState } from "react";
import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parking: propertyDetails.facilities.parking,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) => (value < 1 ? "Must have at least one room" : null),
      bathrooms: (value) =>
        value < 1 ? "Must have at least one bathroom" : null,
    },
  });

  const { bedrooms, parking, bathrooms } = form.values;

  const { user, isAuthenticated, isLoading } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  // ✅ State to hold userEmail after Auth0 loads
  const [userEmail, setUserEmail] = useState("");

  // ✅ Wait until Auth0 is ready and set the userEmail
  useEffect(() => {
    if (isAuthenticated && user) {
    //   console.log("User Authenticated:", user);
      setUserEmail(user?.email || "");
    }
  }, [isAuthenticated, user]);

  // ✅ Only make the request when Auth0 is ready
  const { mutate, isLoading: isMutating } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          facilities: { bedrooms, parking, bathrooms },
          userEmail, // ✅ Use the state with guaranteed populated email
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response?.data?.message || "Error occurred", {
        position: "bottom-right",
      }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });

      // ✅ Reset the form values
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parking: 0,
          bathrooms: 0,
        },
        userEmail: user?.email, 
      });

      setOpened(false);
      setActiveStep(0);
    //   refetchProperties();
    },
  });

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parking, bathrooms },
      }));

      // ✅ Only call mutate if `userEmail` is ready
      if (userEmail) {
        mutate();
      } else {
        console.error("User email is missing!");
        toast.error("User email not found. Please try again.");
      }
    }
  };

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of Parkings"
          min={0}
          {...form.getInputProps("parking")}
        />
        <NumberInput
          withAsterisk
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isMutating || isLoading}>
            {isMutating ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
