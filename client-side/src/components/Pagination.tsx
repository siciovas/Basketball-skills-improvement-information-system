import { HStack, Flex, Box } from "@chakra-ui/react";

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({ pageCount, currentPage, onPageChange }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  // Function to handle click on page number
  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <HStack mt={10} justifyContent="end">
      <Box
        className="fa-solid fa-arrow-left"
        cursor="pointer"
        display={pageCount > 1 ? "block" : "none"}
        onClick={() => handlePageClick(currentPage === 0 ? 0 : currentPage - 1)}
      />
      {pageNumbers
        .slice(
          Math.max(0, Math.min(currentPage - 1, pageNumbers.length - 3)),
          Math.min(
            Math.max(0, Math.min(currentPage - 1, pageNumbers.length - 3)) + 3,
            pageNumbers.length
          )
        )
        .map((number) => {
          return (
            <Flex
              key={number}
              justifyContent="center"
              alignItems="center"
              w={10}
              h={10}
              border="solid"
              borderColor="#9e9d9d"
              borderWidth={2}
              onClick={() => handlePageClick(number - 1)}
              backgroundColor={
                currentPage === number - 1 ? "#1E99D6" : "#E2E2E2"
              }
              cursor="pointer"
            >
              {number}
            </Flex>
          );
        })}
      <Box
        className="fa-solid fa-arrow-right"
        cursor="pointer"
        display={pageCount > 1 ? "block" : "none"}
        onClick={() =>
          handlePageClick(
            currentPage === pageCount - 1 ? currentPage : currentPage + 1
          )
        }
      />
    </HStack>
  );
};

export default Pagination;
