import { useState } from "react";
import { Container, VStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, Text, useToast } from "@chakra-ui/react";

const Index = () => {
  const [initialAmount, setInitialAmount] = useState(0);
  const [monthlyDeposit, setMonthlyDeposit] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [years, setYears] = useState(0);
  const [futureValue, setFutureValue] = useState(null);

  const toast = useToast();

  const calculateSavings = () => {
    if (!initialAmount || !interestRate || !years) {
      toast({
        title: "Error",
        description: "Please fill all fields with valid numbers.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    let total = initialAmount;
    const monthlyInterestRate = interestRate / 100 / 12;

    for (let month = 1; month <= years * 12; month++) {
      total += monthlyDeposit;
      total *= 1 + monthlyInterestRate;
    }

    setFutureValue(total.toFixed(2));
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Savings Calculator</Text>
        <NumberInput value={initialAmount} onChange={(valueString) => setInitialAmount(parseFloat(valueString))} min={0}>
          <NumberInputField placeholder="Initial Amount" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <NumberInput value={monthlyDeposit} onChange={(valueString) => setMonthlyDeposit(parseFloat(valueString))} min={0}>
          <NumberInputField placeholder="Monthly Deposit" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <NumberInput value={interestRate} onChange={(valueString) => setInterestRate(parseFloat(valueString))} min={0}>
          <NumberInputField placeholder="Annual Interest Rate (%)" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <NumberInput value={years} onChange={(valueString) => setYears(parseInt(valueString, 10))} min={0}>
          <NumberInputField placeholder="Years" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button colorScheme="blue" onClick={calculateSavings}>
          Calculate
        </Button>
        {futureValue && <Text fontSize="lg">Future Value: ${futureValue}</Text>}
      </VStack>
    </Container>
  );
};

export default Index;
