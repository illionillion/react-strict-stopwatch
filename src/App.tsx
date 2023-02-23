import { Box, Button, Center, Flex, useBoolean } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [calcTime, setCalcTime] = useState<number>(0);
  const [displayTime, setDisplayTime] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timer>();
  const [isRunning, { on: runningOn, off: runningOff }] = useBoolean(false);
  const onStart = () => {
    const start_time = performance.now() - calcTime; // 開始時間
    const timer = setInterval(() => {
      const current_time = performance.now(); // 終了時間
      const diff = current_time - start_time;
      setCalcTime(diff);
      // const sec = Math.floor((diff / 1000) * 100) / 100; // もし秒：m秒にするなら
      const sec = Math.floor(diff / 1000);
      console.log(sec);

      if (displayTime < sec) setDisplayTime(sec);
    }, 40);
    setTimerId(timer);
    runningOn();
  };

  const onStop = () => {
    clearInterval(timerId);
    setTimerId(undefined);
    runningOff();
  };

  const onReset = () => {
    clearInterval(timerId);
    setTimerId(undefined);
    runningOff();
    setDisplayTime(0);
    setCalcTime(0);
  };

  // const checkFormat = (time:number):string => {
  //   // 分：秒：m秒で表示したい
  //   const timestr = time.toString()
  //   const strarr = timestr.split('.')
  //   if(strarr.length === 1) return timestr

  //   const min = strarr.pop()
  //   if(min && min.length < 2) {
  //     console.log(min + "0")
  //     return strarr.pop() + min + "0"
  //   }

  //   return timestr
  // }

  // useEffect(()=>{
  //   checkFormat(displayTime)
  // },[displayTime])

  return (
    <Center w="100vw" h="100vh" className="App">
      <Box>
        <Box>{displayTime}</Box>
        <Flex>
          <Button onClick={onStart} isDisabled={isRunning}>
            Start
          </Button>
          <Button onClick={onStop} isDisabled={!isRunning}>
            Stop
          </Button>
          <Button onClick={onReset}>Reset</Button>
        </Flex>
      </Box>
    </Center>
  );
}

export default App;
