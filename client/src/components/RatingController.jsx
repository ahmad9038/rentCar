import React from "react";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconEmpty": {
    color: "#9ca3af",
  },
});

const RatingController = ({ value, readOnly, card, onChange }) => {
  const handleChange = (event, newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <>
      <StyledRating
        name="size-large"
        value={value}
        precision={0.5}
        size="medium"
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        readOnly={readOnly}
        onChange={handleChange}
      />

      {card ? (
        <></>
      ) : (
        <div className=" pt-1 pl-1 text-n-3">
          {value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)}
        </div>
      )}
    </>
  );
};

export default RatingController;
