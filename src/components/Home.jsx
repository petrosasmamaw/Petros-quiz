import React, {useRef, useState} from "react";
import './Home.css'
import Questions from "./questions";
...
const Home = () => {
    let [index, setIndex] = useState(0)
    let [question,setQuestion] = useState(Questions[index])
    let [lock,setLock]=useState(false)
    let [score,setScore]= useState(0)
    let [result,setResult]=useState(false)


    let Option1 = useRef(null)
    let Option2 = useRef(null)
    let Option3 = useRef(null)
    let Option4 = useRef(null)

        let option_array=[Option1,Option2,Option3,Option4];

    const chekAns = (e,ans) =>{
        if(lock===false){
          if(question.answer===ans){
            e.target.classList.add("correct")
            setLock(true)
            setScore(prev=>prev+1)
        }
        else{
            e.target.classList.add("wrong")
            setLock(true)
            option_array[question.answer-1].current.classList.add("correct")
        }
        }
    }

    const next = () => {
        
       if (lock===true){
        if (index===Questions.length-1){
            setResult(true)
            return 0;
        }
           setIndex(index + 1);
           setQuestion(Questions[index + 1]);
           setLock(false);
           option_array.map((option) => {
               option.current.classList.remove("correct");
               option.current.classList.remove("wrong");
           });
       }
    }
 const reset = ()=>{
    setIndex(0)
    setQuestion(Questions[0])
    setScore(0)
    setLock(false)
    setResult(false)
 }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr/> {result?<> 
      <h2>you scored {score} out of {Questions.length} questions</h2>
      <button onClick={reset}>reset</button>
      </>
      :<><h2>{index+1}. {question.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e)=> {chekAns(e,1)}}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=> {chekAns(e,2)}}>{question.option2}</li>
        <li ref={Option3} onClick={(e)=> {chekAns(e,3)}}>{question.option3}</li>
        <li ref={Option4} onClick={(e)=> {chekAns(e,4)}}>{question.option4}</li>
      </ul>
      <button onClick={next}>next</button>
      <div className="index"> {index+1} of {Questions.length} questions</div>    </>}
      
    </div>
  );
};

export default Home;