const fetchedCodeBlocks = [
  {
    id: "Async-case",
    title: "Async Case",
    code: `// Your task: Implement an asynchronous function called fetchData
  async function fetchData() {
    // Your code here
  }`,
    solution: `// Async Case Solution
  async function fetchData() {
    try {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }`,
  },
  {
    id: "Promise-example",
    title: "Promise Example",
    code: `// Your task: Create a function called createPromise
  function createPromise() {
    // Your code here
  }`,
    solution: `// Promise Example Solution
  function createPromise() {
    return new Promise((resolve, reject) => {
      // Simulate an asynchronous operation
      setTimeout(() => {
        const randomNumber = Math.random();
        if (randomNumber > 0.5) {
          resolve('Success!');
        } else {
          reject('Error!');
        }
      }, 1000);
    });
  }`,
  },
  {
    id: "Event-handler",
    title: "Event Handler",
    code: `// Your task: Implement an event handler function called handleEvent
  function handleEvent() {
    // Your code here
  }`,
    solution: `// Event Handler Solution
  function handleEvent() {
    // Add your event handling logic here
    console.log('Event handled!');
  }`,
  },
  {
    id: "Arrow-function",
    title: "Arrow Function",
    code: `// Your task: Convert the following function to an arrow function
  function convertToArrow() {
    // Your code here
  }`,
    solution: `// Arrow Function Solution
  const convertToArrow = () => {
    // Your code here
    console.log('Converted to arrow function');
  }`,
  },
];

export default fetchedCodeBlocks;
