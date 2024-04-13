import { CHARTMONTHS } from "../../Helpers/constants";

export const ExtractDataToArray = (data: { [key: number]: number }) => {
  const array = Object.values(data);
  return {
    labels: CHARTMONTHS,
    datasets: [
      {
        data: array,
        backgroundColor: "#053075",
        barThickness: 20,
        borderColor: "#053075",
      },
    ],
  };
};
