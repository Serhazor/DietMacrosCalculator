import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import DenseTable from "./DenseTable";
import Button from '@material-ui/core/Button';
import styles from '../../styles/Home.module.css';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

export default function FormPropsTextFields() {
  const classes = useStyles();
  const [ageValue, setAgeValue] = useState("");
  const [weigthValue, setWeigthValue] = useState("");
  const [heightValue, setHeightValue] = useState("");
  const [intencityValue, setIntencityValue] = useState("");
  const [proteinValue, setProteinValue] = useState("");
  const [fatValue, setFatValue] = useState("");
  const [multiplier, setMultiplier] = useState(1);
  const [maintainingWeigthCalories, setMaintainingWeigthCalories] = useState(0);
  const [fatCal, setFatCal] = useState("");
  const [proCal, setProCal] = useState("");
  const [carbCal, setCarbCal] = useState("");
  const [sexValue, setSexValue] = useState(1);
  const [sexMultiplier, setSexMultiplier] = useState(0);

  const sexes = [
    {
      value: 1,
      label: <em>Нажми на меня</em>
    },
    {
      value: 2,
      label: "Женский"
    },    
    {
      value: 3,
      label: "Мужской"
    }
  ];

  const handleIntensityChange = (e) => {
    if (parseInt(e.target.value, 10) === 1) {
      setMultiplier(1.2);
    }
    if (parseInt(e.target.value, 10) === 2) setMultiplier(1.375);
    setIntencityValue(e.target.value);
    if (parseInt(e.target.value, 10) === 3) setMultiplier(1.55);
    setIntencityValue(e.target.value);
    if (parseInt(e.target.value, 10) === 4) setMultiplier(1.725);
    setIntencityValue(e.target.value);
    if (parseInt(e.target.value, 10) === 5) setMultiplier(1.9);
    setIntencityValue(e.target.value);
  };
  // Для женщин: (10 × вес в килограммах) + (6,25 × рост в сантиметрах) − (5 × возраст в годах) − 161

  const handleSexChange = (e) => {
    if (parseInt(e.target.value, 10) === 2) setSexMultiplier(161);
    setSexValue(e.target.value);
    if (parseInt(e.target.value, 10) === 3) setSexMultiplier(-5);
    setSexValue(e.target.value);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    const result =
      //(((10 * weigthValue) + (6.25 * heightValue) - (5 * ageValue)) - (sexMultiplier)) * ();
      (((10 * weigthValue) + (6.25 * heightValue) - (5 * ageValue)) - (sexMultiplier)) * (multiplier);

    setMaintainingWeigthCalories(parseInt(result));

    const fatCal = weigthValue * fatValue;
    setFatCal(parseInt(fatCal));

    const proCal = weigthValue * proteinValue;
    setProCal(parseInt(proCal));

    const carbCal = (result-((proCal*4)+(fatCal*9)))/4;
    setCarbCal(parseInt(carbCal));
  };
//(((maintainingWeigthCalories-(maintainingWeigthCalories*0.1))-((fatCal*9)+(proCal*4)))/4)
  const rows = [
    createData(
      "Общая дневная норма калорий",
      (parseInt(maintainingWeigthCalories)),
      (parseInt(maintainingWeigthCalories-(maintainingWeigthCalories*0.1))),
      (parseInt(maintainingWeigthCalories-(maintainingWeigthCalories*0.15))),
    ),
    createData("Дневная норма Белков (в граммах)", proCal, (parseInt(proCal)), (parseInt(proCal))),
    createData("Дневная норма Жиров (в граммах)", fatCal, (parseInt(fatCal)), (parseInt(fatCal))),
    createData("Дневная норма Углеводов (в граммах)", carbCal,(parseInt((((maintainingWeigthCalories-(maintainingWeigthCalories*0.1))-((fatCal*9)+(proCal*4)))/4))), (parseInt((((maintainingWeigthCalories-(maintainingWeigthCalories*0.15))-((fatCal*9)+(proCal*4)))/4))))
  ];
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleCheck}
    > <br />
      <div/>
      <div>
          <b>В разделе физической активности выставьте соответствующую цифру:</b>
      </div>
       <br/>
      <div >
        <ul>
          <li>1 - низкая активность / нет регулярных физических нагрузок</li>
          <li>2 - довольно активны (ежедневно много приходится ходить, ездить на велосипеде, регулярная зарядка по утрам) ИЛИ тренировки средней интенсивности до 3 раз в неделю (не изнурительные силовые, HIIT, пилатес, йога, хайкинг) </li>
          <li>3 - интенсивные тренировки 3-4 раза в неделю (силовые или кардио)</li>
          <li>4 - интенсивные тренировки 5-6 раз в неделю (силовые или кардио)</li>
          <li>5 - ежедневные интенсивные тренировки (силовые или кардио, включая тяжелую атлетику и бег на длинные дистанции)</li>
        </ul>
        </div>
        <br />
        <div style={{textAlign: "left"}}>
        <h4>Соотношение Белка и Жиров выбирайте на рекомендации вашего тренера/диетолога либо следуйте рекомендациям ниже:</h4>
        </div>
        <div>
          <b>Сколько Белка (грамм на кг веса тела) выбрать для расчета:</b>
        </div>
        <div>
          <ul>
            <li>Ваш образ жизни - малоподвижный; из тренировок только йога или стретчинг: <b>1 - 1.1</b> г/кг</li>
            <li>Вы регулярно тренируетесь на мышечную выносливость: <b>1.2 - 1.4</b> г/кг</li>
            <li>Вы регулярно тренируетесь на рост мышечной силы: <b>1.5 - 1.7</b> г/кг</li>
            <li>Вы регулярно тренируетесь на рост мышечной массы: <b>1.8 - 2.2</b> г/кг</li>
            <li>Вы находитесь на дефиците калорий и хотите сохранить мышечную массу: <b>2.3 - 2.4</b> г/кг</li>
            <li>Сомневаетесь что выбрать, при этом регулярно тренируетесь: <b>1.5</b> г/кг</li>
          </ul>
        </div>
        <div style={{textAlign: "left"}}>
        <b>Сколько Жиров (грамм на кг веса тела) выбрать для расчета:</b>
        </div>
          <div>
            <ul>
              <li>У вас много лишнего веса: <b>0.9</b> г/кг</li>
              <li>Вы в нормальном весе или есть немного лишнего: <b>1 - 1.2</b> г/кг</li>
              <li>Вы в нормальном весе или есть немного лишнего, но тянет на сладкое: <b>1.3 - 1.5</b> г/кг</li>
              <li>Сомневаетесь что выбрать: <b>1.2</b> г/кг</li>
            </ul>
          </div>
        
        <div style={{textAlign: "left"}}>
        Примечание: Если ваш тренер или диетолог посоветовал Жиров меньше 0.9 г на кг, срочно меняйте специалиста! 
        </div>
        <br />
      
      <br />
      <br />
      <div style={{margin:20}}>
        <TextField
          id="sex-number"
          select
          label="Ваш пол"
          type="number"
          value={sexValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleSexChange}
        >
          {sexes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div style={{margin:20}}>
        <TextField
          id="age-number"
          label="Ваш возраст (15+)"
          type="number"
          value={ageValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setAgeValue(e.target.value);
          }}
        ></TextField>
        <TextField
          id="weight-number"
          label="Ваш вес (кг)"
          type="number"
          value={weigthValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setWeigthValue(e.target.value);
          }}
        />
        <TextField
          id="height-number"
          label="Ваш рост (см)"
          type="number"
          value={heightValue}
          min={1.0}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setHeightValue(e.target.value);
          }}
        />
      </div>

      <div style={{margin:20}}>
        <TextField
          id="intencity-number"
          label="Уровень физической активности"
          type="number"
          value={intencityValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleIntensityChange}
        />
        <TextField
          id="protein-number"
          label="Количество Белка (г на кг веса тела)"
          type="float"
          value={proteinValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setProteinValue(e.target.value);
          }}
        />
        <TextField
          id="fat-number"
          label="Количество Жиров (г на кг веса тела)"
          type="float"
          value={fatValue}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setFatValue(e.target.value);
          }}
        />
      </div>
      <div className={classes.root} style={{margin:20}} >
        <Button type="submit" variant="contained" color="secondary" >
          Посчитать
        </Button>
      </div>

      <br />

      <div>
        <DenseTable
          rows={rows}
          maintainingWeigthCalories={maintainingWeigthCalories}
          proCal={proCal}
          fatCal={fatCal}
          carbCal={carbCal}
        />
      </div>
    </form>
  );
}
