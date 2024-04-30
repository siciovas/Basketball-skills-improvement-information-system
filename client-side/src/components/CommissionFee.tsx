import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Spinner,
  Switch,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import { Unauthorized } from "../Helpers/constants";
import eventBus from "../Helpers/eventBus";
import toast from "react-hot-toast";
import { CommissionFeeDto } from "../Types/types";
import handleErrorMessage from "../Helpers/errorHandler";

interface Props {
  updateCommissionFee: (
    event: MouseEvent<HTMLButtonElement>,
    commissionFee: CommissionFeeDto
  ) => void;
}

const CommissionFee = ({ updateCommissionFee }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const [value, setValue] = useState<number>(0);
  const [commissionFee, setCommissionFee] = useState<CommissionFeeDto>({
    isActive: true,
    value: 0,
  });

  const handleSwitchChange = () => {
    setCommissionFee({ ...commissionFee, isActive: !commissionFee.isActive });
  };

  const handleCommissionFeeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCommissionFee({ ...commissionFee, value: event.target.valueAsNumber });
  };

  const getCommissionFee = useCallback(async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "commissionFee",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    if (response.status === 401) {
      eventBus.dispatch("logOut", Unauthorized);
    } else if (response.status === 200) {
      const commissionFee = await response.json();
      setCommissionFee(commissionFee);
      setValue(commissionFee.value);
      setIsLoading(false);
    } else {
      const err = await handleErrorMessage(response);
      toast.error(err);
    }
  }, []);

  useEffect(() => {
    getCommissionFee();
  }, []);

  return (
    <>
      {isLoading ? (
        <Center>
          <Spinner size="xl" textAlign="center" />
        </Center>
      ) : (
        <Flex
          px={15}
          py={10}
          border="1px"
          borderRadius="lg"
          mt={10}
          mb={10}
          flexDir="column"
        >
          <Heading size="lg">Komisinis mokestis</Heading>
          <Flex mt={5} align="center" justify="space-between">
            <Heading>{value} %</Heading>
            <Flex w="50%" gap={5}>
              <Switch
                size="lg"
                colorScheme="blue"
                onChange={handleSwitchChange}
                isChecked={commissionFee.isActive}
              />
              <Heading size="md">
                {commissionFee.isActive ? "Taikomas" : "Netaikomas"}
              </Heading>
            </Flex>
          </Flex>
          <Heading size="sm" mt={10}>
            Mokesčio dydis:
          </Heading>
          <Flex gap={5} mt={5}>
            <Input
              type="number"
              w="20%"
              min={0}
              max={99}
              onChange={handleCommissionFeeInput}
            />
            <Button
              textTransform="uppercase"
              background="#1E99D6"
              textColor="white"
              borderRadius="2xl"
              onClick={(e) => updateCommissionFee(e, commissionFee)}
            >
              ATNAUJINTI
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default CommissionFee;
