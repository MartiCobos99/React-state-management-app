import { useState } from "react";
import { Button } from "./Button";
import { Statisticline } from "./Statisticline";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncrease = (type) => {
    if (type === "good") setGood((prev) => prev + 1);
    else if (type === "neutral") setNeutral((prev) => prev + 1);
    else if (type === "bad") setBad((prev) => prev + 1);
  };

  const feedbackTotal = good + neutral + bad;
  const feedbackAverage = (good - bad) / feedbackTotal;
  const feedbackPositive = (good * 100) / feedbackTotal;

  const anecdotes = ["If it hurts, do it more often."];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const maxVotes = Math.max(...points);
  const maxVotesIndex = points.reduce((acc, point, index) => {
    if (point === maxVotes) {
      acc.push(index);
    }
    return acc;
  }, []);

  const handleSelect = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => handleIncrease("good")} text="Good" />
      <Button handleClick={() => handleIncrease("neutral")} text="Neutral" />
      <Button handleClick={() => handleIncrease("bad")} text="Bad" />

      <h1>Statistics</h1>
      {feedbackTotal === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <Statisticline text="Good" value={good} />
            <Statisticline text="Neutral" value={neutral} />
            <Statisticline text="Bad" value={bad} />
            <Statisticline text="All" value={feedbackTotal} />
            <Statisticline text="Average" value={feedbackAverage} />
            <Statisticline text="Positive" value={feedbackPositive} />
          </tbody>
        </table>
      )}

      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>

      <Button handleClick={handleVote} text="Vote" />
      <Button handleClick={handleSelect} text="Next Anecdote" />

      <h1>Anecdote with Most Votes</h1>
      {maxVotes === 0 ? (
        <p>No votes yet</p>
      ) : (
        <p>{anecdotes[maxVotesIndex[0]]}</p>
      )}
    </div>
  );
};

export default App;
