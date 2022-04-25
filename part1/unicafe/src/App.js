import { useState } from "react";

const Statistics = (props) => {
  const total = props.stats.good + props.stats.bad + props.stats.neutral;
  const average = (props.stats.good - props.stats.bad) / total;
  const positive = (props.stats.good / total) * 100;

  if (props.stats.good > 0 || props.stats.bad > 0 || props.stats.neutral > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={props.stats.good} />
          <StatisticLine text="neutral" value={props.stats.neutral} />
          <StatisticLine text="bad" value={props.stats.bad} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positive}%`} />
        </tbody>
      </table>
    );
  }
  return "No feedback given";
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics stats={{ good: good, bad: bad, neutral: neutral }} />
    </>
  );
};

export default App;
