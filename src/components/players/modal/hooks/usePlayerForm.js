import { useEffect, useState } from "react";
import skill from "../../../../constants/skill";
import { position2, position3 } from "../../../../constants/position";

function usePlayerForm(player){
    const [step,setStep]=useState(1);
    const [name,setName]=useState("");
    const [age,setAge]=useState("");
    const [position1,setPosition1]=useState("---");
    const [position2Value,setPosition2]=useState("---");
    const [position3Value,setPosition3]=useState("---");
    const [skills,setSkills]=useState({});
    useEffect(()=>{
        const initialSkills={};
        skill.forEach(attribute=>{
            initialSkills[attribute]="";
        });
        if(player){
            setName(player.name);
            setAge(player.age);
            setPosition1(player.position1 || "---");
            setPosition2(player.position2 || "---");
            setPosition3(player.position3 || "---");
            setSkills({
                ...initialSkills,
                ...(player.skills || {})
            });
        }
        else{
            setName("");
            setAge("");
            setPosition1("---");
            setPosition2("---");
            setPosition3("---");
            setSkills(initialSkills);
        }
        setStep(1);
    },[player]);
    useEffect(()=>{
        if(
            !position2[position1]?.includes(position2Value)
        ){
            setPosition2("---");
        }
    },[position1]);
    useEffect(()=>{
        if(
            !position3[position1]?.[position2Value]?.includes(position3Value)
        ){
            setPosition3("---");
        }
    },[position1,position2Value]);
    return{
        step,
        setStep,
        name,
        setName,
        age,
        setAge,
        position1,
        setPosition1,
        position2Value,
        setPosition2,
        position3Value,
        setPosition3,
        skills,
        setSkills
    };
}
export default usePlayerForm;