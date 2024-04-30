/* eslint-disable @typescript-eslint/no-explicit-any */
const handleErrorMessage = async (response: Response): Promise<string> => {
  try {
    const error = await response.text();
    if (error.includes("One or more validation errors occurred.")) {
      const errorJson = JSON.parse(error);
      const errorsMessages: string[] = [];
      Object.values(errorJson.errors).map((err: any) =>
        errorsMessages.push(err[0])
      );
      return errorsMessages.join(", ");
    } else if (response.status === 500) {
      return "Netikėta klaida";
    }
    return error;
  } catch {
    return "Netikėta klaida";
  }
};

export default handleErrorMessage;
