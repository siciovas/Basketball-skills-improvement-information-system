import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
    Heading,
    Box,
    Text,
    Spinner,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react';
import { URL_ADDRESS, Unauthorized } from "../Helpers/constants";
import toast from "react-hot-toast";
import { CoachesTypes } from '../Types/CoachesTypes';
import eventBus from '../Helpers/eventBus';

const CoachesList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [coaches, setCoaches] = useState<CoachesTypes[]>([]);

    const getCoachesList = useCallback(async () => {
        const response = await fetch(URL_ADDRESS + 'user/getCoaches', {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        });
        if (response.status === 401) {
            eventBus.dispatch("logOut", Unauthorized);
        }
        else if (response.status === 200) {
            const coaches = await response.json();
            setCoaches(coaches);
            setIsLoading(false);
        } else {
            toast.error("Netikėta klaida!");
        }
    }, []);

    useEffect(() => {
        getCoachesList();
    }, [getCoachesList, isLoading]);

    if (isLoading) {
        return (
            <Flex justifyContent="center" top="50%" left="50%" position="fixed">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <>
            <Flex justify="center" mb={10} mt={10}>
                <Heading size="xl">Trenerių sąrašas</Heading>
            </Flex>
            <Box overflowX="auto" maxWidth="100%" mt={5}>
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>Vardas Pavardė</Th>
                            <Th>El. paštas</Th>
                            <Th>Gimimo data</Th>
                            <Th>Išsilavinimas</Th>
                            <Th>Specializacija</Th>
                            <Th>Reitingas</Th>
                            <Th>Statusas</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {coaches.map((coach) => (
                            <Tr>
                                <Td>
                                    <Text>{coach.fullName}</Text>
                                </Td>
                                <Td>
                                    <Text>{coach.email}</Text>
                                </Td>
                                <Td>
                                    <Text>{coach.birthDate}</Text>
                                </Td>
                                <Td>
                                    <Text>{coach.education}</Text>
                                </Td>
                                <Td>
                                    <Text>{coach.specialization}</Text>
                                </Td>
                                <Td>
                                    <Text>{coach.rating}</Text>
                                </Td>
                                <Td>
                                    <Text>{coach.coachStatus}</Text>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </>
    )
}

export default CoachesList;